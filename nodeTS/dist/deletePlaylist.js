import { connectDB } from "./mongoConnections.js";
const { client, database, collection } = await connectDB();
async function deletePlaylist(emailID, playlist) {
    try {
        const res = await collection.updateOne({ emailID: emailID, 'playlist.playlistName': playlist }, { $pull: { 'playlist': { playlistName: playlist } } });
        //console.log("delete",res)
    }
    catch (e) {
        console.log("delete error", e);
    }
}
export default deletePlaylist;
