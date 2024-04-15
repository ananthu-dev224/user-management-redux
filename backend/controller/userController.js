const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userdb = require('../model/userSchema');




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userdb.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ info: 'User not available, Please signup' })
        }
        const comparePassword = await  bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(400).json({ info: 'Incorrect Password' });
        }

        const userToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24hr' })
        res.status(200).json({ userToken, user })

    } catch (error) {
        console.log("An error occured at login", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}



const signup = async (req, res) => {
    try {
        const { username, email, phoneNumber, password } = req.body;
        const exisitingUser = await userdb.findOne({ email: email })
        if (exisitingUser) {
            return res.status(400).json({ info: 'Email already exists!' })
        }

        const saltrounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltrounds)
        const newUser = new userdb({
            username: username,
            email: email,
            phone: phoneNumber,
            password: hashedPassword
        })

        await newUser.save()
        const userToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24hr' })
        res.status(200).json({ newUser , userToken })

    } catch (error) {
        console.log("An error occured at signup", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}

const fetchUser = async (req, res) => {
    try {
        const user = req.user
        res.status(200).json({ user })
    } catch (error) {
        console.log("An error occured at fetch User", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}

const editProfile = async (req, res) => {
    try {
        const userId = req.user.id
        const { username, email, phone } = req.body;
        const exisitingUser = await userdb.findOne({ email: email })
        if (exisitingUser && exisitingUser._id.toString() !== userId) {
            return res.status(400).json({ info: 'Email already exists' })
        }
        let profileImage;
        if (req.file) {
            profileImage = req.file.filename;
        }

        const update = {};
        if (username !== 'null') {
            update.username = username;
        }
        if (email !== 'null') {
            update.email = email;
        }
        if (phone !== 'null') {
            update.phone = phone;
        }
        if (profileImage) {
            update.profileImage = profileImage;
        }

        const updatedUser = await userdb.findByIdAndUpdate(userId, update, { new: true });
        res.status(200).json({userData : updatedUser});
    } catch (error) {
        console.log("An error occured at editProfile", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}



module.exports = {
    login,
    signup,
    fetchUser,
    editProfile
}