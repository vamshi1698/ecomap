import clientPromise from '../../lib/mongo';

export async function POST(req) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db('eco-map');

    const result = await db.collection('trees').insertOne(body);

    await db.collection('tree_locations').updateOne(
      { location_id: body.location_id },
      { $inc: { no_of_trees: 1 } }
    );

    return new Response(JSON.stringify(result.ops?.[0] || body), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
