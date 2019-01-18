const express = require('express');
const { fetchFlight } = require('../flight-api');


module.exports = (app) => {
  app.get('/api/flight', (req, res) => {
    const { from, to, date} = req.query;
    console.log(date)
    // const parseDate = rowDate.split('/');
    // const date = `${parseDate[0]}-${parseDate[1]}-${parseDate[2]}`

    if(from && to && date){
      const findCheapestFlight = async () => {
        const flight = await fetchFlight(from, to, date);
        if (flight && flight.data !== undefined) {
          const price = flight.data.Quotes[0].MinPrice;
          const airline = flight.data.Carriers[0].Name;
          const from = flight.data.Places[0].IataCode;
          const to = flight.data.Places[1].IataCode;

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
