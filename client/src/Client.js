// Handels API calls to the backend

function getAllCourses(cb) {
    return fetch(`api/getAllCourses`, {
        accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(cb);
}

function getCoursesForUser(userID, cb) {
    return fetch(`api/getCourses?u=${userID}`, {
        accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(cb);
}

function getChaptersForSubject(subjectID, cb) {
    return fetch(`api/getChapters?s=${subjectID}`, {
        accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(cb);
}

function getSubChapters(subjectID, chapterID, cb) {
    return fetch(`api/getSubChapters?s=${subjectID}&c=${chapterID}`, {
        accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(cb);
}

function getVideosForSubChapter(subjectID, chapterID, subChapterID, cb) {
    return fetch(`api/getVideos?s=${subjectID}&c=${chapterID}&sc=${subChapterID}`, {
        accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(cb);
}
function getCommentsForSubChapter(subjectID, chapterID, subChapterID, cb) {
  return fetch(`api/getComments?s=${subjectID}&c=${chapterID}&sc=${subChapterID}`, {
        accept: 'application/json',
    }).then(checkStatus)
      .then(parseJSON)
      .then(cb);
}

function getRating(userID, videoID, rating_score, date_rated, cb) {
   return fetch(`api/getRating?u=${userID}&v=${videoID}&r=${rating_score}&d=${date_rated}`, {
       accept: 'application/jason',
   }).then(checkStatus)
     .then(parseJSON)
     .then(cb);
}
function getVotesForVideo(videoID, cb) {
   return fetch(`api/getVoting?v=${videoID}`, {
       accept: 'application/json',
   }).then(checkStatus)
     .then(parseJSON)
     .then(cb);
}
function getVoteCount(videoID, cb) {
  return fetch(`api/getVoteCount?v=${videoID}`, {
       accept: 'application/json',
   }).then(checkStatus)
     .then(parseJSON)
     .then(cb);
}

function getFavoriteVideo(userID, videoID, cb) {
   return fetch(`api/getRating?u=${userID}&v=${videoID}`, {
       accept: 'application/json',
   }).then(checkStatus)
     .then(parseJSON)
     .then(cb);
}

function videoShare(userID, subjectID, chapterID, subChapterID, videoID, description, fullName, userGravatar, cb) {
  var encodedGravatar = encodeURIComponent(userGravatar);
  fetch(`api/shareVideo?user=${userID}&subj=${subjectID}&chap=${chapterID}&subc=${subChapterID}&vid=${videoID}&d=${description}&fn=${fullName}&gr=${encodedGravatar}`, {
       method: 'post'
  }).then(cb);
}

function videoVote(userID, videoID, rating_score, dato, cb) {
  fetch(`api/voteVideo?u=${userID}&v=${videoID}&r=${rating_score}&d=${dato}`, {
       method: 'post'
  })
}

function addCourseForUser(userID, role, subjectID) {
    fetch(`api/addCourseForUser?user=${userID}&role=${role}&subj=${subjectID}`, {
        method: 'post'
    })
}
function addComment(subjectID, chapterID, subChapterID, userID, fullName, comment, cb) {
    fetch(`api/addComment?s=${subjectID}&c=${chapterID}&sc=${subChapterID}&u=${userID}&f=${fullName}&com=${comment}`, {
        method: 'post'
    }).then(cb);
}

function deleteVideo(videoID, cb) {
    fetch(`api/deleteVideo?v=${videoID}`, {
        method: 'post'
    }).then(cb);
}

function deleteSubjectForUser(subjectID, userID) {
    fetch(`api/deleteCourseForUser?s=${subjectID}&u=${userID}`, {
        method: 'post'
    })
}

function deleteCourse(subjectID, cb) {
    fetch(`api/deleteCourse?s=${subjectID}`, {
        method: 'post'
    }).then(cb);
}

function insertCourse(subjectID, subjectName, cb) {
    fetch(`api/insertCourse?s=${subjectID}&name=${subjectName}`, {
        method: 'post'
    }).then(cb);
}
function banUser(userID, banTime, subjectID) {
  fetch(`api/banUser?u=${userID}&b=${banTime}&s=${subjectID}`, {
    method: 'post'
  })
}

function recommendVideo(subjectID, chapterID, subChapterID, videoID, cb) {
    fetch(`api/recommendVideo?s=${subjectID}&chap=${chapterID}&subChap=${subChapterID}&v=${videoID}`, {
        method: 'post'
    }).then(cb);
}

function unRecommendVideo(subjectID, chapterID, subChapterID, videoID, cb) {
    fetch(`api/unRecommendVideo?s=${subjectID}&chap=${chapterID}&subChap=${subChapterID}&v=${videoID}`, {
        method: 'post'
    }).then(cb);
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
}

function parseJSON(response) {
    return response.json();
}

const Client = {
    getAllCourses,
    getCoursesForUser,
    getChaptersForSubject,
    getSubChapters,
    getVideosForSubChapter,
    getRating,
    getFavoriteVideo,
    videoShare,
    getVotesForVideo,
    videoVote,
    getVoteCount,
    addCourseForUser,
    deleteVideo,
    deleteSubjectForUser,
    deleteCourse,
    insertCourse,
    banUser,
    recommendVideo,
    unRecommendVideo,
    getCommentsForSubChapter,
    addComment
};
export default Client;
