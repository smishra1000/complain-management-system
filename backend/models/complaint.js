const mongoose = require('mongoose');
const { Schema } = mongoose;
const complaintSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Auth', required: true }, // Reference to the User
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, // Reference to the Category
    title: { type: String, required: true }, // Title of the complaint
    description: { type: String, required: true }, // Detailed description
    status: { 
      type: String, 
      enum: ['open', 'in-progress', 'resolved', 'closed'], 
      default: 'open' 
    }, // Status of the complaint
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    }, // Priority level
    image:{type:String},
  }, { timestamps: true });
  
  const Complaint = mongoose.model('Complaint', complaintSchema);
  
  module.exports = Complaint;