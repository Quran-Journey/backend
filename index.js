const https = require("https");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var port = 3001;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`\nEndpoint Hit: ${req.originalUrl}\n`);
  next();
});

if (process.env.NODE_ENV == "production") {
  // This sets the options for https so that it finds the ssl certificates
  var privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/offlinequran.org-0001/privkey.pem"
  );
  var certificate = fs.readFileSync(
    "/etc/letsencrypt/live/offlinequran.org-0001/cert.pem"
  );
  const httpsOptions = {
    cert: certificate,
    key: privateKey,
  };

  var httpsServer = https.createServer(httpsOptions, app).listen(port, () => {
    console.log("Serving on https");
  });
} else if (process.env.NODE_ENV == "development") {
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
}
