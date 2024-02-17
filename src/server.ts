require("dotenv");
import https from "https";
import { Server } from "http";
import fs from "fs";
import express from "express";
import { seedDatabase } from "./services/postgres/seed";
import path from "path";
import AppRouter from "./routes/index";
import { Client, Pool } from "pg";

export function baseSetup(db: any): Server {
    const port = process.env.PORT || "3001";
    const app = express();
    const appRouter = new AppRouter(app);
    appRouter.route();
    // Serve static documentation files
    app.use(express.static(path.join(__dirname, "/docs")));
    app.route("/").get((req, res) => {
        res.sendFile(path.join(__dirname + "/../docs/index.html"));
    });
    if (process.env.NODE_ENV == "production") {
        return setupProductionServer(app, port);
    } else if (process.env.NODE_ENV == "development") {
        return setupDevServer(db, app, port);
    } else {
        return setupStagingServer(app, port);
    }
}

/**
 * Sets up a production server using SSL certificates for HTTPS.
 */
export function setupProductionServer(
    app: express.Express,
    port: string
): Server {
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
    return https.createServer(httpsOptions, app).listen(port, () => {
        console.log("Serving on https");
    });
}

/**
 * For development, after setting up the process's port, we seed the database with mock data.
 *
 * @param {PoolClient} db - the database pool client
 */
export function setupDevServer(
    db: any,
    app: express.Express,
    port: string
): Server {
    // After setting up the process's port, we seed the database with mock data.
    return app.listen(port, async () => {
        console.log("Listening on port " + port);
        await seedDatabase(db, true);
    });
}

/**
 * Sets up a staging server and starts listening on the specified port.
 */
export function setupStagingServer(app: express.Express, port: string): Server {
    return app.listen(port, async () => {
        console.log("Listening on port " + port);
    });
}
