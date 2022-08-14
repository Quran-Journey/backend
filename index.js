require("dotenv");
const https = require("https");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const lesson = require("./routes/lesson");
const reflection = require("./routes/reflection");
const surahInfo = require("./routes/surah-info");
const words = require("./routes/words");
const meanings = require("./routes/meanings");
const mufasir = require("./routes/mufasir");
const quran = require("./routes/quran");
const cors = require("cors");
const path = require("path");

var port = 3001;

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    console.log(`\nEndpoint Hit: ${req.method} ${req.originalUrl}\n`);
    next();
});

app.use("/api", lesson);
app.use("/api", reflection);
app.use("/api", surahInfo);
app.use("/api", mufasir);
app.use("/api", quran);
app.use("/api", words);
app.use("/api", meanings);

app.use(express.static(path.join(__dirname, "/docs")));
app.route("/").get((req, res) => {
    res.sendFile(path.join(__dirname + "/docs/index.html"));
});

if (process.env.NODE_ENV == "production") {
    // This sets the options for https so that it finds the ssl certificates
    var privateKey = fs.readFileSync(
        "/etc/letsencrypt/live/offlinequran.com/privkey.pem"
    );
    var certificate = fs.readFileSync(
        "/etc/letsencrypt/live/offlinequran.com/cert.pem"
    );
    var chain = fs.readFileSync(
        "/etc/letsencrypt/live/offlinequran.com/fullchain.pem"
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
