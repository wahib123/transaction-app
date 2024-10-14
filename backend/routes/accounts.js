const express = require('express')
const { verifyAuthToken } = require('../middlewares/user-middleware')
const { Account } = require('../db')
const mongoose = require('mongoose')
const router = express.Router()

router.get("/", verifyAuthToken, async (req, res) => {
    try{
        const accounts = await Account.findOne({userId: req.userId.id})
        return res.status(200).json({
            message:"Success",
            data: {accounts}
        })
    } catch(err){
        res.status(500).json({"message": "Error occured "+ err?.message})
    }
})

router.post("/transfer", verifyAuthToken, async (req, res) => {
    console.log("req.userId", req.userId)
    const session = await mongoose.startSession()
    const {to, amount} = req.body
    const user = await Account.findOne({userId: req.userId.id})
    console.log("to", to)
    if(user?.balance < amount){
        return res.status(400).json({"message": "Insufficient funds"})
    }
    if(req.userId.id === to){
        return res.status(400).json({"message": "Can'nt do self transfer."})
    }
    session.startTransaction()
    await Account.findOneAndUpdate({userId: req.userId.id}, {$inc:{balance: -amount }}).session(session)
    await Account.findOneAndUpdate({userId: to}, {$inc:{balance: amount }}).session(session)
    await session.commitTransaction()
    session.endSession()
    res.status(200).json({message:"Transaction complete"})
})

module.exports = router
