import { Router } from 'express';
import Item from '../models/Item.js';
import { auth, adminOnly } from '../middleware/auth.js';

const router = Router();

// GET /api/items?q=&category=&minPrice=&maxPrice=&sort=&page=&limit=
router.get('/', async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);

    const sortMap = { 'price_asc': { price: 1 }, 'price_desc': { price: -1 }, 'newest': { createdAt: -1 } };
    const sortObj = sortMap[sort] || { createdAt: -1 };

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Item.find(filter).sort(sortObj).skip(skip).limit(Number(limit)),
      Item.countDocuments(filter)
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch items' });
  }
});

router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(400).json({ message: 'Create failed' });
  }
});

router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (e) {
    res.status(400).json({ message: 'Update failed' });
  }
});

router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(400).json({ message: 'Delete failed' });
  }
});

export default router;
