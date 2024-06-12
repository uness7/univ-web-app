"use strict";

/* Assignment Schema */

const assignmentSchema = new Schema({
  material: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    required: true
  },
  requestedby: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'returned'],
    required: true
  },
  requestType: {
    type: String,
    enum: ['assign', 'return'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  approvedAt: {
    type: Date
  }
});
const Assignment = mongoose.model('Assignment', AssignmentSchema);
module.exports = Assignment;