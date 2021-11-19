// TODO send email to the client using Nodemailer!
const nodemailer = require('nodemailer');
const { message } = require('../views/pages');

function sendKey(name, email, key) {
  console.log(`${name}!\n\nThis is your API key: ${key}\n\n`);

  // replace this part of the code with your mailtrap details
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '0dc4d81bef1f16',
      pass: '5ad93b3a25a7ef',
    },
  });

  const mailOptions = {
    from: 'support@clients-api.com', // sender address
    to: email, // list of receivers
    subject: 'Your Clients API Key', // Subject line
    html: message(name, key), // plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}

module.exports = { sendKey };
