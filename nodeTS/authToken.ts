import express,{NextFunction, Request,RequestHandler,Response} from 'express'
import dotenv from 'dotenv'
import jwt,{Secret} from 'jsonwebtoken'
import { IUserAuthInfoReq } from './IUserAuthInfoReq';
dotenv.config()
const app = express();
app.use(express.json())
const posts =[
    {
        username: 'srinidhi',
        title: 'post1'
    },
    {
        username: 'ak',
        title: 'post2'
    }
]
app.get('/posts',authenticateToken,(req:Request,res:Response)=>{
    res.json(posts.filter(post=>post.username === (req as IUserAuthInfoReq).user))
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