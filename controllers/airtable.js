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

    // set up storageUpdaterArr array to be sent to
    let storageUpdaterArr = [];

    // start query to update airtable view no_geolocation
    base('fonthilldummy').select({
        maxRecords: 100,
        pageSize: 100,
        view: "no_geolocation"
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        const airtableRecords = records
        airtableRecords.forEach(function (record) {
            // set up objet to be populated using postcodesIO and sent back to airtable
            postcodeIdObj = {
                id: record.id,
                postcode: record.fields.Postcode,
                coordinates: {}
            }
            storageUpdaterArr.push(postcodeIdObj)
        });
        // create postcode object to be sent to geolocation api
        let postcodeObj = {
            "postcodes": storageUpdaterArr.map(postcode => {
                return postcode.postcode
            })
        }
        request.post('https://api.postcodes.io/postcodes', {
            json: postcodeObj,
        }, (error, res, body) => {
            if (error) {
                // connsole.log(error)
                next(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)

            // populate storageUpdate array coordinates
            for (let i = 0; i < body.result.length; i++) {
                storageUpdaterArr[i].coordinates = {
                    lat: body.result[i].result.latitude,
                    lng: body.result[i].result.longitude
                }
            }
            // send coords and id to update no_geolocation view
            for (let i = 0; i < storageUpdaterArr.length; i++) {
                base('fonthilldummy').update(storageUpdaterArr[i].id, {
                    'geolocation': JSON.stringify(storageUpdaterArr[i].coordinates)
                }, function (err, record) {
                    if (err) { console.log(err); return; }
                    console.log(record.get('geolocation'));
                });
            }
        })
        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
    },
        // set up api call to get airtable data
        base('fonthilldummy').select({
            maxRecords: 1,
            pageSize: 3,
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            records.forEach(function (record) {
                // set up objet to be populated using postcodesIO and sent back to airtable
                airtableObj = {
                    id: record.id,
                    postcode: record.fields.Postcode,
                    coordinates: record.fields.geolocation
                }
                // console.log(airtableObj);
            })
            fetchNextPage();
        },
            function done(err) {
                if (err) { console.error(err); next(err); }
                res.send(airtableObj)
            }
        )


    );

}
