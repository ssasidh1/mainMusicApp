import express from 'express'

const app = express();

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
app.get('/posts',(req,res)=>{
    res.json(posts)
})


app.listen(3000,()=>{
    console.log("listening")
})