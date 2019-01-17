const express = require('express');
const { fetchFlight } = require('../flight-api');


module.exports = (app) => {
  app.get('/api/flight', (req, res) => {
    const { from, to, date } = req.query;

    if(from && to && date){
      const findCheapestFlight = async () => {
        const flight = await fetchFlight(from, to, date);
        if (flight && flight.data !== undefined) {
          const price = flight.data.Quotes[0].MinPrice;
          const airline = flight.data.Carriers[0].Name;

          const context = {
            airline,
            from,
            to,
            date,
            price
          }
          res.render('index', {flight: context});

        }else{
          res.render('index', {flight: "Not found"});
        }
      }
      findCheapestFlight();
    }else{
      res.redirect('/');
    }
  });
};
