import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";
let client;
let clientPromise;

client = new MongoClient(uri);
clientPromise = client.connect()

export default clientPromise;