var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollsSchema = new Schema({
    name: { type: String, required: true, unique: true},
});

var optionsSchema = new Schema({
    poll_id: { type: mongoose.Schema.Types.ObjectId, required: true},
    option: {type: String, required: true},
    votes: Number
});

var Polls = mongoose.model('Polls', pollsSchema);
var Options = mongoose.model('Options', optionsSchema);

module.exports = {
    polls: Polls,
    options: Options
}