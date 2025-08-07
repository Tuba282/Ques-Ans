import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    required: true
  }
  ,
  category: {
    type: String,
    required: true,
    enum: ['Lifestyle', 'Fashion', 'Technology', 'Health', 'Travel', 'Food','Plants']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Blog', blogSchema);
