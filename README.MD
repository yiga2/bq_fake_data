#How to use
Packaging that wraps the faker.js file for en_US locale in a way that is compatible with BigQuery as a javascript UDF.
 
See https://medium.com/swlh/how-to-package-a-javascript-library-for-use-in-bigquery-2bf91061f66f

- Updated to use faker.js 5.1.0
- Must edit `index.js` in faker dependency to load `en_US` only:

      var faker = new Faker({ locales: require('./lib/locales/en_US') });

Usage:
```
CREATE TEMP FUNCTION state_zip(id STRING)
RETURNS STRUCT<state String, zip STRING>
LANGUAGE js 
AS """
  var f = fakerbq.GetFaker()
  f.locale = "en_US";
  f.seed(Number(id));    
  this.state = f.address.stateAbbr();
  this.zip = f.address.zipCodeByState(this.state);
  return this;
"""
OPTIONS (
    library=["gs://path/to/bq_fake.js"]
);

SELECT state_zip('123').*
```
