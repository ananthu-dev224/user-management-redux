const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userdb = require('../model/userSchema');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')


require('dotenv').config()
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const awsAccess = process.env.AWS_ACCESS_KEY
const awsSecret = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: awsAccess,
        secretAccessKey: awsSecret,
    },
    region: bucketRegion,

})


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userdb.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ info: 'User not available, Please signup' })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
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
        res.status(200).json({ newUser, userToken })

    } catch (error) {
        console.log("An error occured at signup", error.message);
        res.status(500).json({ info: 'An error occured' })
    }
}

const fetchUser = async (req, res) => {
    try {
        const user = req.user
        if(user.profileImage){
            const getImageParams = {
                Bucket: bucketName,
                Key: user.profileImage,
            }
            const command = new GetObjectCommand(getImageParams)
            const url = await getSignedUrl(s3, command, { expiresIn: 100000 })
            res.status(200).json({ user, url })
        }else{
            res.status(200).json({ user })
        }
        
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
            const uniqueFilename = uuidv4() + path.extname(req.file.originalname);
            const params = {
                Bucket: bucketName,
                Key: uniqueFilename,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            }
            const command = new PutObjectCommand(params)
            await s3.send(command)
            profileImage = uniqueFilename;
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
        let url;
        if (profileImage) {
            update.profileImage = profileImage;
            const getImageParams = {
                Bucket: bucketName,
                Key: profileImage,
            }
            const command = new GetObjectCommand(getImageParams)
            url = await getSignedUrl(s3, command, { expiresIn: 100000 })
        }

        const updatedUser = await userdb.findByIdAndUpdate(userId, update, { new: true });
        res.status(200).json({ userData: updatedUser , url});
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