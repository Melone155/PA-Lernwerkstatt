import { MongoClient, ServerApiVersion } from "mongodb";

export const uri = "mongodb://DatabaseUser:BechtleAzubi2025@147.189.175.136:27017/?authMechanism=DEFAULT&authSource=NextlvlHardware";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db;

export async function connectDB() {
    console.log("Verbindung zu MongoDB herstellen...");
    try {
        await client.connect();
        db = client.db("NextlvlHardware");
    } catch (error) {
        console.error("Fehler bei der Verbindung zu MongoDB:", error);
        process.exit(1);
    }
}