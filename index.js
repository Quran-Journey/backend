require("dotenv");
const https = require("https");
const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const lesson = require("./routes/lesson");
const reflection = require("./routes/reflection");
const surahInfo = require("./routes/surah-info");
const word = require("./routes/word/main");
const mufasir = require("./routes/mufasir");
const surah = require("./routes/surah");
const setup = require("./tests/setup");
const cors = require("cors");
const path = require("path");
const db = require("./services/postgres/connect");
const verseInfo = require("./routes/verseInfo");
const tafsir = require("./routes/tafsir");
const authentication = require("./routes/auth");
const { checkAuth } = require("./services/firebase/auth");

var port = process.env.PORT || 3001;

var app = express();

// Serve static documentation files
app.use(express.static(path.join(__dirname, "/docs")));
app.route("/").get((req, res) => {
    res.sendFile(path.join(__dirname + "/docs/index.html"));
});

if (process.env.NODE_ENV == "production") {
    // Find and use SSL certificates for HTTPS
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
    // After setting up the process's port, we seed the database with mock data.
    app.listen(port, async () => {
        console.log("Listening on port " + port);
        await setup.seedDatabase(db, true);
    });
}
else if (process.env.NODE_ENV == "staging") {
    // Database is not seeded by this node process for staging environment
    app.listen(port, async () => {
        // Database should be seeded externally (i.e. using a separate script)
        console.log("Listening on port " + port);
    });
}
