const request = require('request');

const fetchMyIP = function (callback) {
  const url = 'https://api.ipify.org?format=json';
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`, null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  const url = `https://freegeoip.app/json/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`, null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body)
    callback(null, { latitude, longitude });
  })
}

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};