/* Material Schema */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new Schema({
	type: {
		type: String, required: true
	},
	description: {
		type: String, required: true
	},
	status : {
		type: String, required: true, enum: ['stored', 'used'], required: true
	},
	requestedBy: {
		type: Schema.Types.ObjectId, ref: 'User'
	},
	requestStatus: { 
		type: String, enum: ['pending', 'approved', 'rejected']
	},
	isRequested: { 
		type: Boolean, default: false 
	},
	isAccepted: { 
		type: Boolean, default: false 
	},
	room: {
		type: String
	},
	createdAt: {
		type: Date, default: Date.now
	},
});

const Material = mongoose.model('Material', materialSchema);
module.exports = Material;

