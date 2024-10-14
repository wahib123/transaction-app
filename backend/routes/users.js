const express = require('express');
const router = express.Router();
const { Users, Account } = require('../db');
const { userSchema, loginSchema } = require('../validation-schema/users-schema');
const { validate, verifyAuthToken } = require('../middlewares/user-middleware');
const { generateToken } = require('../utils/utils');

router.get('/', async (req, res) => {
    try {
        const  params = req.query;
        if(params.filter){
            const users = await Users.find({firstName: {$regex: params.filter, $options: 'i'}}, ["firstName", "lastName", "_id"]);
            return res.status(200).json(users);
        }
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/signup', validate(userSchema), async (req, res) => {
    try{
        const existingUser = await Users.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(411).json({ message: 'User already exists' });
        }
        const newUser = new Users({firstName: req.body.firstName, lastName: req.body.lastName, username: req.body.username, password: req.body.password})
        const accountBalance = new Account({balance: +(1 + Math.random() * 10000).toFixed(2), userId: newUser?._id})
        await newUser.save();
        await accountBalance.save();
        const token = generateToken(newUser._id);
        res.status(201).json({message: 'User created successfully', data: {token}});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/login', validate(loginSchema), async (req, res) => {
    try{
        const user = await Users.findOne({ username: req.body.username, password: req.body.password });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const token = generateToken(user._id);
        res.status(200).json({message: 'User logged in successfully', token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.put("/user", verifyAuthToken, validate(userSchema.partial()), async (req, res) => {
    try{
        const user = await Users.findOneAndUpdate({ _id: req.userId.id }, { $set: {firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password} });
        await user.save();
        res.status(200).json({message: 'User updated successfully'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


router.delete("/user",verifyAuthToken, async (req, res) => {
    const {id} = req.query
    const user = await Users.findOneAndDelete({_id: id})
    if(user){
        return res.status(200).json({message: 'User deleted successfully'});
    } else {
        res.status(500).json({message: "Something went wrong, "+ err?.message})
    }
})

module.exports = router;
