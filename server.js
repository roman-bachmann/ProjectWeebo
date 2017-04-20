const express = require('express');
const morgan = require('morgan');
var http = require('http');

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

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Set the port of the backend (Different than the port of the frontend at 3000)
app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}



// ###############################
// ******* Handling routes *******
// ###############################

app.get('/api/getAllCourses', (req, res) => {
    get_all_courses(req, res);
});

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
app.get('/api/getComments', (req, res) => {
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

    get_comments(req, res, subjectID, chapterID, subChapterID);
});

app.get('/api/getVoting', (req, res) => {
  const videoID = req.query.v;
  if(!videoID){
    res.json({
            error: 'Missing required parameter `v`',
        });
        return;
  }
  get_votes(req, res, videoID);
});
app.get('/api/getVoteCount', (req, res) => {
  const videoID = req.query.v;
  if(!videoID){
    res.json({
      error: 'Missing required parameter `v`',
    });
    return;
  }
  get_vote_count(req, res, videoID);7
});

app.post('/api/shareVideo', (req, res) => {
  const userID = req.query.user;
  const subjectID = req.query.subj;
  const chapterID = req.query.chap;
  const subChapterID = req.query.subc;
  const videoID = req.query.vid;
  const description = req.query.d;
  const fullName = req.query.fn;
  const userGravatar = req.query.gr;
  const curDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  if(!userID){
    res.json({
            error: 'Missing required parameter `user`',
      });
      return;
  }
  if (!subjectID) {
        res.json({
            error: 'Missing required parameter `subj`',
        });
        return;
  }
  if (!chapterID) {
      res.json({
          error: 'Missing required parameter `chap`',
      });
      return;
  }
  if (!subChapterID) {
      res.json({
          error: 'Missing required parameter `subc`',
      });
      return;
  }
  if (!videoID) {
      res.json({
          error: 'Missing required parameter `vid`',
      });
      return;
  }
  if (!description) {
      res.json({
          error: 'Missing required parameter `d`',
      });
      return;
  }
  if (!fullName) {
      res.json({
          error: 'Missing required parameter `fn`',
      });
      return;
  }
  if (!userGravatar) {
      res.json({
          error: 'Missing required parameter `gr`',
      });
      return;
  }
  console.log("about to post");

  var options = {
    method: 'HEAD',
    host: 'img.youtube.com',
    path: '/vi/' + videoID + '/0.jpg'
  };

  var reqYou = http.request(options, function(resYou) {
    if (resYou.statusCode == 200){
        console.log("Valid Youtube ID");
        post_video(req, res, userID, subjectID, chapterID, subChapterID, videoID, description, curDate, fullName, userGravatar);
    } else {
        console.log("Invalid Youtube ID");
    }
  });

  reqYou.end();
});

app.post('/api/addCourseForUser', (req, res) => {
    const userID = req.query.user;
    const subjectID = req.query.subj;
    const role = req.query.role;

    if(!userID){
      res.json({
              error: 'Missing required parameter `user`',
        });
        return;
    }
    if (!subjectID) {
          res.json({
              error: 'Missing required parameter `subj`',
          });
          return;
    }
    if (!role) {
          res.json({
              error: 'Missing required parameter `role`',
          });
          return;
    }

    add_course_for_user(req, res, userID, role, subjectID);
});

app.post('/api/addComment', (req, res) => {
  const subjectID = req.query.s;
  const chapterID = req.query.c;
  const subChapterID = req.query.sc;
  const userID = req.query.u;
  const fullName = req.query.f;
  const commenterGravatar = req.query.cg;
  const comment = req.query.com;
  if(!subjectID){
      res.json({
              error: 'Missing required parameter `s`',
        });
        return;
    }
    if(!chapterID){
      res.json({
              error: 'Missing required parameter `c`',
        });
        return;
    }
    if(!subChapterID){
      res.json({
              error: 'Missing required parameter `sc`',
        });
        return;
    }
    if(!userID){
      res.json({
              error: 'Missing required parameter `u`',
        });
        return;
    }
    if(!fullName){
      res.json({
              error: 'Missing required parameter `f`',
        });
        return;
    }
    if(!commenterGravatar){
      res.json({
              error: 'Missing required parameter `cg`',
        });
        return;
    }
    if(!comment){
      res.json({
              error: 'Missing required parameter `com`',
        });
        return;
    }
    add_comment(req, res, subjectID, chapterID, subChapterID, userID, fullName, commenterGravatar, comment);
});

app.post('/api/voteVideo', (req, res) => {
  const userID = req.query.u;
  const videoID = req.query.v;
  const rating_score = req.query.r;
  const dato = req.query.d;
  if(!userID){
    res.json({
            error: 'Missing required parameter `s`',
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
  if (!dato) {
      res.json({
          error: 'Missing required parameter `d`',
      });
      return;
  }
  console.log("bout to send vote");
  send_vote(req, res, userID, videoID, rating_score, dato);
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

   get_favoriteVideo(req, res, videoID, userID);
});

app.post('/api/deleteVideo', (req, res) => {
    const videoID = req.query.v;

    if (!videoID) {
        res.json({
            error: 'Missing required parameter `v`',
        });
        return;
    }

    delete_video(req, res, videoID);
});

app.post('/api/deleteCourseForUser', (req, res) => {
    const subjectID = req.query.s;
    const userID = req.query.u;

    if (!subjectID) {
        res.json({
            error: 'Missing required parameter `s`',
        });
        return;
    }
    if (!userID) {
        res.json({
            error: 'Missing required parameter `u`',
        });
        return;
    }

    delete_course_for_user(req, res, subjectID, userID);
});

app.post('/api/deleteCourse', (req, res) => {
    const subjectID = req.query.s;

    if (!subjectID) {
        res.json({
            error: 'Missing required parameter `s`',
        });
        return;
    }

    delete_course(req, res, subjectID);
});

app.post('/api/deleteChapter', (req, res) => {
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

    delete_chapter(req, res, subjectID,chapterID);
});

app.post('/api/deleteSubChapter', (req, res) => {
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

    delete_subchapter(req, res, subjectID, chapterID, subChapterID);
});

app.post('/api/insertCourse', (req, res) => {
    const subjectID = req.query.s;
    const subjectName = req.query.name;

    if (!subjectID) {
        res.json({
            error: 'Missing required parameter `s`',
        });
        return;
    }
    if (!subjectName) {
        res.json({
            error: 'Missing required parameter `name`',
        });
        return;
    }

    insert_course(req, res, subjectID, subjectName);
});

app.post('/api/insertChapter', (req, res) => {
    const subjectID = req.query.s;
    const chapterName = req.query.name;

    if (!subjectID) {
        res.json({
            error: 'Missing required parameter `s`',
        });
        return;
    }
    if (!chapterName) {
        res.json({
            error: 'Missing required parameter `name`',
        });
        return;
    }

    insert_chapter(req, res, subjectID, chapterName);
});

app.post('/api/insertSubChapter', (req, res) => {
    const subjectID = req.query.s;
    const chapterID = req.query.c;
    const subChapterName = req.query.name;

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
    if (!subChapterName) {
        res.json({
            error: 'Missing required parameter `name`',
        });
        return;
    }

    insert_subchapter(req, res, subjectID, chapterID, subChapterName);
});

app.post('/api/banUser', (req, res) => {
  const userID = req.query.u;
  const banTime = req.query.b;
  const subjectID = req.query.s;
  if(!userID) {
    res.json({
        error: 'Missing required parameter `u`',
    });
    return;
  }
  if(!banTime) {
    res.json({
        error: 'Missing required parameter `b`',
    });
    return;
  }
  if(!subjectID) {
    res.json({
        error: 'Missing required parameter `s`',
    });
    return;
  }
  ban_user(req, res, userID, banTime, subjectID);
})
app.post('/api/recommendVideo', (req, res) => {
    const subjectID = req.query.s;
    const chapterID = req.query.chap;
    const subChapterID = req.query.subChap;
    const videoID = req.query.v;

    if (!subjectID) {
        res.json({
            error: 'Missing required parameter `s`',
        });
        return;
    }
    if (!chapterID) {
        res.json({
            error: 'Missing required parameter `chap`',
        });
        return;
    }
    if (!subChapterID) {
        res.json({
            error: 'Missing required parameter `subChap`',
        });
        return;
    }
    if (!videoID) {
        res.json({
            error: 'Missing required parameter `v`',
        });
        return;
    }

    recommend_video(req, res, subjectID, chapterID, subChapterID, videoID);
});

app.post('/api/unRecommendVideo', (req, res) => {
    const subjectID = req.query.s;
    const chapterID = req.query.chap;
    const subChapterID = req.query.subChap;
    const videoID = req.query.v;

    if (!subjectID) {
        res.json({
            error: 'Missing required parameter `s`',
        });
        return;
    }
    if (!chapterID) {
        res.json({
            error: 'Missing required parameter `chap`',
        });
        return;
    }
    if (!subChapterID) {
        res.json({
            error: 'Missing required parameter `subChap`',
        });
        return;
    }
    if (!videoID) {
        res.json({
            error: 'Missing required parameter `v`',
        });
        return;
    }

    unrecommend_video(req, res, subjectID, chapterID, subChapterID, videoID);
});
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

        //console.log('connected as id ' + connection.threadId);

        connection.query(sql, function(err,rows){
            connection.release();
            if (!err) {
                //console.log('The solution is: ', rows);
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

function get_all_courses(req, res) {
    var sql = `SELECT * FROM Subject`;

    get_data(req, res, sql);
}

function get_courses(req, res, userID) {
    var sql = `SELECT Subject.subjectID, Subject.name, UserSubject.ban_time
               FROM Subject, UserSubject
               WHERE Subject.subjectID = UserSubject.subjectID
               AND UserSubject.userID =  ?`;
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
               WHERE Chapter.SubjectID = subChapter.SubjectID
               AND Chapter.chapterID = subChapter.chapterID
               AND Subject.SubjectID = ?
               AND Chapter.chapterID = ?`;
    var inserts = [subjectID, chapterID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function get_videos(req, res, subjectID, chapterID, subChapterID) {
    var sql = `SELECT subChapterVideo.videoID, subChapterVideo.subChapterVideoID, subChapterVideo.Description, subChapterVideo.userID, subChapterVideo.Favorite, subChapterVideo.addDate, subChapterVideo.fullName, subChapterVideo.userGravatar, SUM(rating.rating_score) AS votes
                FROM subChapterVideo
                LEFT JOIN rating
                ON subChapterVideo.subChapterVideoID = rating.subChapterVideoID
                WHERE subChapterVideo.subjectID = ?
                AND subChapterVideo.chapterID = ?
                AND subChapterVideo.subChapterID = ?
                GROUP BY subChapterVideo.subChapterVideoID
                ORDER BY votes DESC;`;
    /* Not sure if we need the Video table so I stopped fetching from it*/
    var inserts = [subjectID, chapterID, subChapterID];
    sql = mysql.format(sql, inserts);
    get_data(req, res, sql);
}
function get_comments(req, res, subjectID, chapterID, subChapterID){
  var sql = `SELECT Discuss.userID, Discuss.comment, Discuss.fullName, Discuss.commentTime, Discuss.commenterGravatar
            FROM Discuss
            WHERE Discuss.subjectID = ?
            AND Discuss.chapterID = ?
            AND Discuss.subChapterID = ?
            ORDER BY Discuss.commentTime DESC`;
  var inserts = [subjectID, chapterID, subChapterID];
  sql = mysql.format(sql, inserts);
  get_data(req, res, sql);
}

function get_votes(req, res, videoID){
  var sql =   `SELECT userID, rating_score
              FROM rating
              WHERE subChapterVideoID = ?`;
  sql = mysql.format(sql, videoID);
  get_data(req, res, sql);
}
function get_vote_count(req, res, videoID){
  var sql =   `SELECT SUM(rating_score) AS votes
              FROM rating
              WHERE subChapterVideoID = ?`;
  sql = mysql.format(sql, videoID);
  get_data(req, res, sql);
}

function get_favoriteVideo(req, res, videoID) {
    var sql = `SELECT userID
              FROM FavoriteVideo
              WHERE videoID = ?`;
    var inserts = [videoID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function post_video(req, res, userID, subjectID, chapterID, subChapterID, videoID, description, curDate, fullName, userGravatar) {
  var sql =   `INSERT INTO subChapterVideo (userID, subjectID, chapterID, subChapterID, videoID, Description, addDate, fullName, userGravatar)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  var inserts = [userID, subjectID, chapterID, subChapterID, videoID, description, curDate, fullName, userGravatar];
  sql = mysql.format(sql, inserts);
  get_data(req, res, sql);
}

function send_vote(req, res, userID, videoID, rating_score, dato){
  var sql =     `INSERT INTO rating (userID, subChapterVideoID, rating_score, date_rated)
                VALUES (?, ?, ?, ?)`;
  var inserts = [userID, videoID, rating_score, dato];
  sql = mysql.format(sql, inserts);
  get_data(req, res, sql);
}

function add_course_for_user(req, res, userID, role, subjectID) {
    var sql = `INSERT INTO UserSubject (userID, role, subjectID)
               VALUES (?, ?, ?)`;
    var inserts = [userID, role, subjectID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}
function add_comment(req, res, subjectID, chapterID, subChapterID, userID, fullName, commenterGravatar, comment){
  const curDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var sql = `INSERT INTO Discuss (subjectID, chapterID, subChapterID, userID, fullName, comment, commentTime, commenterGravatar)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  var inserts = [subjectID, chapterID, subChapterID, userID, fullName, comment, curDate, commenterGravatar];
  sql = mysql.format(sql, inserts);
  get_data(req, res, sql);
}
function ban_user(req, res, userID, banTime, subjectID) {
  var sql = `UPDATE UserSubject
            SET ban_time = ?
            WHERE userID = ?
            AND subjectID = ?`;
  var inserts = [banTime, userID, subjectID];
  sql = mysql.format(sql, inserts);
  get_data(req, res, sql);
}

function delete_video(req, res, videoID) {
    var sql = `DELETE FROM subChapterVideo
               WHERE videoID = ?`;
    var inserts = [videoID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function delete_course_for_user(req, res, subjectID, userID) {
    var sql = `DELETE FROM UserSubject
               WHERE subjectID = ?
               AND userID = ?`;
    var inserts = [subjectID, userID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function delete_course(req, res, subjectID) {
    var sql = `DELETE FROM Subject WHERE subjectID = ?`;
    var inserts = [subjectID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function delete_chapter(req, res, subjectID, chapterID) {
    var sql = `DELETE FROM Chapter
               WHERE subjectID = ?
               AND chapterID = ?`;
    var inserts = [subjectID, chapterID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function delete_subchapter(req, res, subjectID, chapterID, subChapterID) {
    var sql = `DELETE FROM Chapter
               WHERE subjectID = ?
               AND chapterID = ?
               AND subChapterID = ?`;
    var inserts = [subjectID, chapterID, subChapterID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function insert_course(req, res, subjectID, subjectName) {
    var sql = `INSERT INTO Subject (subjectID, name)
               VALUES (?, ?)`;
    var inserts = [subjectID, subjectName];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function insert_chapter(req, res, subjectID, chapterName) {
    var sql = `INSERT INTO Chapter (cname, subjectID)
               VALUES (?, ?)`;
    var inserts = [chapterName, subjectID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function insert_subchapter(req, res, subjectID, chapterID, subChapterName) {
    var sql = `INSERT INTO Chapter (subjectID, chapterID, sname)
               VALUES (?, ?, ?)`;
    var inserts = [subjectID, chapterID, subChapterName];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function recommend_video(req, res, subjectID, chapterID, subChapterID, videoID) {
    var sql = `UPDATE subChapterVideo SET Favorite = 1
               WHERE subjectID = ? AND
               chapterID = ? AND
               subChapterID = ? AND
               videoID = ?;`;
    var inserts = [subjectID, chapterID, subChapterID, videoID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
}

function unrecommend_video(req, res, subjectID, chapterID, subChapterID, videoID) {
    var sql = `UPDATE subChapterVideo SET Favorite = 0
               WHERE subjectID = ? AND
               chapterID = ? AND
               subChapterID = ? AND
               videoID = ?;`;
    var inserts = [subjectID, chapterID, subChapterID, videoID];
    sql = mysql.format(sql, inserts);

    get_data(req, res, sql);
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
