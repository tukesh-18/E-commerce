import { Router } from 'express';
import Cart from '../models/Cart.js';
import Item from '../models/Item.js';
import { auth } from '../middleware/auth.js';

const router = Router();

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
};

router.use(auth);

// GET user cart
router.get('/', async (req, res) => {
  const cart = await getOrCreateCart(req.user.id);
  await cart.populate('items.item');
  res.json(cart);
});

// Add to cart
router.post('/add', async (req, res) => {
  const { itemId, quantity = 1 } = req.body;
  if (!itemId) return res.status(400).json({ message: 'itemId required' });
  const item = await Item.findById(itemId);
  if (!item) return res.status(404).json({ message: 'Item not found' });
  const cart = await getOrCreateCart(req.user.id);
  const idx = cart.items.findIndex(ci => ci.item.toString() === itemId);
  if (idx >= 0) {
    cart.items[idx].quantity += Number(quantity);
  } else {
    cart.items.push({ item: itemId, quantity: Number(quantity) });
  }
  await cart.save();
  await cart.populate('items.item');
  res.json(cart);
});

// Update quantity
router.patch('/update', async (req, res) => {
  const { itemId, quantity } = req.body;
  const cart = await getOrCreateCart(req.user.id);
  const idx = cart.items.findIndex(ci => ci.item.toString() === itemId);
  if (idx === -1) return res.status(404).json({ message: 'Not in cart' });
  if (Number(quantity) <= 0) {
    cart.items.splice(idx, 1);
  } else {
    cart.items[idx].quantity = Number(quantity);
  }
  await cart.save();
  await cart.populate('items.item');
  res.json(cart);
});

// Remove item
router.delete('/remove/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const cart = await getOrCreateCart(req.user.id);
  cart.items = cart.items.filter(ci => ci.item.toString() !== itemId);
  await cart.save();
  await cart.populate('items.item');
  res.json(cart);
});

// Merge local cart into server cart on login
router.post('/merge', async (req, res) => {
  const { items = [] } = req.body; // items: [{itemId, quantity}]
  const cart = await getOrCreateCart(req.user.id);
  for (const inc of items) {
    const exists = await Item.exists({ _id: inc.itemId });
    if (!exists) continue;
    const idx = cart.items.findIndex(ci => ci.item.toString() === inc.itemId);
    if (idx >= 0) {
      cart.items[idx].quantity += Number(inc.quantity || 1);
    } else {
      cart.items.push({ item: inc.itemId, quantity: Number(inc.quantity || 1) });
    }
  }
  await cart.save();
  await cart.populate('items.item');
  res.json(cart);
});

export default router;
