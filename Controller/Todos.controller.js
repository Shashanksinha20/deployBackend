const express = require('express')
const authenticate  = require('../Middleware/authentication')
const router = express.Router()

const Todo = require('../Models/Todos.model.js')

router.post("", authenticate, async (req, res) => {
    try{
        const todo = await Todo.create(req.body)
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(400).send({message : err.message})

    }
})

router.get("", authenticate, async (req, res) => {
    console.log("GET TODO...")
    const todo = await Todo.find()
    return res.send(todo)

})

router.patch("/:id", authenticate, async (req, res) => {
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body)
        return res.status(200).send(todo)

    }
    catch(err){
        return res.status(400).send({message : err.message})

    }

})


router.delete("/:id", authenticate, async (req, res) => {
    try{
        const todo = await Todo.findByIdRemove(req.params.id)
        return res.status(200).send(todo)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
})

module.exports = router;