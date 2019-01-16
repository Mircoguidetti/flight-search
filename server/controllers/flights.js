const express = require('express');
const { fetchFlight } = require('../flight-api');

module.exports = (app) => {
  app.get('/flights', (req, res) => {
    flights = fetchFlight(req.query.from, req.query.to, req.query.date)
    return flights
  });
};
