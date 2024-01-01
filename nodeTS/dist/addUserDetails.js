import { connectDB } from "./mongoConnections.js";
const { client, database, collection } = await connectDB();
async function addUserDetails(emailID, password, username) {
    try {
        await collection.insertOne({ emailID: emailID, password: password, username: username });
    }
    catch (e) {
        console.log("insert error", e);
    }
}
export default addUserDetails;
