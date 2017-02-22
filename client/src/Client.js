// Handels API calls to the backend

function getCoursesForUser(userName, cb) {
    return fetch(`getCourses/userID?u=${userName}`, {
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

const Client = { getCoursesForUser };
export default Client;