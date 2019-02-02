const { keys } = require('../index');

const formatFlightUrl = (origin = null, destination = null, date = null) => {

  return {
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/` +
      `apiservices/browsedates/v1.0/US/USD/en-US/${origin}/${destination}/${date}`,

    headers: { headers: {'X-RapidAPI-Key': keys.rapidApiKey}}
  };
};

module.exports = { formatFlightUrl };
