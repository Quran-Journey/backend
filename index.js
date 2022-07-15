const https = require("https");
const fs = require("fs");
const express = require("express");
// const firebase = require('firebase/app');
// const auth = require('firebase/auth');
const admin = require('firebase-admin');
const bodyParser = require("body-parser");
const lesson = require("./routes/lesson");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

var port = process.env.PORT || 3001;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", require("ejs").renderFile);

app.use(async (req, res, next) => {
    console.log(`\nEndpoint Hit: ${req.method} ${req.originalUrl}\n`);
    next();
});

app.use("/api", lesson);

app.get("/login", function(req, res) {
    res.render("login.html");
});

app.get("/signup", function(req, res){
    res.render("signup.html");
});

app.get("/", function(req, res) {
    res.render("index.html");
});

app.get("/profile", function(req, res) {
    res.render("profile.html");
    admin.auth().then(() => {
        res.render("profile.html");
    }).catch((error) => {
        res.redirect("/login");
    });
})

app.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();
    admin.auth();
});

app.get("/sessionLogout", (req, res) => {
    res.redirect("/login");
});

if (process.env.NODE_ENV == "production") {
    // This sets the options for https so that it finds the ssl certificates
    var privateKey = fs.readFileSync(
        "/etc/letsencrypt/live/offlinequran.org-0001/privkey.pem"
    );
    var certificate = fs.readFileSync(
        "/etc/letsencrypt/live/offlinequran.org-0001/cert.pem"
    );
    var chain = fs.readFileSync(
        "/etc/letsencrypt/live/offlinequran.org-0001/fullchain.pem"
    );
    const httpsOptions = {
        cert: certificate,
        key: privateKey,
        ca: chain,
    };

    var httpsServer = https.createServer(httpsOptions, app).listen(port, () => {
        console.log("Serving on https");
    });
} else if (process.env.NODE_ENV == "development") {
    app.listen(port, () => {
        console.log("Listening on port " + port);
    });
}
