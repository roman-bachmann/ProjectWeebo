const express = require('express');
var mysql = require('mysql');

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

app.get('/api/test', (req, res) => {
    
//    const param = req.query.q;
//
//    if (!param) {
//        res.json({
//            error: 'Missing required parameter `q`',
//        });
//        return;
//    }
    
    get_users(req,res);
    
});

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

function get_users(req,res) {
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            //res.json({"code" : 100, "status" : "Error in connection database"});
            res.json([]);
            return;
        }   
 
        console.log('connected as id ' + connection.threadId);
         
        connection.query("SELECT * from USERS",function(err,rows){
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
    pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            //res.json({"code" : 100, "status" : "Error in connection database"});
            res.json([]);
            return;
        }   
 
        console.log('connected as id ' + connection.threadId);
         
        connection.query("SELECT * from Subject",function(err,rows){
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