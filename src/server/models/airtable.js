
const Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyYBKUirvMxeaey5'
});
const base = Airtable.base('apphdQNWTLdRQbOOg');

const getNoGeo = new Promise((resolve, reject) => {
    const outputArray = []
    base('fonthilldummy').select({
        maxRecords: 1000,
        pageSize: 100,
        view: 'no_geolocation'
    }).eachPage(function page(records, fetchNextPage) {
        // This function (`page`) will get called for each page of records.
        records.forEach(function (record) {
            // set up objet to be populated using postcodesIO and sent back to airtable
            postcodeIdObj = {
                id: record.id,
                postcode: record.fields.postcode,
            }
            outputArray.push(postcodeIdObj)
        });
        fetchNextPage()
    }, function done(err) {
        if (err) reject(err)
        resolve(outputArray)
    }
    )
})

// const getNoGeo = new (resolve, reject) => {
//     const outputArray = []

//     base('fonthilldummy').select({
//         maxRecords: 1000,
//         pageSize: 100,
//         view: 'no_geolocation'
//     }).eachPage(function page(records, fetchNextPage) {
//         // This function (`page`) will get called for each page of records.
//         records.forEach(function (record) {
//             // set up objet to be populated using postcodesIO and sent back to airtable
//             postcodeIdObj = {
//                 id: record.id,
//                 postcode: record.fields.postcode,
//             }
//             outputArray.push(postcodeIdObj)
//         });
//         fetchNextPage()
//     }, function done(err) {
//         if (err) { console.error(err); return }
//     }
//     )

// }

module.exports = { getNoGeo }