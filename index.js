const express = require('express')
const connect =  require('./Config/db')

const {register, login} = require('./Controller/Auth.controller')
const TodosController = require('./Controller/Todos.controller')

const app = express()
app.use(express.json())
app.post("/signup",  register)
app.post("/login", login)
app.use("/todo", TodosController)
const port = process.env.PORT || 8500

app.get("/", (req, res) => {
    res.send("Hello from Backend!!")
})


app.listen(port, async () => {
    try{
        await connect
    }
    catch(err){
        console.log(err.message)
    }

    console.log(`Listening on the port ${port}`)
})