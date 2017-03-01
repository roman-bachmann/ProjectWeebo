const express = require('express');
var mysql = require('mysql');
// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;

// Settings of the MySQL database
var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'mysql.stud.ntnu.no',
    user     : 'emileg_weebo',
    password : 'CocaCola',
    database : 'emileg_weebo',
    debug    :  false
});

const app = express();

// Set the port of the backend (Different than the port of the frontend at 3000)
app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

// const FACEBOOK_APP_ID = "";
// const FACEBOOK_APP_SECRET = "";
//
// // Setting up the passport strategy
// passport.use(new FacebookStrategy({
//    clientID: FACEBOOK_APP_ID,
//    clientSecret: FACEBOOK_APP_SECRET,
//    callbackURL: 'http://localhost:3000/auth/facebook/callback'
//  },
//  function(accessToken, refreshToken, profile, cb) {
//    //var userExists = checkUserExistance(profile.id);
// //    User.findOrCreate({ facebookId: profile.id }, function (err, user) { // mockcode
// //      return cb(err, user);
// //    });
//    return cb(null, profile);
//  }
// ));
//
// // TODO
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });
// // TODO
// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });
//
// app.use(passport.initialize());
// app.use(passport.session());



// ###############################
// ******* Handling routes *******
// ###############################

// // Handling authentication
// function loggedIn(req, res, next) {
//    if (req.user) {
//        next();
//    } else {
//        res.redirect('/login');
//    }
// }
//
// app.get('/', loggedIn, function(req, res, next) {
//
// });

// app.get('/api/auth/facebook',
//  passport.authenticate('facebook'));

// app.post('/api/auth/facebook', function(req, res, next) {
//     console.log("Logging in!");
//     passport.authenticate('facebook');
// });

// app.get('/api/auth/facebook', function(req, res) {
//     console.log('Logging in!');
//     passport.authenticate('facebook');
// });
//
// app.get('/api/auth/facebook/callback',
//  passport.authenticate('facebook', { failureRedirect: '/login' }),
//  function(req, res) {
//    res.redirect('/');
// });
//
// app.get('/api/logout', function(req, res){
//  req.logout();
//  res.redirect('/');
// });

app.get('/api/getCourses', (req, res) => {
    const userID = req.query.u;

    if (!userID) {
        res.json({
            error: 'Missing required parameter `u`',
        });
        return;
    }

    get_courses(req, res, userID);
});

app.get('/api/getChapters', (req, res) => {
    const subjectID = req.query.s;

    if (!subjectID) {
        res.json({
            error: 'Missing required parameter `s`',
        });
        return;
    }

    get_chapters(req, res, subjectID);
});

app.get('/api/getSubChapters', (req, res) => {
    const subjectID = req.query.s;
    const chapterID = req.query.c;

    if (!subjectID) {
        res.json({
            error: 'Missing required parameter `s`',
        });
        return;
    }
    if (!chapterID) {
        res.json({
            error: 'Missing required parameter `c`',
        });
        return;
    }

    get_subchapters(req, res, subjectID, chapterID);
});

app.get('/api/getVideos', (req, res) => {
    const subjectID = req.query.s;
    const chapterID = req.query.c;
    const subChapterID = req.query.sc;

    if (!subjectID) {
        res.json({
            error: 'Missing required parameter `s`',
        });
        return;
    }
    if (!chapterID) {
        res.json({
            error: 'Missing required parameter `c`',
        });
        return;
    }
    if (!subChapterID) {
        res.json({
            error: 'Missing required parameter `sc`',
        });
        return;
    }

    get_videos(req, res, subjectID, chapterID, subChapterID);
});

app.get('/api/getRating', (req, res) => {
   const userID = req.query.u;
   const videoID = req.query.v;
   const rating_score = req.query.r;
   const date_rated = req.query.d;

   if (!userID) {
       res.json({
           error: 'Missing required parameter `u`',
       });
       return;
   }
   if (!videoID) {
       res.json({
           error: 'Missing required parameter `v`',
       });
       return;
   }
   if (!rating_score) {
       res.json({
           error: 'Missing required parameter `r`',
       });
       return;
   }
   if (!date_rated) {
       res.json({
           error: 'Missing required parameter `d`',
       });
       return;
   }
   get_rating(req, res, userID, videoID, rating_score, date_rated);
});

app.get('/api/getFavoriteVideo', (req, res) => {
   const userID = req.query.u;
   const videoID = req.query.v;

   if (!userID) {
       res.json({
           error: 'Missing required parameter `u`',
       });
       return;
   }
   if (!videoID) {
       res.json({
           error: 'Missing required parameter `v`',
       });
       return;
   }

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});



// #################################
// ******* Handling database *******
// #################################

// Generic function that takes a query and returns the data from the database to the frontend
function get_data(req, res, sql) {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            //res.json({"code" : 100, "status" : "Error in connection database"});
            res.json([]);
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query(sql, function(err,rows){
            connection.release();
            if (!err) {
                console.log('The solution is: ', rows);
                res.json(rows);
            } else {
                console.log('Error while performing Query.');
            }
        });

        connection.on('error', function(err) {
            //res.json({"code" : 100, "status" : "Error in connection database"});
            res.json([]);
            return;
        });
    });
}

// TODO: make it dependent on user
function get_courses(req, res, userID) {
    var sql = `SELECT Subject.subjectID, Subject.classYear, Subject.name
               FROM Subject, User, UserSubject
               WHERE Subject.subjectID = UserSubject.subjectID
               AND User.userID = UserSubject.userID
               AND User.userID =  ?`;
    var inserts = [userID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function get_chapters(req, res, subjectID) {
    var sql = `SELECT chapterID, cname
               FROM Subject, Chapter
               WHERE Subject.subjectID = Chapter.subjectID
               AND Subject.subjectID =  ?`;
    var inserts = [subjectID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function get_subchapters(req, res, subjectID, chapterID) {
    var sql = `SELECT subChapterID, sname
               FROM subChapter, Chapter, Subject
               WHERE Subject.SubjectID = Chapter.SubjectID
               AND Chapter.chapterID = subChapter.chapterID
               AND Subject.SubjectID = ?
               AND Chapter.chapterID = ?`;
    var inserts = [subjectID, chapterID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function get_videos(req, res, subjectID, chapterID, subChapterID) {
    var sql = `SELECT Video.videoID
               FROM subChapterVideo, Video
               WHERE subChapterVideo.videoID = Video.videoID
               AND subChapterVideo.subjectID = ?
               AND subChapterVideo.chapterID = ?
               AND subChapterVideo.subChapterID = ?;`;
    var inserts = [subjectID, chapterID, subChapterID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function get_rating(req, res, userID, videoID, rating_score, date_rated) {
   var sql = `SELECT User.userID
              FROM rating, User
              WHERE rating.userID = User.userID
              AND rating.videoID = ?
              AND rating.rating_score = ?
              AND rating.date_rated = ?;`;
   var inserts = [userID, videoID, rating_score, date_rated];
   sql = mysql.format(sql, inserts);

   get_data(req, res, sql);
}

function get_favoriteVideo(req, res, videoID, userID) {
   var sql = `SELECT User.userID
              FROM FavoriteVideo, User
              WHERE FavoriteVideo.userID = User.userID
              AND FavoriteVideo.videoID = ?;`;
   var inserts = [userID, videoID, rating_score, date_rated];
   sql = mysql.format(sql, inserts);

   get_data(req, res, sql);
}


//function checkUserExistance(facebookID) {
//    pool.getConnection(function(err,connection){
//        if (err) {
//            connection.release();
//            return false;
//        }
//
//        var sql = "SELECT EXISTS(SELECT 1 FROM User WHERE facebookID = ?)";
//        var inserts = [facebookID];
//        sql = mysql.format(sql, inserts);
//
//        connection.query(sql, function(err,rows){
//            connection.release();
//            if (!err) {
//                if (rows.json() == 1) {
//                    return true;
//                } else {
//                    return false;
//                }
//            } else {
//                console.log('Error while performing Query.');
//            }
//        });
//
//        connection.on('error', function(err) {
//            return false;
//        });
//    });
//}


// ##############################
// ******* Handling exits *******
// ##############################

process.stdin.resume();//so the program will not close instantly

function exitHandler(options, err) {
    if (options.cleanup) {
        pool.end();
        console.log('Clean exit. Ended connection with database.');
    }
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));
