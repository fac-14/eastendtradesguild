[![Build Status](https://travis-ci.org/fac-14/eastendtradesguild.svg?branch=master)](https://travis-ci.org/fac-14/eastendtradesguild)
[![codecov](https://codecov.io/gh/fac-14/eastendtradesguild/branch/master/graph/badge.svg)](https://codecov.io/gh/fac-14/eastendtradesguild)
![release - alpha](https://img.shields.io/badge/Release-alpha-ff69b4.svg)

# eastendtradesguild

The EETG is an alliance  of 250 small independent businesses and the self employed. As well as offering goods and services members provide social spaces, sustaining relationships between neighbours and making East London's streets safer and better places to be.

Our initial MVP is an interactive map. It will help local businesses to view and input data about commercial property rents in their neighbourhood. The aim is to empower independent businesses in times of skyrocketing business rent increases.

The MVP has been used in research conducted with Queen Mary University to explore the issue of improving rental transparency in the commercial sector.

![Screenshot](https://i.imgur.com/0LvmSTr.png)

Users can browse the map, search for a location by postcode, view details of each business on the map, and add their own data to the dataset. Locations on the map are colour coded by their commercial use-case.

### Technical Info

For the MVP, we have used Airtable as the CMS, allowing the administrator to easily add and change datasets and verify the data that has been added. The app is built on an Express backend and React frontend. For the mapping we use React Leaflet to render OpenStreetMaps, with some custom coding for the markers and popups. We also use the Postcodes.io API in order to fetch geolocation data to correspond with postcodes and allow us to render each business on the map.

To bootstrap the MVP we have used `create-react-app` - the service worker is activated so the app will function as a PWA, which avoids the need to continuously download the React bundle, however it does not, as yet, cache data offline.

### General Maintenance

As an administrator, you can check, add, remove and edit the data used to render the markers on the map via Airtable.

Some general guidelines:
  - The free tier of Airtable will hold up to 1200 rows of data. After this you will need to upgrade to a paid plan.
  - All required fields must be present for a marker to be rendered on the map (check below or on the Airtable form)
  - If editing the Airtable form, please do not change the required fields, as records missing required fields may not show on the map
  - To see or share the Airtable form, you can select the drop-down menu at the top-left of the Airtable screen, and select the pink view, "East End Trades Guild Rental - Transparency Initiative". You can edit the text copy at the top of the form, and the descriptions of each input if you like.
  - You do not need to enter anything in the `geolocation` column. When the app is loaded, a call is made to the Postcodes.io API, and the geolocation data is added into the Airtable. This is limited to 100 rows at a time, so if adding more than 100 rows of new data, you will need to refresh the app several times to add the data for all the rows. Once geolocation has been added, the points can be rendered on the map.
  - If data has been added, and the postcode is not recognised, it cannot be shown on the map. You can see any records where the postcode was not recognised as they will have "Invalid Postcode" in the `geolocation` column. You can also select the "Invalid Postcodes" view to see only rows with invalid postcodes.
  
The project is hosted on the free tier of Heroku. The limitation of this is that the server will go to sleep if not used for a while. As a result, it may take up to 20 seconds to first load the app.

### Requirements

This app uses an Airtable base as CMS - you will need to have a base set up with the following columns of data:

  - `key` (serial ID column)
  - `address` (short text)
  - `postcode` (short text)
  - `lease_length` (short text)
  - `landlord_tenants_act` (single select - yes / no / don't know)
  - `date_of_last_rent_review` (date)
  - `date_of_next_rent_review` (date)
  - `annual_rent` (currency)
  - `square_feet` (number)
  - `price_sqft` (currency)
  - `service_charge` (currency)
  - `use_class` (single select - a1, a3, b1, b2, b8, d1, d2, Other)
  - `yard_sqft` (number)
  - `yard_price_sqft` (currency)
  - `restricted` (single select - Restricted, Unrestricted, Don't know)
  - `specification` (single select - Refurbished, Shell, Other/Not sure)
  - `break_clauses` (long text)
  - `landlord_name` (short text)
  - `additional_comments` (long text)
  - `geolocation` (short text)

>If collecting data by form, all fields are required, except `address`, `service_charge`, `yard_sqft`, `yard_price_sqft`, `break_clauses` and `additional_comments`. `geolocation` does not need to be filled in manually, it will be added to the table automatically.

### Local Installation

- Clone this repo
- `npm install`
- Create a `.env` file in the root
- Add environment variable AIRTABLE_API_KEY with your own Airtable API key
- `npm run dev` to run locally

### Tests

Testing is done with Jest. Server controllers and models all have corresponding tests. Front end testing is less thorough, however many components have at least smoke tests written.

### Contributing

Community contributions are not accepted at this stage.

### TODO

Findings from the user research conducted with Queen Mary Universirty have shown the need for the following features:
  - Restrict use to registered users
  - Create a super-user role for street-reps
  - Require new sign ups to be refferred and/or verified by street-reps
  - Require street-reps to verify any new data added to the platform
  - Allow street-reps to review and remove any data they have verified
  - Allow street-reps to nominate other users as street-reps
  
In addition, we would recommend
  - Migration from Airtable to database
  - More thorough testing

### Contact

- East End Trades Guild - @KrissieN
- Development Team - @arrested-developer, @dupreesi, @armandlluka

### License

Released under the MIT license
