var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var questionSchema = new Schema({
	'question' : String,
	'correct_answer' : String,
	'incorrect_answers' : Array
});


var Question = mongoose.model('question', questionSchema);
module.exports = Question;
