import clientPromise from "./mongo";

export async function findUserByEmail(email) {
  const client = await clientPromise;
  const db = client.db("eco-map");
  return db.collection("users").findOne({ email });
}

export async function createUser(user) {
  const client = await clientPromise;
  const db = client.db("eco-map");
  const result = await db.collection("users").insertOne(user);
  return result;
}

export async function getAllUsers() {
  const client = await clientPromise;
  const db = client.db("eco-map");
  return await db.collection("users").find({}).toArray();
}

export async function updateUserRole(email, role) {
  const client = await clientPromise;
  const db = client.db("eco-map");
  return await db.collection("users").updateOne(
    { email },
    { $set: { role } }
  );
}

