import express from 'express';
import addUserDetails from './addUserDetails.js';
import authUsersFromDB from './authUserFromDB.js';
import jwt from 'jsonwebtoken';
import { jwtToken, genTkFromRefreshTk } from './generateToken.js';
import cors from 'cors';
import { getAllPlaylistSongs, getPlaylists, getUserPlaylist } from './s3.js';
import addPlayList from './addPlaylist.js';
import deleteFromPlaylist from './deleteFromPlaylist.js';
import deletePlaylist from './deletePlaylist.js';
const app = express();
app.use(express.json());
app.use(cors());
getPlaylists(app);
getUserPlaylist(app);
getAllPlaylistSongs(app);
app.post("/signup", async (req, res) => {
    try {
        // console.log(req.body)
        await addUserDetails(req.body.email, req.body.password, req.body.username);
        res.send({ "msg": "success" });
    }
    catch (e) {
        // console.log("In add user details",e)
        res.sendStatus(500);
    }
});
app.post("/insertPlaylist", async (req, res) => {
    try {
        // console.log(req.body)
        await addPlayList(req.body.email, req.body.playlist, req.body.songs);
        res.send({ "msg": "success" });
    }
    catch (e) {
        // console.log("In add user details",e)
        res.sendStatus(500);
    }
});
app.post("/deleteFromPlaylist", async (req, res) => {
    try {
        // console.log(req.body)
        await deleteFromPlaylist(req.body.email, req.body.playlist, req.body.title);
        res.send({ "msg": "success" });
    }
    catch (e) {
        // console.log("In add user details",e)
        res.sendStatus(500);
    }
});
app.delete("/deletePlaylist", async (req, res) => {
    try {
        // console.log(req.body)
        await deletePlaylist(req.body.email, req.body.playlist);
        res.send({ "msg": "success" });
    }
    catch (e) {
        // console.log("In add user details",e)
        res.sendStatus(500);
    }
});
// app.get('/playlist',/*authenticateToken,*/async(req:Request,res:Response)=>{
//     const data =await getPlaylist(res);
//     res=data;
//     console.log(res)
//     // const resp = await authUsersFromDB(req.body.email,req.body.password)
//     // res.send({'res':resp})
// })
app.post("/login", async (req, res) => {
    try {
        // console.log(req.body)
        //console.log("inisde")
        const resp = jwtToken(req.body.email);
        const resp1 = await authUsersFromDB(req.body.email, req.body.password);
        //console.log(resp1)
        res.json(resp);
    }
    catch (e) {
        console.log("In add user details", e);
        res.sendStatus(500);
    }
});
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const refreshTK = req.headers['refresh-token'];
    let token = authHeader && (authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1]);
    //console.log("Token",token)
    if (token === null)
        return res.sendStatus(401);
    if (token && process.env.ACCESS_TOKEN) {
        const accessTK = process.env.ACCESS_TOKEN;
        jwt.verify(token, accessTK, (err, username) => {
            if (err) {
                //console.log(err.name)
                if (err.name === 'TokenExpiredError') {
                    console.log("tk", refreshTK);
                    token = genTkFromRefreshTk(refreshTK);
                    console.log("newtk", token);
                }
            }
            req.user = typeof username === 'object' ? username.name : '';
            next();
        });
    }
    return token;
}
app.listen(3005, () => {
    console.log("server listening 3005");
});
export default app;
