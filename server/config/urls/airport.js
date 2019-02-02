const { keys } = require('../index');


const formatAirportUrl = (city = null) =>{

  return {
    url: `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/` +
    `apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${city}`,

    headers: { headers: {'X-RapidAPI-Key': keys.rapidApiKey}}
  };
};

module.exports = { formatAirportUrl };
