var express = require('express');
var app = express();
var parser = require('ua-parser-js');

app.set('port', (process.env.PORT || 5000));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/ip', function (req, res) {
// "ipaddress": "204.195.46.248",
// "language": "en-US",
// "software": "X11; Linux x86_64"
  var uaOS = parser(req.headers['user-agent']).os
  var jsonResponse = {
    "ipaddress": req.ip,
    "language": req.acceptsLanguages()[0],
    "software": uaOS.name + ' ' + uaOS.version
  }
  console.log(req.headers['user-agent'])
  console.log(parser(req.headers['user-agent']).os)
  res.send(jsonResponse);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
