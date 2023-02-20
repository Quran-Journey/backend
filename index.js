require("dotenv");
const https = require("https");
const fs = require("fs");
const express = require("express");
// const firebase = require('firebase/app');
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const auth = require('firebase/auth');
const admin = require('firebase-admin');
const bodyParser = require("body-parser");
const lesson = require("./routes/lesson");
const reflection = require("./routes/reflection");
const surahInfo = require("./routes/surah-info");
const word = require("./routes/word/main");
const mufasir = require("./routes/mufasir");
const quran = require("./routes/quran");
const setup = require("./tests/setup");
const cors = require("cors");
const path = require("path");
const db = require("./model/db");
const verseInfo = require("./routes/verseInfo")
const tafsir = require("./routes/tafsir")

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

function checkAuth(req, res, next) {
    if (req.cookies.session) {
        admin.auth().verifySessionCookie(req.cookies.session)
            .then(() => {
                next();
            }).catch(() => {
                res.status(403).send('Unauthorized')
            });
    } else {
        res.status(403).send('Unauthorized!')
    }
}

const csrfMiddleware = csrf({ cookie: true });

var port = process.env.PORT || 3001;

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(csrfMiddleware);

app.engine("html", require("ejs").renderFile);

app.use(async (req, res, next) => {
    console.log(`\nEndpoint Hit: ${req.method} ${req.originalUrl}\n`);
    next();
});

app.use("/test", checkAuth);

app.use("/api", lesson);
app.use("/api", reflection);
app.use("/api", surahInfo);
app.use("/api", mufasir);
app.use("/api", quran);
app.use("/api", word);
app.use("/api", verseInfo);
app.use("/api", tafsir);

app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "/docs")));
app.route("/").get((req, res) => {
    res.sendFile(path.join(__dirname + "/docs/index.html"));
});

app.get('/test', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

app.get("/home", function (req, res) {
    res.render("index.html");
});

app.get("/login", function (req, res) {
    res.render("login.html");
});

app.get("/signup", function (req, res) {
    res.render("signup.html");
});

app.get("/profile", function (req, res) {
    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((userData) => {
            console.log("Logged in:", userData.email)
            console.log("profile-backend", userData)
            res.render("profile.html");
        })
        .catch((error) => {
            res.redirect("/login");
        });
});

app.post("/sessionLogin", (req, res) => {
    const idToken = req.body.idToken.toString();

    // Set session expiration to 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie("session", sessionCookie, options);
                res.end(JSON.stringify({ status: "success" }));
            },
            (error) => {
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        );
});

app.get("/sessionLogout", (req, res) => {
    res.clearCookie("session");
    res.redirect("/home");
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
    app.listen(port, async () => {
        console.log("Listening on port " + port);
        await setup.seedDatabase(db, true);
    });
}


