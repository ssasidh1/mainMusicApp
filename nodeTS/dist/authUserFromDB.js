import { connectDB } from "./mongoConnections.js";
const { client, database, collection } = await connectDB();
export default async function authUsersFromDB(emailID, password) {
    try {
        const res = await collection.findOne({ emailID: emailID, password: password });
        return res;
    }
    catch (e) {
        console.log("insert error", e);
    }
}
