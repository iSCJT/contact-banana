require('dotenv').config();

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const SendMail = require('./send-mail');
// const { check, validationResult } = require('express-validator');

const app = express();

// TODO: CORS not blocking processing of request
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());

router.post('/contact', upload.none(), async (req, res) => {
  const data = req.body;
  const { email, message, info, source } = data;

  //  Info is a honeypot field, reject if it has a value
  if (!info) {
    const sm = new SendMail(email, message, source);

    try {
      const sendResult = await sm.send();
      // console.log('logging send');
      console.log(sendResult);
      res.status(200).send('Successfully sent message');
    } catch (err) {
      console.log(err);
      res.status(500).send('Error sending mail');
    }
  } else {
    res.status(403).send();
  }
});

app.use('/', router);

app.listen(3000, function () {
  console.log('Server listening at https://contact.speckledbanana.com');
});
