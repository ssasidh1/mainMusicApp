import { connectDB } from "./mongoConnections.js";
const { client, database, collection } = await connectDB();
async function deleteFromPlaylist(emailID, playlist, title) {
    try {
        const res = await collection.updateOne({ emailID: emailID, 'playlist.playlistName': playlist }, { $pull: { 'playlist.$.songs': { title: title } } });
        //console.log("delete",res)
    }
    catch (e) {
        console.log("delete error", e);
    }
}
export default deleteFromPlaylist;
