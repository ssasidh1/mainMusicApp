import { connectDB } from "./mongoConnections.js"
import IUser from "./IUser"
const {client,database,collection} = await connectDB();
async function deletePlaylist(emailID:string, playlist:string){
    try
    {
        const res = await collection.updateOne(
            {emailID:emailID,'playlist.playlistName':playlist},
            {$pull:{'playlist':{playlistName:playlist}}}
        );
        //console.log("delete",res)
    }catch(e){
        console.log("delete error",e)
    }
}

export default deletePlaylist