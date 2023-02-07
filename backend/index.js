import express from 'express'
import jwt from 'jsonwebtoken'
const app = express();
const port = 9999
app.use(express.json())
app.get("/", (req, res)=>{
    res.send("Hello World")
})
app.post("/auth/login", (req,res)=>{
    console.log(req.body)
    const token = jwt.sign({
        email:req.body.email,
        password:req.body.password
    }, "secret123")
    res.json({
        success:true,
        token
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

