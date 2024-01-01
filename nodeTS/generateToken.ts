import express,{NextFunction, Request,RequestHandler,Response} from 'express'
import dotenv from 'dotenv'
import jwt,{Secret} from 'jsonwebtoken'
import cors from 'cors'
import { IUserAuthInfoReq } from './IUserAuthInfoReq';
dotenv.config()
const app = express();
app.use(express.json())
let refreshTokens:string[] = []

export function genTkFromRefreshTk(refreshToken:string):string|null|undefined{
    // if(!refreshTokens.includes(refreshToken)) return null; // must add the list to db
    if(process.env.REFRESH_TOKEN && process.env.ACCESS_TOKEN){
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN, (err,user:any)=>{
            console.log("refresh eror",err)
            if(err) return null
            const accessTK = generateAccessToken({name:user.name},process.env.ACCESS_TOKEN)
            console.log("####",accessTK)
            return accessTK
        })
        return null
    }
}

app.post('/token',(req,res)=>{
    const refreshToken = req.body.token
    if(refreshToken === null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    if(process.env.REFRESH_TOKEN && process.env.ACCESS_TOKEN){
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN, (err:any,user:any)=>{
            if(err) return res.sendStatus(403)
            const accessTK = generateAccessToken({name:user.name},process.env.ACCESS_TOKEN)
            res.json({'accessToken':accessTK})
        })
    }
})

app.delete('/logout',(req,res)=>{
    refreshTokens = refreshTokens.filter(tk=>tk !== req.body.token)
    res.sendStatus(204)
})
//must using login route
export function jwtToken(username:string){
    const user = {name :username}
    if(username && process.env.ACCESS_TOKEN && process.env.REFRESH_TOKEN){
        const accessTOKEN = process.env.ACCESS_TOKEN; 
        const token= generateAccessToken(user,accessTOKEN)
        const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN ,{expiresIn:'2d'})
        return {token,refreshToken};
    }
    
}
app.post('/login',(req,res)=>{
    const username = req.body?.username
    const user = {name :username}
    if(username && process.env.ACCESS_TOKEN && process.env.REFRESH_TOKEN){
        const accessTOKEN = process.env.ACCESS_TOKEN; 
        const token= generateAccessToken(user,accessTOKEN)
        const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN ,{expiresIn:'2d'})
        res.json({accessTK : token, refreshTK : refreshToken})
    }
    else {
        res.send("error in env token ")
    }
    
})
function generateAccessToken(user:{name:string},token:any){
    if(process.env.ACCESS_TOKEN)
    return jwt.sign(user,token,{expiresIn:'35s'})
}
app.listen(4000,()=>{
    console.log("listening 4000")
})