import express,{NextFunction, Request,RequestHandler,Response} from 'express'
import dotenv from 'dotenv'
import jwt,{Secret} from 'jsonwebtoken'
import { IUserAuthInfoReq } from './IUserAuthInfoReq';
import authUsersFromDB from './authUserFromDB';
dotenv.config()
const app = express();
app.use(express.json())

app.get('/playlist',authenticateToken,async(req:Request,res:Response)=>{
    const resp = await authUsersFromDB(req.body.email,req.body.password)
    res.send({'res':resp})
})


function authenticateToken(req:Request,res:Response, next:NextFunction){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader?.split(" ")[1]
    
    if(token === null) return res.sendStatus(401)
    if(token && process.env.ACCESS_TOKEN){
        const accessTK = process.env.ACCESS_TOKEN
        jwt.verify(token,accessTK, (err,username)=>{
            if(err) return res.sendStatus(403);
            (req as IUserAuthInfoReq).user = typeof username === 'object' ? username.name : ''
            next()
        })
    }
    
}
app.listen(3000,()=>{
    console.log("listening 3000")
})