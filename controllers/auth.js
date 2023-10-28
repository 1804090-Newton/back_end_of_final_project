import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const getAllUsers = async( req, res, next) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        next(err)
    }
}

export const getUserById = async( req, res, next) => {
    try {
        const users = await User.findById(req.params.id)
        res.json(users)
    } catch (err) {
        next(err)
    }
}

export const register = async(req, res, next) => {
    
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
    
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            phone: req.body.phone,
            country: req.body.country,
            designation: req.body.designation,
            isFaculty: req.body.isFaculty,
            isAdmin: req.body.isAdmin,
            password: hash,
            designation: req.body.designation
        })
    
        await user.save()
    
        res.json({message: 'User created, please Log in'})

    } catch (err) {
        next(err)
    }
}

export const login = async( req, res, next) => {
    try {
        const user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(401).json({message: 'Wrong credentials'})
        }

        const isMatched = bcrypt.compareSync(req.body.password, user.password)

        if(!isMatched){
            return res.status(401).json({message: 'Wrong credentials'})
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)

        res.json({token, id: user._id})

    } catch (err) {
        next(err)
    }
}