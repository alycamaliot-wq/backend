const nodemailer = require('nodemailer')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }
  async sendActivationMail(email, activationLink) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Activate your account on ${process.env.SMTP_NAME}`,
      html: `
      <div>
        <h1 style='font-size: 18px, font-weight: 500'>You can activate your account by going through giving link but if you have not registered on ${process.env.SMTP_NAME}, Ignore the message (Please if uve gone through link even if it was not you contact the support on ${process.env}</h1>
        <a href="${activationLink}">Press to activate your account</a>
      </div>
      `,
    })
  }
}

module.exports = new MailService()
