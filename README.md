[![Build Status](https://travis-ci.org/fac-14/eastendtradesguild.svg?branch=master)](https://travis-ci.org/fac-14/eastendtradesguild)
[![codecov](https://codecov.io/gh/fac-14/eastendtradesguild/branch/master/graph/badge.svg)](https://codecov.io/gh/fac-14/eastendtradesguild)

# eastendtradesguild

![app](https://i.imgur.com/0LvmSTr.png)

> FAC 14 Client Project by Michael Simon and Armand

The EETG is an alliance  of 250 small independent businesses and the self employed. As well as offering goods and services members provide social spaces, sustaining relationships between neighbours and making East London's streets safer and better places to be.

Our initial MVP is an interactive map. It will help local businesses to view and input data about commercial property rents in their neighbourhood. The aim is to empower independent businesses in times of skyrocketing business rent increases. 

### Main Tech Stack

| Core | Testing |
| - | -------- |
|Node|jest|
|Express|supertest|
|React|eslint|
|Airtable|react-testing-library|
|HTML|nodemon|
|Leaflet React|codecov|
|Tachyons||

### Basic Concept

The app is based on an Express server (backend) and React (frontend engine). It uses various external APIs to get things working. It uses React Leaflet which is based on OpenStreetMaps. It uses Airtable to store, update and edit data. It also uses PostcodesIO in order to transform UK postcodes into geolocation data necessary for rendering data entries onto the map. 

The app is up and running here: http://eastendtradesguild.herokuapp.com/
