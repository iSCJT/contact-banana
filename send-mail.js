'use strict';
require('dotenv').config();
const nodemailer = require('nodemailer');

class SendMail {
  #contactEmail;
  #contactMessage;
  #source;

  constructor(contactEmail, contactMessage, source) {
    this.#contactEmail = contactEmail;
    this.#contactMessage = contactMessage;
    this.#source = source;
  }

  #transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: 'smtp-relay.gmail.com',
    secure: true,
    requireTLS: true,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  #emailContent = () => {
    return {
      from: process.env.EMAIL_TO,
      to: process.env.EMAIL_TO,
      replyTo: this.#contactEmail,
      subject: 'Contact Form Submission',
      html: `<p>${this.#contactMessage}</p><hr><p>From: ${
        this.#contactEmail
      }</p><hr><p>Source: ${this.#source}</p>`,
    };
  };

  send = async () => {
    console.log('sending email');
    return this.#transporter.sendMail(this.#emailContent());
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
