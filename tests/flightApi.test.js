const expect = require('expect');
const request = require('supertest');


const { fetchFlights } = require('../flightApi');


describe('fetch flight API',  () => {
  it('should return all flights', (done) => {

    let origin = 'Alghero';
    let destination = 'Milan';
    let date = '2019-04-04';

    fetchFlights(origin, destination, date).then(flights => {
      let code = 200;
      if(!flights.response){
        flights.forEach(flight => {

          expect(flight.length).toEqual(1);
        })
        return done();
      }else{
        expect(flights.response.status).toEqual(429);

        throw new Error('ERROR 429 Too Many Requests');

      }

    }).catch(error => {
      return done(error);
    });
  });

});
