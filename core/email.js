const nodemailer = require('nodemailer')

async function sendEmail(to, html) {
  let config = {
    host: 'smtp.163.com',
    port: 465,
    auth: {
      user: 'wee_1118@163.com',
      pass: 'JAJMUAVNHPJBWNGM'  
    }
  }

  let transporter = nodemailer.createTransport(config)
  let info = await transporter.sendMail({...emailContent(html)});

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  
  function emailContent(html) {
    return {
      from: '"Fred Foo 👻" <wee_1118@163.com>', // sender address
      to, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html, // html body
    }
  }
}


module.exports = {sendEmail}