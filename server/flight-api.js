const axios = require('axios');
const { keys }  = require('./config/index');

const fetchFlight = async (origin, destination, date) => {

  const url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/` +
  `apiservices/browsedates/v1.0/US/USD/en-US/${origin}-sky/${destination}-sky/${date}`;
  try {
    return await axios.get(url, { headers: { "X-RapidAPI-Key": keys.rapidApiKey }})
  } catch (error) {
    return error
  }

};

module.exports = { fetchFlight };
