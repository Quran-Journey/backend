require('dotenv').config();
import { Client, ClientConfig } from "pg";

const client: Client = new Client();
const config:ClientConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? ""),
    database: process.env.POSTGRES_DB,
};
let db = new Client(config);

async function connect_to_db() {
    let retries = 5;
    while (retries) {
        db = new Client(config);
        await db
            .connect()
            .then(() => {
                console.log("Connected to db successfully");
                retries = 0;
                return;
            })
            .catch(async (err) => {
                console.log("Could not connect to db, retrying", err);
                retries--;
                console.log(`retries left: ${retries}`);
                // wait 5 seconds
                await new Promise<void>((res) => setTimeout(() => res(), 3000));
            });
    }
}

connect_to_db();

export default { db, connect_to_db };
