
import { Db, MongoClient } from 'mongodb';

let cachedDB:any = null
export async function connectDB() {
  if(cachedDB){
    return cachedDB;
  }

  const uri = "mongodb+srv://ssasidh1:irsUBnidhi@music.4vb1rkj.mongodb.net/";
  const client = new MongoClient(uri);

  await client.connect();

  const database = client.db("musico");
  const collection = database.collection("userDetails");
 
  const res = await collection.find().toArray();
  //console.log("done",res)
  cachedDB = { client, database, collection };
  return cachedDB;
}

