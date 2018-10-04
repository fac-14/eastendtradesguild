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
        records.forEach(function (record) {
            postcodeIdObj = {
                id: record.id,
                postcode: record.fields.Postcode
            }
            storage.push(postcodeIdObj)
        });
        // create postcode object to be sent to geolocation api
        // let postcodeObj = {
        //     "postcodes": storage.map(postcode => {
        //         return postcode.postcode
        //     })
        // }
        let postcodeArr = storage.map(postcode => {
            return postcode.postcode
        });
        console.log(postcodeArr);
        postcodeArr.forEach(postcode => {
            postcodes
                .lookup(postcode)
                .then(function (postcode) {
                    console.log(postcode);
                }, function (error) {
                    next(error);
                });
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
