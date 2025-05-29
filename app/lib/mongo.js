import { MongoClient } from "mongodb";
let client;
let clientPromise;

client = new MongoClient(process.env.MONGO_URI);
clientPromise = client.connect()

export default clientPromise;