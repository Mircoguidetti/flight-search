const axios = require('axios');
const { keys }  = require('./config/index');
const { fetchAirportCodes } = require('./airportApi');
const parseUrl = require('./config/parseUrl');


const fetchFlights = async (origin, destination, date) => {
  let flightPromise = [];
  let listFlights = [];

  try {

  } catch (e) {

  } 


  return fetchAirportCodes(origin, destination, date)
  .then(response => {
    for (let i = 0; response.originCodes.length > i; i++) {
      let permanentOrigin = response.originCodes[i];
      for (let i = 0; response.destinationCodes.length > i; i++) {

        flightPromise.push(parseUrl());
      }
    }
    // console.log(flightPromise)

    return axios.all(flightPromise.map(l => axios.get(l, { headers: {'X-RapidAPI-Key': keys.rapidApiKey}})))
    .then(axios.spread((...res) => {

      listFlights.push(res)

      return listFlights
    })).catch(error => {
      return error
    })


  }).catch(error => {
    return error
  })

};

fetchFlights('Alghero', 'Milan', '2019-02-').then(response => {
  console.log(response)
}).catch(error => {
  console.log(error)
})

module.exports = { fetchFlights }
