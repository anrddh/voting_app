var Polls    = require('./models/polls.js').polls;
var Options  = require('./models/polls.js').options;
var User     = require('./models/user.js').user;
var passport = require('passport');
var jwt      = require('express-jwt');
var auth     = jwt({secret: 'SECRET', userProperty: 'payload'});

module.exports = function(app) {
    app.get('/api/polls', function(req, res) {
        Polls.find(function(err, polls) {
            if(err) res.send(err);
            res.json(polls);
        });
    });

    app.get('/api/poll/:id', function(req, res) {
        Polls.findById(req.params.id, function(err, polls) {
            if(err) res.send(err);
            res.json(polls);
        });
    });

    app.get('/api/polls/:author', function(req, res) {
        Polls.find({author: req.params.author}, function(err, polls) {
            if(err) res.send(err);
            res.json(polls);
        });
    });


    app.get('/api/polls/options/:poll_id', function(req, res) {
        Options.find({poll_id:req.params.poll_id}, function(err, options) {
            if(err) res.send(err);
            res.json(options);
        });
    });

    app.post('/api/polls', auth, function(req, res) {
        Polls.create({
            name: req.body.title,
            author: req.body.author
        }, function(err, poll) {
            if(err) res.send(err);
            Polls.find(function(err, poll) {
                if(err) res.send(err);
                res.json(poll[poll.length-1]);
            });
        });
    });

    app.post('/api/polls/options/', auth, function(req, res) {
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

    app.post('/api/polls/options/upVote', function(req, res) {
        Options.findById(req.body["_id"], function(err, option) {
            if(err) res.send(err);
            option.votes = req.body.votes;
            option.save(function(err) {
                if(err) res.send(err);

                res.json({message: "Success!"});
            });
        });
    });

    app.post('/register', function(req, res, next) {
        var user = new User();
        user.username = req.body.username;
        user.setPassword(req.body.password);

        user.save(function(err) {
            if(err) return next(err);

            return res.json({token: user.generateJWT()});
        });
    });

    app.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info){
            if(err){ return next(err); }

            if(user){
                return res.json({token: user.generateJWT()});
            } else {
                return res.status(401).json(info);
            }
        })(req, res, next);
    });

    app.delete('/api/polls/delete/:poll_id', auth, function(req, res, next) {
        Polls.remove({
            _id: req.params.poll_id
        }, function(err, poll) {
            if(err) res.send(err);

            Options.remove({
                poll_id: req.params.poll_id
            }, function(err, option) {
                if(err) res.send(err);
            });

            Polls.find(function(err, polls) {
                if(err) res.send(err);
                res.json(polls);
            });
        });
    });

    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
}