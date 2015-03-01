module.exports = function(app){
	var Schema = require('mongoose').Schema;

	var post = Schema({
		title: String,
		private: Boolean,
		text: String,
		tags: [],
		createdAt:  { type: Date, default: Date.now }
	});

	return db.model('post', post);

};