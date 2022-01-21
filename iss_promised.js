const request = require('request-promise-native');

const fetchMyIP = function() {
  const url = 'https://api.ipify.org?format=json';
  return request(url);
};

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  const url = `https://freegeoip.app/json/${ip}`;
  return request(url);
};

const fetchISSFlyOverTimes = function(body) {
  const coords = JSON.parse(body);
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };