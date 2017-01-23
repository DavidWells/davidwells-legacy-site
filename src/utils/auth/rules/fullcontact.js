/* eslint-disable */
/*
Full contact data enrichment Function used in Auth0
*/
function (user, context, callback) { // eslint-disable-line
  var FULLCONTACT_KEY = 'YOUR_KEY_HERE';

  // skip if no email
  if (!user.email) {
    return callback(null, user, context);
  }
  // skip if fullcontact metadata is already there
  if (user.user_metadata && user.user_metadata.fullcontact) {
    return callback(null, user, context);
  }
  // request module avialable in auth0
  request({
    url: 'https://api.fullcontact.com/v2/person.json',
    qs: {
      email:  user.email,
      apiKey: FULLCONTACT_KEY
    }
  }, function (error, response, body) {
    if (error || (response && response.statusCode !== 200)) {
      // swallow fullcontact api errors and just continue login
      return callback(null, user, context);
    }

    // if we reach here, it means fullcontact returned info and we'll add it to the metadata
    user.user_metadata = user.user_metadata || {};
    user.user_metadata.fullcontact = JSON.parse(body);

    auth0.users.updateUserMetadata(user.user_id, user.user_metadata);
    return callback(null, user, context);
  });
}
