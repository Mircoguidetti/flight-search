const express = require('express');
const { fetchFlight } = require('../flight-api');



module.exports = (app) => {
  app.get('/api/flight', (req, res) => {
    const { from, to, date} = req.query;

    if(from !== to ){

      const findCheapestFlight = async () => {
        const flight = await fetchFlight(from, to, date);
        if (flight.code === 'ENOTFOUND') {
          req.flash('error', 'Please check your connection')
          res.redirect('/')
        }
        else if (flight && flight.status !== undefined) {
          const airline = flight.data.Carriers;
          const from = flight.data.Places[0].Name;
          const to = flight.data.Places[1].Name;
          const direct = flight.data.Quotes[0].Direct;
          const priceQuotes = flight.data.Quotes;
          const price = flight.data.Quotes[0].MinPrice;

          const context = {
              airline,
              from,
              to,
              date,
              priceQuotes,
              price,
              direct
            };

            res.render('index', {flight: context});

          }else{
            req.flash('error', 'Flight not found');
            res.redirect('/');
          }
        }
      findCheapestFlight();

    }else{
      req.flash('error', 'Origin and Destination can not be the same');
      res.redirect('/');
    }
  });
};
