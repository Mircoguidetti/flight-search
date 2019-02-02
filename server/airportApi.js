const axios = require('axios');
const { formatAirportUrl } = require('./config/urls/airport');


const fetchAirportCodes = async (origin, destination) => {
  const urls = [ formatAirportUrl(city = origin).url, formatAirportUrl(city = destination).url ];

  try {
    const [ ...airportRes ] = await axios.all(urls.map(url => axios.get(url, formatAirportUrl().headers)));
    
    const airportCodes = airportRes.map(airports => {
      let temp = airports.data.Places[0].CityId;

      const airport = airports.data.Places.filter(airport => {

        return airport.CityId === temp && airport.PlaceId !== temp;
      })
      return airport;
    });

    return airportCodes;

  } catch (error) {
    return error;
  }
};

module.exports = { fetchAirportCodes };
