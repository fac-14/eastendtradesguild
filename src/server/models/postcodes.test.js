const {
  makePostcodeArray,
  makeLatLngArray,
  getGeolocation,
} = require('./postcodes');

// define input and expected output for makePostcodeArray

const airtableResponse = [
  {
    id: 'ushdgkjsfng',
    postcode: 'N4 3HF',
  },
  {
    id: 'sakgafkgjag',
    postcode: 'N4 3HH',
  },
  {
    id: 'iaurhgkjasbg',
    postcode: 'N4 3HQ',
  },
];

const postcodeArray = ['N4 3HF', 'N4 3HH', 'N4 3HQ'];

describe('postcodes :: makePostCodeArray', () => {
  it('returns only the postcodes in an array', () => {
    const actual = makePostcodeArray(airtableResponse);
    expect(actual).toEqual(postcodeArray);
  });
});

describe('postcodes :: POST request', () => {
  it('returns an array of 3 items', () => {
    getGeolocation(postcodeArray).then(res => expect(res.length).toBe(3));
  });
});

// define input and output for makeLatLng, including 'invalid' geolocation results
const geolocationInput = [
  {
    query: 'N4 3HH',
    result: {
      postcode: 'N4 3HH',
      quality: 1,
      eastings: 531219,
      northings: 186738,
      country: 'England',
      nhs_ha: 'London',
      longitude: -0.108292,
      latitude: 51.564261,
      european_electoral_region: 'London',
      primary_care_trust: 'Islington',
      region: 'London',
      lsoa: 'Islington 005B',
      msoa: 'Islington 005',
      incode: '3HH',
      outcode: 'N4',
      parliamentary_constituency: 'Islington North',
      admin_district: 'Islington',
      parish: 'Islington, unparished area',
      admin_county: null,
      admin_ward: 'Finsbury Park',
      ccg: 'NHS Islington',
      nuts: 'Haringey and Islington',
      codes: {
        admin_district: 'E09000019',
        admin_county: 'E99999999',
        admin_ward: 'E05000371',
        parish: 'E43000209',
        parliamentary_constituency: 'E14000763',
        ccg: 'E38000088',
        nuts: 'UKI43',
      },
    },
  },
  {
    query: 'N5 4JD',
    result: null,
  },
  {
    query: 'N1 3AA',
    result: {
      postcode: 'N1 3AA',
      quality: 1,
      eastings: 532247,
      northings: 184127,
      country: 'England',
      nhs_ha: 'London',
      longitude: -0.094451,
      latitude: 51.540557,
      european_electoral_region: 'London',
      primary_care_trust: 'Islington',
      region: 'London',
      lsoa: 'Islington 018B',
      msoa: 'Islington 018',
      incode: '3AA',
      outcode: 'N1',
      parliamentary_constituency: 'Islington South and Finsbury',
      admin_district: 'Islington',
      parish: 'Islington, unparished area',
      admin_county: null,
      admin_ward: "St Peter's",
      ccg: 'NHS Islington',
      nuts: 'Haringey and Islington',
      codes: {
        admin_district: 'E09000019',
        admin_county: 'E99999999',
        admin_ward: 'E05000380',
        parish: 'E43000209',
        parliamentary_constituency: 'E14000764',
        ccg: 'E38000088',
        nuts: 'UKI43',
      },
    },
  },
  {
    query: '',
    result: null,
  },
  {
    query: 'some nonsense',
    result: null,
  },
  {
    query: '154 High Street, London, E8 3GG',
    result: null,
  },
];

const geolocationOutput = [
  { lat: 51.564261, lng: -0.108292 },
  'invalid',
  { lat: 51.540557, lng: -0.094451 },
  'invalid',
  'invalid',
  'invalid',
];

describe('postcodes :: makeLatLngArray', () => {
  it('returns lat and lng, or "invalid"', () => {
    const actual = makeLatLngArray(geolocationInput);
    expect(actual).toEqual(geolocationOutput);
  });
});
