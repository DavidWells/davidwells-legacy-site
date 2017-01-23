import axios from 'axios'

/*
airTableData = {
  fields: {
    YOUR_FIELD_NAMES: 'blah',
    'Date Added': new Date()
  }
}
*/
export default function airtablePost(endpoint, airTableData, token) {
  return axios({
    method: 'post',
    url: endpoint,
    data: airTableData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((error) => {
    const e = { ...error }
    if (e.response.status === 422) {
      console.warn(e.response.statusText)
      console.log('These object keys dont match airtable columns', airTableData.fields) // eslint-disable-line
    }
    throw error
  })
}
/*
var Airtable = require('airtable');
var base = new Airtable({ apiKey: 'xxx' }).base('appDoMTdBJONoibOK');

base('Table 1').create({}, function(err, record) {
    if (err) { console.log(err); return; }
    console.log(record);
});
*/
