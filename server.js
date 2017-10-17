const dotenv = require('dotenv').config();
const config = require('./config/config.js');
const express = require(`express`);
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get(`/`, function (req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/sendsms', function(req, res){
  var message = req.body.message;
  res.send('on the page working');
  sendMessage(message);
});

function sendMessage(message) {
  const postData = JSON.stringify({
    'accountreference':'EX0240801',
    'messages':[{
      'to':'447969336012',
      'body':message,
    }]
  });

  const options = {
    hostname: 'api.esendex.com',
    path: '/v1.0/messagedispatcher',
    method: 'POST',
    auth: config.email + ':' + config.password,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
  });

  req.write(postData);
  req.end();
}

app.listen(PORT, function(){
  console.log(`I'm listening on ${PORT}`);
});
