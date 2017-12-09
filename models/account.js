const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// user schema
const Account = new Schema({
  username: {
	  type: String,
		required: true,
	  trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	}
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);
