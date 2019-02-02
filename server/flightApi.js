const axios = require('axios');
const { keys }  = require('./config/index');
const { fetchAirportCodes } = require('./airportApi');
const { formatFlightUrl } = require('./config/urls/flight');



const fetchFlights = async (origin, destination, date) => {
  let flightUrls = [];

  try {
    // Fetch airports and convert city to airport codes
    const airports = await fetchAirportCodes(origin, destination);

    // Check validation and connection errors 
    if(airports.response || airports.code){
      return airports;
    
    }else{
      // Create airport urls 
      const flights = airports[0].map(origin => {
        let temp = origin.PlaceId;
        
        return airports[1].filter(destination => {
          flightUrls.push(formatFlightUrl(origin = temp, destination = destination.PlaceId, date = date).url);
        });
      });
    }
    
    // Fetch all flights 
    const [...flightRes] = await axios.all(flightUrls.map(url => axios.get(url, formatFlightUrl().headers)));
    
    // Create an array with flight objects 
    const flights  = flightRes.map(flight => {    
      
        return flight.data.Quotes.map(quote => {
          
          return {
            origin: flight.data.Places.find(place => place.PlaceId === quote.OutboundLeg.OriginId).Name,
            destination: flight.data.Places.find(place => place.PlaceId === quote.OutboundLeg.DestinationId).Name,
            airline: flight.data.Carriers.find(airline => airline.CarrierId === quote.OutboundLeg.CarrierIds[0]).Name,
            price: quote.MinPrice, 
            direct: quote.Direct,
            date: quote.OutboundLeg.DepartureDate.split('T')[0]
          };

        });
      }).filter(f => f.length);
    
    return flights;
    
  } catch (error) {
    return error;
  }   
};

module.exports = { fetchFlights };
