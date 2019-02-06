const express = require('express');
const { fetchFlights } = require('../flightApi');

const moment  = require('moment');

module.exports =  (app) => {
  app.get('/flights', async (req, res) => {
    let { origin , destination, date } = req.query;
    const currentUser = req.user

    try {
      const flights = await fetchFlights(origin, destination, date);
      console.log(flights)
      // Check validation errors
      if (flights.response){
        req.flash('error', flights.response.data.ValidationErrors[0].Message);
        res.redirect('/');

      // Check connection
      }else if(flights.code){
        req.flash('error', 'Please check your connection');
        res.redirect('/');

      // Check flight not found
      }else if (flights.length < 1){
        req.flash('error', 'Flight not found');
        res.redirect('/');

      // Render flights
      }else{
        res.render('flights', {flights, moment, currentUser});
      }

    // Catch errors
    } catch (error) {
      req.flash('error', 'Something went wrong')
      res.redirect('/')
    }
  });
};
