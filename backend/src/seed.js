import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import Item from './models/Item.js';

dotenv.config();

const products = [
  // Clothing
  { title: 'Classic T-Shirt', description: '100% cotton tee', price: 499, category: 'Clothing', stock: 100, imageUrl: 'https://picsum.photos/seed/shirt/400' },
  { title: 'Denim Jeans', description: 'Slim fit blue jeans', price: 1599, category: 'Clothing', stock: 70, imageUrl: 'https://picsum.photos/seed/jeans/400' },
  { title: 'Hoodie', description: 'Fleece-lined casual hoodie', price: 1299, category: 'Clothing', stock: 50, imageUrl: 'https://picsum.photos/seed/hoodie/400' },
  { title: 'Formal Shirt', description: 'Cotton formal shirt', price: 999, category: 'Clothing', stock: 60, imageUrl: 'https://picsum.photos/seed/formalshirt/400' },
  { title: 'Summer Dress', description: 'Floral print casual dress', price: 1399, category: 'Clothing', stock: 40, imageUrl: 'https://picsum.photos/seed/dress/400' },
  { title: 'Jacket', description: 'Winter puffer jacket', price: 2999, category: 'Clothing', stock: 20, imageUrl: 'https://picsum.photos/seed/jacket/400' },
  { title: 'Track Pants', description: 'Comfortable athletic wear', price: 799, category: 'Clothing', stock: 80, imageUrl: 'https://picsum.photos/seed/trackpants/400' },
  
  // Footwear
  { title: 'Running Shoes', description: 'Lightweight shoes', price: 2499, category: 'Footwear', stock: 50, imageUrl: 'https://picsum.photos/seed/shoes/400' },
  { title: 'Leather Boots', description: 'Brown high-ankle boots', price: 3499, category: 'Footwear', stock: 25, imageUrl: 'https://picsum.photos/seed/boots/400' },
  { title: 'Flip Flops', description: 'Casual rubber flip flops', price: 299, category: 'Footwear', stock: 150, imageUrl: 'https://picsum.photos/seed/flipflops/400' },
  { title: 'Formal Shoes', description: 'Black office wear shoes', price: 2799, category: 'Footwear', stock: 35, imageUrl: 'https://picsum.photos/seed/formalshoes/400' },
  { title: 'Sneakers', description: 'Trendy casual sneakers', price: 1999, category: 'Footwear', stock: 60, imageUrl: 'https://picsum.photos/seed/sneakers/400' },
  { title: 'Sandals', description: 'Leather casual sandals', price: 1199, category: 'Footwear', stock: 40, imageUrl: 'https://picsum.photos/seed/sandals/400' },
  
  // Electronics
  { title: 'Wireless Headphones', description: 'Bluetooth over-ear', price: 3999, category: 'Electronics', stock: 30, imageUrl: 'https://picsum.photos/seed/headphones/400' },
  { title: 'Smartphone', description: 'Latest Android phone', price: 19999, category: 'Electronics', stock: 25, imageUrl: 'https://picsum.photos/seed/phone/400' },
  { title: 'Laptop', description: '14-inch slim laptop', price: 45999, category: 'Electronics', stock: 15, imageUrl: 'https://picsum.photos/seed/laptop/400' },
  { title: 'Smartwatch', description: 'Fitness tracking smartwatch', price: 5999, category: 'Electronics', stock: 40, imageUrl: 'https://picsum.photos/seed/watch/400' },
  { title: 'Tablet', description: '10-inch Android tablet', price: 12999, category: 'Electronics', stock: 20, imageUrl: 'https://picsum.photos/seed/tablet/400' },
  { title: 'Bluetooth Speaker', description: 'Portable wireless speaker', price: 2999, category: 'Electronics', stock: 45, imageUrl: 'https://picsum.photos/seed/speaker/400' },
  { title: 'Gaming Mouse', description: 'RGB wired gaming mouse', price: 1499, category: 'Electronics', stock: 50, imageUrl: 'https://picsum.photos/seed/mouse/400' },
  { title: 'Keyboard', description: 'Mechanical keyboard', price: 2499, category: 'Electronics', stock: 35, imageUrl: 'https://picsum.photos/seed/keyboard/400' },
  { title: 'Power Bank', description: '10000mAh portable charger', price: 1999, category: 'Electronics', stock: 80, imageUrl: 'https://picsum.photos/seed/powerbank/400' },
  { title: 'LED Monitor', description: '24-inch HD monitor', price: 8999, category: 'Electronics', stock: 25, imageUrl: 'https://picsum.photos/seed/monitor/400' },

  // Accessories
  { title: 'Backpack', description: 'Waterproof laptop backpack', price: 1999, category: 'Accessories', stock: 50, imageUrl: 'https://picsum.photos/seed/backpack/400' },
  { title: 'Sunglasses', description: 'UV protection shades', price: 799, category: 'Accessories', stock: 70, imageUrl: 'https://picsum.photos/seed/sunglasses/400' },
  { title: 'Wrist Watch', description: 'Analog leather strap watch', price: 2499, category: 'Accessories', stock: 40, imageUrl: 'https://picsum.photos/seed/wristwatch/400' },
  { title: 'Wallet', description: 'Leather bi-fold wallet', price: 599, category: 'Accessories', stock: 90, imageUrl: 'https://picsum.photos/seed/wallet/400' },
  { title: 'Cap', description: 'Cotton baseball cap', price: 399, category: 'Accessories', stock: 100, imageUrl: 'https://picsum.photos/seed/cap/400' },
  { title: 'Belt', description: 'Formal leather belt', price: 699, category: 'Accessories', stock: 60, imageUrl: 'https://picsum.photos/seed/belt/400' },

  // Home
  { title: 'Coffee Maker', description: 'Automatic drip coffee machine', price: 3499, category: 'Home', stock: 25, imageUrl: 'https://picsum.photos/seed/coffeemaker/400' },
  { title: 'Vacuum Cleaner', description: 'Bagless vacuum cleaner', price: 6999, category: 'Home', stock: 20, imageUrl: 'https://picsum.photos/seed/vacuum/400' },
  { title: 'Mixer Grinder', description: '3-jar kitchen grinder', price: 2499, category: 'Home', stock: 30, imageUrl: 'https://picsum.photos/seed/mixer/400' },
  { title: 'Air Fryer', description: 'Oil-free healthy fryer', price: 5999, category: 'Home', stock: 15, imageUrl: 'https://picsum.photos/seed/airfryer/400' },
  { title: 'Electric Kettle', description: '1.5L stainless kettle', price: 999, category: 'Home', stock: 50, imageUrl: 'https://picsum.photos/seed/kettle/400' },

  // Beauty
  { title: 'Perfume', description: 'Long-lasting fragrance', price: 1499, category: 'Beauty', stock: 40, imageUrl: 'https://picsum.photos/seed/perfume/400' },
  { title: 'Face Cream', description: 'Moisturizing face cream', price: 599, category: 'Beauty', stock: 70, imageUrl: 'https://picsum.photos/seed/cream/400' },
  { title: 'Shampoo', description: 'Anti-dandruff shampoo', price: 349, category: 'Beauty', stock: 90, imageUrl: 'https://picsum.photos/seed/shampoo/400' },
  { title: 'Lipstick', description: 'Matte finish lipstick', price: 499, category: 'Beauty', stock: 80, imageUrl: 'https://picsum.photos/seed/lipstick/400' },
  { title: 'Hair Dryer', description: '1200W compact dryer', price: 1999, category: 'Beauty', stock: 30, imageUrl: 'https://picsum.photos/seed/hairdryer/400' },

  // Sports
  { title: 'Football', description: 'Standard size-5 football', price: 899, category: 'Sports', stock: 40, imageUrl: 'https://picsum.photos/seed/football/400' },
  { title: 'Badminton Racket', description: 'Lightweight racket', price: 1299, category: 'Sports', stock: 30, imageUrl: 'https://picsum.photos/seed/racket/400' },
  { title: 'Yoga Mat', description: 'Non-slip exercise mat', price: 699, category: 'Sports', stock: 60, imageUrl: 'https://picsum.photos/seed/yogamat/400' },
  { title: 'Dumbbell Set', description: 'Pair of 5kg dumbbells', price: 1999, category: 'Sports', stock: 25, imageUrl: 'https://picsum.photos/seed/dumbbell/400' },
  { title: 'Cricket Bat', description: 'English willow bat', price: 3499, category: 'Sports', stock: 20, imageUrl: 'https://picsum.photos/seed/cricketbat/400' }
];


await connectDB();
await Item.deleteMany({});
await Item.insertMany(products);
console.log('Seeded items');
process.exit(0);
