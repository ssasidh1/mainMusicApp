import { connectDB } from "./mongoConnections.js"
import IUser from "./IUser"
const {client,database,collection} = await connectDB();
async function addUserDetails(emailID:string, password:string,username:string){
    try
    {
        await collection.insertOne({emailID:emailID,password:password,username:username})
    }catch(e){
        console.log("insert error",e)
    }
}

export default addUserDetails