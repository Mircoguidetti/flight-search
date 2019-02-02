const axios = require('axios')
axios.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/LHR-sky/MXP-sky/2019-02-02",
{headers: {"X-RapidAPI-Key": "de029b48c8msh2c18ee199b15957p15ad27jsn66807b1f917b"}}).then(response => {
    console.log(response.data)
});