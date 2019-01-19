const express = require('express');
const { fetchFlight } = require('../flight-api');
const moment  = require('moment');

module.exports = (app) => {
  app.get('/flight', (req, res) => {
    let { origin , destination, date } = req.query;

    console.log(origin + destination + date)
    const findCheapestFlight = async () => {
      // fetch flight
      const flight = fetchFlight(origin , destination, date)
      .then(response => {
        // check fligth exist
        if (response.data.Quotes.length > 0 ) {

          // get additional data from API
          let airline = response.data.Carriers[0].Name;
          let direct = response.data.Quotes[0].Direct;
          let price = response.data.Quotes[0].MinPrice;

          // adjust format for rendering
          date = date.split('-').join('-');
          origin  = origin.toUpperCase();
          destination = destination.toUpperCase();

          // pass context to template
          const flightContext = {
              airline,
              origin ,
              destination,
              date,
              direct,
              price
          }
          res.render('index', {flightContext, moment})
        }else{
          req.flash('error', 'Flight not found')
          res.redirect('/')
        }
      })
      .catch(error => {

        // Handling network connection error
        if (error.code === 'ENOTFOUND') {
          req.flash('error', 'Please check your connection');
          res.redirect('/')
          return;
        }

        // Handling  other error messages
        const message = error.response.data.ValidationErrors[0].Message;
        console.log(message)
        req.flash('error', message);
        res.redirect('/');
      })
    }
    findCheapestFlight();
  });
};
