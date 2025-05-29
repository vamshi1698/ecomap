import clientPromise from "./../../lib/mongo";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("eco-map");
    const reports = await db.collection("reports").find({}).toArray();

    return new Response(JSON.stringify(reports), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
