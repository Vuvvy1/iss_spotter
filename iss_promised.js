const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = () => request('https://api.ipify.org?format=json');
const fetchCoordsByIP = (body) => request(`http://ipwho.is/${JSON.parse(body).ip}`);
const fetchISSFlyOverTimes = (body) => request(`https://iss-flyover.herokuapp.com/json/?lat=${JSON.parse(body).latitude}&lon=${JSON.parse(body).longitude}`);

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


module.exports = { nextISSTimesForMyLocation, printPassTimes };