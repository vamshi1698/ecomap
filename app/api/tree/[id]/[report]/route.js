import clientPromise from '../../../../lib/mongo'

export async function POST( req) {
  const data = await req.json()
  console.log(data)
  try {
    const client = await clientPromise;
    const db = client.db("eco-map");
    const streets = await db.collection("reports").insertOne(data)
    return new Response(JSON.stringify(streets), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
        status: 500
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}