'use strict';
const nodemailer = require('nodemailer');

module.exports.main = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const eventBody = JSON.parse(event.body);
  const { host, port, secure, auth } = eventBody.config;

  let transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth
  });

  // setup email data with unicode symbols
  let mailOptions = eventBody.options;

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          const response = {
            statusCode: 500,
            body: JSON.stringify({
              message: error,
            }),
          };
          callback(error, response);

      }
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: `Email sent!`,
        }),
      };

      callback(error, response);
      console.log('Message sent: %s', info.messageId);
  });
};
