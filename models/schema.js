const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
	title: {
		type: String,
		require: true,
		unique: true
	},
	views: {

	}
});

const UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
	},
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},

})