import clientPromise from '../../../lib/mongo'

export async function GET( req,{ params }) {
  const { id } =await params;
  if (!id) {
    return new Response(
      JSON.stringify({ error: 'ID parameter is missing' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  try {
    const client = await clientPromise;
    const db = client.db("eco-map");
    const streets = await db.collection("streets").findOne({ location_id: id })

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