import clientPromise from "../../lib/mongo"

export async function GET(){
    try{
        const client = await clientPromise
        const db = client.db("eco-map")
        const streets = await db.collection('streets').find({}).toArray()
        return Response.json(streets)
    }catch(err){
        return new Response(JSON.stringify({
            error:err.message,
            status :500
        }))
    }
}