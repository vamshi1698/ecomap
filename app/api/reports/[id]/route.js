import clientPromise from "./../../../lib/mongo";
import { ObjectId } from "mongodb";

export async function PUT(req, context) {
  const { id } = await context.params; 
  const { status } = await req.json();

  const client = await clientPromise;
  const db = client.db("eco-map");

  const result = await db.collection("reports").findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status } },
    { returnDocument: "after" }
  );

  if (!result.value) {
    return new Response(JSON.stringify({ error: "Report not found" }), { status: 404 });
  }

  return new Response(JSON.stringify({ status: result.value.status }), { status: 200 });
}
