const axios = require('axios');
const { keys }  = require('./config/index');

const fetchFlight = async (origin, destination, date) => {

  const url = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/` +
  `apiservices/browsedates/v1.0/US/USD/en-US/${origin}-sky/${destination}-sky/${date}`;

  try {
    const response = await axios.get(url, { headers: { "X-RapidAPI-Key": keys.rapidApiKey }});
    console.log(response);
  } catch (error) {
    console.log(error)
  }
}


module.exports = { fetchFlight }