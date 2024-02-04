require("dotenv").config();
import Pool from "pg-pool";
import { PoolConfig, PoolClient, Client } from "pg";
import { sendSMS } from "../twilio/sms";

const config: PoolConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? ""),
    database: process.env.POSTGRES_DB,
};

let isReconnecting = false;

/**
 * Asynchronously sets up connection pools for PostgreSQL database.
 */
export function setup_pool() {
    let pool = new Pool(config);
    pool.on("acquire", (client) => {
        console.log("Client acquired from the pool");
    });

    pool.on("connect", (client) => {
        console.log("Pool client connected");
    });

    pool.on("remove", (client) => {
        console.log("Client removed from the pool");
    });

    pool.on("error", (err, client) => {
        console.error(
            "Error in PostgreSQL connection pool, Trying to re-establish connection."
        );

        // Check if the error is fatal (57P01) and attempt to reconnect
        if (
            err.message.includes(
                "terminating connection due to administrator command"
            ) &&
            isReconnecting == false
        ) {
            console.log("Attempting to reconnect...");
            // End the pool gracefully before reconnecting
            pool.end(() => {
                console.log("Pool ended. Reconnecting...");
                setup_pool();
            });
            sendSMS(
                "There was an error with the postgres service. It seems it was terminated."
            );
            isReconnecting = true;
        }
        // console.log("Error in PostgreSQL connection: ", err);
        console.log(err.message);
        // setup_pool();
    });

    // Handle termination signals
    process.on("SIGTERM", async () => {
        console.log(
            "Received SIGTERM signal. Closing connections and shutting down..."
        );

        // Close your PostgreSQL connection pool
        await pool.end();
    });
    return pool;
}

/**
 * Asynchronously retrieves a database client, with the ability to handle connection retries and error events.
 *
 * @return {Promise<(Client & PoolClient) | undefined>} The database client, or undefined if none is available
 */
export async function get_db_client(
    pool: Pool<Client>
): Promise<(Client & PoolClient) | undefined> {
    let retries: number = 1;
    let client: Client & PoolClient;

    while (retries > 0) {
        try {
            client = await pool.connect();
            client.on("error", (err) => {
                console.log("Error in PostgreSQL connection: ", err);
            });
            isReconnecting = false;
            return client;
        } catch (err) {
            await new Promise<void>((res) => setTimeout(() => res(), 3000)); // wait 5 seconds
        }
        console.log(
            "Client could not connect, retrying",
            `retries left: ${retries--}`
        );
    }
    console.log("Client could not connect");
    // sendSMS("Client could not connect to the postgres service.");
    // process.kill(process.pid, "SIGINT");
}
