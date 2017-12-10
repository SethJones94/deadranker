const axios = require('axios');
const google = require('googleapis');
const API_KEY = AIzaSyAgFrL3aT1X5beF2JBbqPSj9_nOBh0Mt-E;
const vidUrl = 'https://www.googleapis.com/youtube/v3/videos';
axios.get(vidUrl)
  .then(function (response) {
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  });
