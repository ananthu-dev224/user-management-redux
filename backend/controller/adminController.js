const userdb = require('../model/userSchema')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const credentials = {
    email: 'admin@gmail.com',
    password: 'admin123'
}


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== credentials.email || password !== credentials.password) {
            return res.status(400).json({ info: 'Invalid Credentials' })
        }

        const adminToken = jwt.sign({ email: credentials.email }, process.env.JWT_SECRET, { expiresIn: '24hr' })
        res.status(200).json({ adminToken })
    } catch (error) {
        console.log("An error occured at admin login", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}

const adminUsers = async (req, res) => {
    try {
        const users = await userdb.find()
        res.status(200).json({ users })
    } catch (error) {
        console.log("An error occured at admin dashboard users", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}


const adminEditUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await userdb.findById(userId)

        if (!user) {
            return res.status(400).json({ info: 'User not available' })
        }

        const { userData } = req.body;
        const newEmail = userData.email;
        const existingEmail = await userdb.findOne({ email: newEmail })
        if (existingEmail && existingEmail._id.toString() !== userId) {
            return res.status(400).json({ info: 'Email already exists' })
        }

        await userdb.findByIdAndUpdate(userId, userData)
        res.status(200).json({ info: 'User Edited Successfully' })

    } catch (error) {
        console.log("An error occured at admin edit users", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}


const adminDeleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        await userdb.findByIdAndDelete(userId);
        res.status(200).json({ userId})
    } catch (error) {
        console.log("An error occured while deleting a user", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}

const adminAddUser = async (req, res) => {
    try {
        const {name,email,phone,password} = req.body;
        const  profileImage = req.file.filename;
        
        const existingEmail = await userdb.findOne({email:email})
        if(existingEmail){
            return res.status(400).json({info:'Email already exists'})
        }
        const saltrounds = 10
        const hashedPassword = await bcrypt.hash(password,saltrounds);

        const newUser = new userdb({
            username:name,
            email:email,
            phone:phone,
            password:hashedPassword,
            profileImage:profileImage,

        })
        await newUser.save()
        res.status(200).json({info:'User created successfully!',newUser})

    } catch (error) {
        console.log("An error occured while adding a user by admin", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}

module.exports = {
    adminLogin,
    adminUsers,
    adminEditUser,
    adminDeleteUser,
    adminAddUser
}