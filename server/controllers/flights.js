const express = require('express');
const { fetchFlights } = require('../flightApi');

const moment  = require('moment');

module.exports =  (app) => {
  app.get('/flights', async (req, res) => {
    let { origin , destination, date } = req.query;
    
    try {
      const flights = await fetchFlights(origin, destination, date);
      
      // Check validation errors
      if (flights.response){
        req.flash('error', flights.response.data.ValidationErrors[0].Message);
        res.redirect('/');
      
      // Check connection
      }else if(flights.code){
        req.flash('error', 'Please check your connection');
        res.redirect('/');

      // Check flight not found
      }else if (flights[0] < 1){
        req.flash('error', 'Flight not found');
        res.redirect('/');

      // Render flights 
      }else{
        res.render('index', {flights, moment});
      }

    // Catch errors 
    } catch (error) {
      req.flash('error', 'Something went wrong')
      res.redirect('/')
    }
  });
};
