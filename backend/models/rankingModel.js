var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var rankingSchema = new Schema({
	'username' : String,
	'score': Number,
    'date': String
});


var Ranking = mongoose.model('leadership', rankingSchema);
module.exports = Ranking;
