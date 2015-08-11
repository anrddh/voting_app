var Polls = require('./models/polls.js').polls;
var Options = require('./models/polls.js').options;

module.exports = function(app) {
    app.get('/api/polls', function(req, res) {
        Polls.find(function(err, polls) {
            if(err) res.send(err);

            res.json(polls);
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
}