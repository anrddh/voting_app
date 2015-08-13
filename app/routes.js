var Polls = require('./models/polls.js').polls;
var Options = require('./models/polls.js').options;

module.exports = function(app) {
    app.get('/api/polls', function(req, res) {
        Polls.find(function(err, polls) {
            if(err) res.send(err);
            res.json(polls);
        });
    });

    app.get('/api/polls/:poll_id', function(req, res) {
        Polls.findById(req.params.poll_id ,function(err, poll) {
            if(err) res.send(err);
            res.json(poll);
        });
    });

    app.get('/api/polls/options/:poll_id', function(req, res) {
        Options.find({poll_id:req.params.poll_id}, function(err, options) {
            if(err) res.send(err);
            res.json(options);
        });
    });

    app.post('/api/polls', function(req, res) {
        Polls.create({
            name: req.body.title
        }, function(err, poll) {
            if(err) res.send(err);
            Polls.find(function(err, poll) {
                if(err) res.send(err);
                res.json(poll[poll.length-1]);
            });
        });
    });

    app.post('/api/polls/options/', function(req, res) {
        Options.create({
            poll_id: req.body.id,
            option: req.body.text,
            votes: req.body.votes
        }, function(err, option) {
            if(err) res.send(err);
            Options.find(function(err, option) {
                if(err) res.send(err);
                res.json(option[option.length-1]);
            });
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
}