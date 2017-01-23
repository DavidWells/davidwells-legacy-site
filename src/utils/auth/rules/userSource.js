/* eslint-disable */
/*
Function used in Auth0
*/
function (user, context, callback) {
  console.log(context)
  var loginCount = context.stats.loginCount;
  var analytics = context.request.query.analytics
  console.log('loginCount', loginCount)
  // skip if userSource metadata is already there
  if (user.user_metadata && user.user_metadata.source) {
    return callback(null, user, context);
  }

  // if we reach here, it means fullcontact returned info and we'll add it to the metadata
  user.user_metadata = user.user_metadata || {};
  user.user_metadata.source = {test: 'hi'}

  auth0.users.updateUserMetadata(user.user_id, user.user_metadata);
  return callback(null, user, context);
}
