// Handels API calls to the backend

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

const Client = { getCoursesForUser, getChaptersForSubject, getSubChapters };
export default Client;
