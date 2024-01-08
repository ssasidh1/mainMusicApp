import { connectDB } from "./mongoConnections.js";
const { client, database, collection } = await connectDB();
export default async function authUsersFromDB(emailID, password) {
    try {
        //console.log(emailID,password)
        const res = await collection.findOne({ emailID: emailID, password: password });
        //console.log(res)
        return res;
    }
    catch (e) {
        console.log("insert error", e);
    }
}
