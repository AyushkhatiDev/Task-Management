const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String
  },
  category: {
    type: String,
    enum: ['work', 'personal', 'shopping', 'health', 'education', 'other'],
    default: 'other',
    index: true
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  dueDate: {
    type: Date,
    index: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
    index: true
  },
  status: {
    type: String,
    enum: ['todo', 'in_progress', 'completed', 'archived'],
    default: 'todo',
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [commentSchema],
  attachments: [{
    name: String,
    url: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  completedAt: {
    type: Date
  },
  reminder: {
    date: Date,
    isEnabled: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Add text search index
taskSchema.index({ title: 'text', description: 'text', tags: 'text' });

// Pre-save middleware to set completedAt date
taskSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
