const AWS = require('aws-sdk')
const sns = new AWS.SNS()
const Entities = require('html-entities').XmlEntities
const entities = new Entities()
const topicName = process.env.topicName

module.exports.contactForm = (event, context, callback) => {
  const functionArnCols = context.invokedFunctionArn.split(':')
  const region = functionArnCols[3]
  const accountId = functionArnCols[4]
  const topicArn = `arn:aws:sns:${region}:${accountId}:${topicName}`

  const body = JSON.parse(event.body)
  if (!body) {
    return callback(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        data: 'no body'
      }),
    })
  }

  // compose message
  var message = ''
  Object.keys(body).map((item) => {
    message += `▸ ${item}:\n\n${entities.decode(`${body[item]}`)}\n\n`
  })
  message += `▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔\n\n`
  const replySubject = encodeURIComponent('Thanks for reaching out')
  const msgBody = (body.message) ? `> ${body.message.substring(0, 1000)} ...` : ''
  const replyBody = encodeURIComponent(`Hi ${body.name},

${msgBody}`)
  message += `Mobile Reply: <mailto:${body.email}?Subject=${replySubject}&body=${replyBody}>\n\n`
  message += `───────────────────\n\n`
  message += `Reply: <https://mail.google.com/mail/?view=cm&fs=1&to=${body.email}&su=${replySubject}&body=${replyBody}>\n`

  const name = body.name
  const subjectName = (name) ? ` from ${name}` : ''
  const subject = `New contact form submission${subjectName}`

  const snsPromise = sns.publish({
    Message: message,
    Subject: subject,
    TopicArn: topicArn
  }).promise()

  snsPromise.then((data) => {
    console.log('Success', data)
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
        'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({
        data
      }),
    }
    return callback(null, response)
  }).catch((err) => {
    console.log(err)
  })
}
