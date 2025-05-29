import clientPromise from '../../../lib/mongo';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  const { id } =await params;
  try {
    const client = await clientPromise;
    const db = client.db('eco-map');

    const trees = await db.collection('trees').find({ location_id: id }).toArray();

    return new Response(JSON.stringify(trees), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  try {
    var body = await req.json();
    const client = await clientPromise;
    const db = client.db('eco-map');
    body = [...body,status="pending"]
    const result = await db.collection('trees').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: body },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      return new Response(JSON.stringify({ error: 'Tree not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(result.value), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    const client = await clientPromise;
    const db = client.db('eco-map');

    const tree = await db.collection('trees').findOne({ tree_id: id });
    if (!tree) {
      return new Response(JSON.stringify({ error: 'Tree not found' }), { status: 404 });
    }

    await db.collection('trees').deleteOne({ tree_id: id });

    await db.collection('streets').updateOne(
      { location_id: tree.location_id },
      { $inc: { no_of_trees: -1 } }
    );

    return new Response(JSON.stringify({ message: 'Tree deleted' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
