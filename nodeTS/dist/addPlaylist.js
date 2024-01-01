import { connectDB } from "./mongoConnections.js";
const { client, database, collection } = await connectDB();
async function addPlayList(emailID, playlist, songs) {
    try {
        const existingRecord = await collection.findOne({ emailID: emailID });
        const existingPlaylist = await collection.findOne({ emailID: emailID, 'playlist.playlistName': playlist });
        if (existingRecord && !existingPlaylist) {
            const result = await collection.updateOne({ emailID: emailID }, { $addToSet: { playlist: { playlistName: playlist, songs: songs } } });
        }
        else if (existingRecord && existingPlaylist) {
            const result = await collection.updateOne({ emailID: emailID, 'playlist.playlistName': playlist }, { $addToSet: { 'playlist.$.songs': { $each: songs } } });
        }
    }
    catch (e) {
        console.log("update error", e);
    }
}
export default addPlayList;
