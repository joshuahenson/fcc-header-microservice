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
  var uaOS = parser(req.headers['user-agent']).os
  //replace if ipv4
  var ip = req.ip.replace(/^::ffff:/,'');
  var jsonResponse = {
    "ipaddress": ip,
    "language": req.acceptsLanguages()[0],
    "software": uaOS.name + ' ' + uaOS.version
  }
  res.send(jsonResponse);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
