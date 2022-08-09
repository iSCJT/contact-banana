require('dotenv').config();

const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const SendMail = require('./sendMail');

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());

router.post('/contact', upload.none(), (req, res) => {
  console.log(req.body);

  const data = req.body;
  const { email, message, info } = data;
  console.log(email, message);

  //  Info is a honeypot field, reject if it has a value
  if (!info) {
    const sm = new SendMail(email, message);

    try {
      sm.send();
      res.status(200).send('Successfully sent message');
    } catch {
      res.status(500).send('Error sending mail');
    }
  } else {
    res.status(403).send();
  }
});

app.use('/', router);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server listening at http://%s:%s', host, port);
});
