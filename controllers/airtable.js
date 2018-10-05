// const https = require('https')
// const querystring = require('querystring')
const request = require('request')

module.exports = (req, res, next) => {

    // set up airtable api
    var Airtable = require('airtable');
    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: 'keyYBKUirvMxeaey5'
    });
    var base = Airtable.base('apphdQNWTLdRQbOOg');

    // set up storage array to be sent to frontend
    let storage = [];

    // setup postcodesIO

    var PostcodesIO = require('postcodesio-client');
    var postcodes = new PostcodesIO('https://api.postcodes.io', {
        headers: { 'User-Agent': 'MyAwesomeApp/1.0.0' } // default {} - extra headers
    });

    // start query
    base('fonthilldummy').select({
        // Selecting the first 3 records in Grid view:
        maxRecords: 3,
        pageSize: 3,
        view: "no_geolocation"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        const airtableRecords = records

        airtableRecords.forEach(function (record) {
            postcodeIdObj = {
                id: record.id,
                postcode: record.fields.Postcode,
                coordinates: {}
            }
            storage.push(postcodeIdObj)
        });
        // create postcode object to be sent to geolocation api
        let postcodeObj = {
            "postcodes": storage.map(postcode => {
                return postcode.postcode
            })
        }

        request.post('https://api.postcodes.io/postcodes', {
            json: postcodeObj,

        }, (error, res, body) => {
            if (error) {
                // console.log(error)
                next(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)


            for (let i = 0; i < body.result.length; i++) {
                storage[i].coordinates = {
                    lat: body.result[i].result.latitude,
                    lng: body.result[i].result.longitude
                }
            }
            console.log(storage)
            return storage;

        })

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    },



        function done(err) {
            if (err) { console.error(err); next(err); }
            res.send({ ...storage })

        });

}
