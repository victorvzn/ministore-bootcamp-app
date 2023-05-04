import nodemailer  from 'nodemailer'

export async function sendMail (values) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.PASSWORD_SENDER
    }
  })

  const mailOptions = {
      from: '"Ministore" <victorzn23@gmail.com>',
      to: 'vznsosadev@gmail.com',
      subject: `Gracias por registrarte en ministore.co ✔ - ${values.id}`,
      text: 'Ahora podrás vender tus productos fácil y rápido en cualquier parte del mundo.',
      html: '<b>Ahora podrás vender tus productos fácil y rápido en cualquier parte del mundo.</b>'
  }

  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error)
      }
      console.log('Message sent: ' + info.response)
  })
}
