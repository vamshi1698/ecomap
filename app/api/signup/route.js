import bcrypt from "bcryptjs";
import clientPromise from '../../lib/mongo';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("eco-map");
  if (req.method !== "POST") {
    return res.status(405).json({message: "Only POST allowed"});
  }

  const {name,email,password,role = "user"}=req.body;

  if (!name||!email||!password) {
    return res.status(400).json({message: "Missing fields"});
  }

  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
    role
  }); 

  res.status(201).json({ message: "User created", userId: result.insertedId });
}
