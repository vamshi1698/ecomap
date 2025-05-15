import clientPromise from "../../lib/mongo";

export async function POST(){
    try{
        const client = await clientPromise
        const db = client.db("eco-map")
        const users = await db.collection('users').find({}).toArray()
        return Response.json(users)
    }catch(err){
        return new Response(JSON.stringify({
            error:err.message,
            status :500
        }))
    }
}

export async function GET(){
    return new Response("This is a GET request")
}