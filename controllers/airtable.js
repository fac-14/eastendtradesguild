// const base = require('airtable').base('apphdQNWTLdRQbOOg');


module.exports =  (req,res) => {

    var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyYBKUirvMxeaey5'
});
var base = Airtable.base('apphdQNWTLdRQbOOg');
let storage = [];

base('fonthilldummy').select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    pageSize: 1,
    view: "no_geolocation"
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        // console.log('Retrieved', record.get('ID'));
        storage.push(record)
    });
    

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
    res.send({...storage})

});

}
