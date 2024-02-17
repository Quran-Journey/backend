require("dotenv");
import { setup_pool } from "./services/postgres/connect";
import { baseSetup } from "./server";
import { sendSMS } from "./services/twilio/sms";

const db = setup_pool();
const server = baseSetup(db);

// Handle SIGINT to close the server gracefully
process.on("SIGINT", () => {
    gracefulTermination();
});

// Handle SIGTERM to close the server gracefully
process.on("SIGTERM", () => {
    gracefulTermination();
});

/**
 * Gracefully terminates the server and the database pool.
 */
function gracefulTermination() {
    console.log("Closing server...");
    server.close(() => {
        sendSMS("QJ Backend Server terminating.");
        console.log("Server closed.");
        // Terminate the database pool after the server is closed
        db.end().then(() => {
            console.log("Database pool terminated.");
            process.exit(0);
        });
    });
}
