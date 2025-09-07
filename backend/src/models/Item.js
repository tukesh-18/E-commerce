import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, index: true },
  imageUrl: { type: String, default: '' },
  stock: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

itemSchema.index({ title: 'text', description: 'text' });

export default mongoose.model('Item', itemSchema);
