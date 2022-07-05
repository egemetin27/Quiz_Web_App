const fetch = require('node-fetch');
var UserModel = require('../models/userModel.js');
var QuestionModel = require('../models/questionModel.js');
var RankingModel = require('../models/rankingModel.js');

var questions = new Array();
var userTotalScore = 0;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {

    /**
     * userController.list()
     */
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        var user = new UserModel({
            "username": req.body.username,
            "email": req.body.email,
            "password": req.body.password,
            "score": []
        });
        
        req.session.userId = user._id;
        user.save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating user',
                    error: err
                });
            }

            return res.status(201).json(user);
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({ _id: id }, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
            user.email = req.body.email ? req.body.email : user.email;
            user.password = req.body.password ? req.body.password : user.password;

            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    login: function (req, res, next) {
        UserModel.authenticate(req.body.username, req.body.password, function (err, user) {
            //console.log(user);
            if (err || !user) {
                var err = new Error('Wrong username or password');
                err.status = 401;
                return next(err);
            }
            
            req.session.userId = user._id;
            //res.redirect('/users/profile');
            res.json(user);
        });
    },

    profile: function (req, res, next) {
        UserModel.findById(req.session.userId)
            .exec(function (error, user) {
                if (error) {
                    return next(error);
                } else {
                    if (user === null) {
                        var err = new Error('Not authorized, go back!');
                        err.status = 400;
                        console.log("error");
                        return next(err);
                    } else {
                        //return res.render('user/profile', user);
                        res.json(user);
                    }
                }
            });
    },

    logout: function (req, res, next) {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.redirect('/');
                }
            });
        }
    },

    showQuiz: async function (req, res, next) {
        console.log("------\nStart of api req to open trivia\n-------");
        

        await QuestionModel.aggregate([{$sample: {size: 10}}]).
        then((data) => {
            console.log("before\n"+ data[0].question+ "\nafter");
            data.forEach(ques => {
                questions.push({
                    "question": ques.question,
                    "correct_answer": ques.correct_answer,
                    "incorrect_answers": ques.incorrect_answers
                })
            });
        });
        //x = JSON.parse(x);
        //console.log(x.pipeline());


        //console.log(data);
        //questions = data.results;
        console.log(questions);
        var ques_wo_correct = new Array();
        for (var i = 0; i < 10; i++) {
            var q = questions[i].incorrect_answers;
            q.push(questions[i].correct_answer);
            shuffleArray(q);
            ques_wo_correct.push({
                question: questions[i].question,
                answers: q,
            })
        }
        //var dt = new Date();
        //var x = dt.getHours();
        //console.log(dt.toTimeString());
        //sessionStorage.setItem("time", dt.toTimeString());
        userTotalScore = 0;
        return res.json({
            results: ques_wo_correct
        });
        //return res.json(data);
    },

    nextQuestion: function (req, res) {
        var userAnswer = req.body.answer;
        var grade = 0;
        var username = req.body.username;
        var index = req.body.index;
        if (questions[index].correct_answer === userAnswer) {
            grade = 1;   
        }
        var score = 100 * grade * (2,71828 ** (-0.2 * req.body.duration));
        userTotalScore += score;
        console.log("username: " + username + ", score and answer: "+ score + " " + userAnswer);
        if (index === 9) {
            UserModel.findOne({username: username}, function(err, user) {
                if (err) {
                    return console.log(err);
                }
                if (!user) {
                    return console.log("NO USER FOUND");
                }
                //user.score
                console.log(userTotalScore);
                res.json(userTotalScore);
                //console.log("before change: \n" + user);
                var now = new Date();
                now = now.toUTCString();
                user.score.push({score: userTotalScore, date: now});
                
                //console.log("after change: \n" + user);
                console.log(user.password);
                user.save();
                var ranking = new RankingModel({
                    "username": username,
                    "score": userTotalScore,
                    "date": now
                });
                ranking.save();
            });
        }
        else {
            res.json({});
        }
    },

    postQuestion: function (req, res, next) {
        var question = new QuestionModel({
            "question": req.body.question,
            "correct_answer": req.body["correct_answer"],
            "incorrect_answers": req.body["incorrect_answers"]
        });

        question.save(function (err, question) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating question',
                    error: err
                });
            }

            return res.status(201);
        });
    },

    leadership: function(req, res) {
        /*res.json({
            "username": "ddd",
            "score": 14.32,
            "date": "tuesday"
        });*/

        RankingModel.find(function(err, rankings) {
            var arr = [];
            rankings.forEach(ranking => {
                arr.push(
                {
                    "username": ranking.username,
                    "score": ranking.score,
                    "date": ranking.date
                })
            });
            res.json(arr);
        },{"score":1,_id:0}).sort({"score":-1})
    }
};


/*
for fetchin questions from OPEN trivia API
//let response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
//let data = await response.json();
*/