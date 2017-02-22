const express = require('express');
var mysql = require('mysql');
//var passport = require('passport');
//var FacebookStrategy = require('passport-facebook').Strategy;

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

//const FACEBOOK_APP_ID = "";
//const FACEBOOK_APP_SECRET = ""

//// Setting up the passport strategy
//passport.use(new FacebookStrategy({
//    clientID: FACEBOOK_APP_ID,
//    clientSecret: FACEBOOK_APP_SECRET,
//    callbackURL: 'http://localhost:3000/auth/facebook/callback'
//  },
//  function(accessToken, refreshToken, profile, cb) {
//    //var userExists = checkUserExistance(profile.id);
////    User.findOrCreate({ facebookId: profile.id }, function (err, user) { // mockcode
////      return cb(err, user);
////    });
//    return cb(null, profile);
//  }
//));



// ###############################
// ******* Handling routes *******
// ###############################

//// Handling authentication
//function loggedIn(req, res, next) {
//    if (req.user) {
//        next();
//    } else {
//        res.redirect('/login');
//    }
//}
//
//app.get('/', loggedIn, function(req, res, next) {
//    
//});

//app.get('/auth/facebook',
//  passport.authenticate('facebook'));
//
//app.get('/auth/facebook/callback', 
//  passport.authenticate('facebook', { failureRedirect: '/login' }),
//  function(req, res) {
//    res.redirect('/');
//});
//
//app.get('/logout', function(req, res){
//  req.logout();
//  res.redirect('/');
//});

app.get('/getCourses/userID', (req, res) => {
    const userID = req.query.u;

    if (!userID) {
        res.json({
            error: 'Missing required parameter `u`',
        });
        return;
    }
    
    get_courses(req, res, userID);
});

app.listen(app.get('port'), () => {
    console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});



// #################################
// ******* Handling database *******
// #################################

// TODO: make it dependent on user
function get_courses(req, res, userID) {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            //res.json({"code" : 100, "status" : "Error in connection database"});
            res.json([]);
            return;
        }   
 
        console.log('connected as id ' + connection.threadId);
        
        var sql = `SELECT Subject.subjectID, Subject.classYear, Subject.name
                  FROM Subject, User, UserSubject
                  WHERE Subject.subjectID = UserSubject.subjectID
                  AND User.userID = UserSubject.userID
                  AND User.userID =  ?`;
        var inserts = [userID];
        sql = mysql.format(sql, inserts);
         
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