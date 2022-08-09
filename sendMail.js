'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

class SendMail {
  constructor(contactEmail, contactMessage) {
    this.contactEmail = contactEmail;
    this.contactMessage = contactMessage;
  }

  transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp-relay.gmail.com',
    secure: true,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  emailContent = () => {
    return {
      from: this.contactEmail,
      to: process.env.SMTP_USER,
      replyTo: this.contactEmail,
      subject: 'Contact Form Submission',
      html: `${this.contactMessage}`,
    };
  };

  send = () => {
    this.transporter.sendMail(this.emailContent(), (error) => {
      if (error) {
        console.log(error);
        console.log('Something went wrong');
        throw 'Error sending email';
      }
    });
  };

  //   transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     secure: true,
  //     auth: {
  //       type: 'OAuth2',
  //       user: 'user@example.com',
  //       accessToken: 'ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x',
  //     },
  //   });

  //   transporter = nodemailer.createTransport({
  //     host: 'localhost',
  //     port: 1025,
  //     auth: {
  //       user: 'project.1',
  //       pass: 'secret.1',
  //     },
  //   });

  //   verify = (error) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Ready to Send');
  //     }
  //   };
}

module.exports = SendMail;
