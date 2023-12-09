require("dotenv");
import https from "https";
import fs from "fs";
import express from "express";
import setup from "./services/postgres/seed";
import path from "path";
import connect  from "./services/postgres/connect";
import AppRouter from "./routes/index";

const port = process.env.PORT || 3001;
const app = express();
const db = connect.db;
const appRouter = new AppRouter(app);
appRouter.route();
// Serve static documentation files
app.use(express.static(path.join(__dirname, "/docs")));
app.route("/").get((req, res) => {
    res.sendFile(path.join(__dirname + "/../docs/index.html"));
});

if (process.env.NODE_ENV == "production") {
    // Use SSL certificates for HTTPS
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

    https.createServer(httpsOptions, app).listen(port, () => {
        console.log("Serving on https");
    });
} else if (process.env.NODE_ENV == "development") {
    // After setting up the process's port, we seed the database with mock data.
    app.listen(port, async () => {
        console.log("Listening on port " + port);
        await setup.seedDatabase(db, true);
    });
} else if (process.env.NODE_ENV == "staging") {
    // Note: The database should be seeded externally (i.e. using a separate script)
    app.listen(port, async () => {
        console.log("Listening on port " + port);
    });
}
