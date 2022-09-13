require('dotenv').config();

const express = require('express');
const multer = require('multer');
const SendMail = require('./send-mail');

const app = express();
const router = express.Router();
const upload = multer();
const port = process.env.PORT;

const checkDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
  res.header('Access-Control-Allow-Methods', 'POST');
  if (req.get('origin') !== process.env.ALLOW_ORIGIN) {
    res.status(403).send();
    res.end();
  } else {
    next();
  }
};

app.use(express.json());

app.post('/contact', checkDomain, upload.none(), async (req, res) => {
  const data = req.body;
  const { email, message, info, source } = data;

  //  Info is a honeypot field, reject if it has a value
  if (!info) {
    const sm = new SendMail(email, message, source);

    try {
      const sendResult = await sm.send();
      console.log(sendResult);
      res.status(200).send('Successfully sent message');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error sending message');
    }
  } else {
    res.status(403).send();
  }
});

app.use('/', router);

app.listen(port, function () {
  console.log(`Server listening on port ${port}`);
});
