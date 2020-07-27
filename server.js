const AWS = require('aws-sdk'); // Load the SDK for JavaScript
const mailer = require("./mailer");
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser');



app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }

  );
}else{
  app.use(express.static('./client/build'));
}

// Our end-point for handling the enquiry request
app.post('/api/contact', (req, res, next) => {
  console.log(req.body);
  return mailer.sendMail('info@codemarket.io', [req.body.email], req.body)
    .then(() => res.send(req.body))
    .catch(next);
});

app.listen(port, () => console.log(`Listening on port ${port}`));