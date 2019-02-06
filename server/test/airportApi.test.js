const expect = require('expect');
const request = require('supertest');


const { fetchAirportCodes } = require('../airportApi');


describe('fetch airport API',  () => {
  it('should return airport codes filtered', (done) => {

    let origin = 'London';
    let destination = 'Milan';

    fetchAirportCodes(origin, destination).then(airports => {

      expect(airports.length).toBe(2)
      airports[0].map(airport => {
        expect(airport.CountryId).toEqual('UK-sky')
      })
      airports[1].map(airport => {
        expect(airport.CountryId).toEqual('IT-sky')
      })
      return done()
    }).catch(error => {
      return done(error)
    })


  })

  it('should return 400 bad request', (done) => {

    let origin = '';
    let destination = 'London';
    fetchAirportCodes(origin, destination).then(airports => {
      expect(airports.response.status).toBe(400)
      expect(airports.response.data.ValidationErrors[0].Message).toEqual('Mandatory Parameter Missing')

      return done()
    }).catch(error => {
      return done(error)
    })
  })


})
