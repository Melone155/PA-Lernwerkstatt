import { MongoClient, ServerApiVersion } from "mongodb";

export const uri = "mongodb://admin:pw@147.189.175.136:27017/?authMechanism=DEFAULT";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db;

export async function connectDB() {
    try {
        await client.connect();
        db = client.db("fuchshost");
        console.log("Verbindung zu MongoDB erfolgreich");
    } catch (error) {
        console.error("Fehler bei der Verbindung zu MongoDB:", error);
        process.exit(1);
    }
}