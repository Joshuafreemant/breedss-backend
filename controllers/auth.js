import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'


//Register user

export const register = async (req, res) => {
    try {
        const { fullName, email, username, password, picturePath, friends, bio, location } = req.body;


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            username,
            password: passwordHash,
            picturePath,
            friends,
            bio,
            role:'member',
            location,
            viewProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });
        const savedUser = await newUser.save();
        res.status(201).json({ savedUser });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//register admin


export const registerAdmin = async (req, res) => {
    try {
        const { fullName, email, username, password, friends, bio, location } = req.body;


        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            email,
            username,
            password: passwordHash,
            friends,
            bio,
            role:'admin',
            location,
            viewProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000)
        });
        const savedUser = await newUser.save();
        res.status(201).json({ savedUser });

        console.log(req.body)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
//login

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ msg: 'User does not exist' })

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        //   delete the password before sending user to client
        delete user.password
        res.status(200).json({ token, user, message:'Successful Login' })

    } catch (err) { 
        res.status(500).json({ error: err.message })

    }
}