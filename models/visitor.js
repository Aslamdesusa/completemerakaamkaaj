var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VisitorsSchema = new Schema({

	Visitorname: String,
    visitorcontect: Number,
    visitorlookingfor: String,
});

const Visitors = mongoose.model('Visitors', VisitorsSchema)

module.exports = Visitors;