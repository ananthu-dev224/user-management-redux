const router = require('express').Router()
const upload = require('../helpers/storage')
const {userTokenVerify,adminTokenVerify} = require('../middleware/auth')
const {login,signup,editProfile,fetchUser} = require('../controller/userController')
const {adminAddUser,adminDeleteUser,adminEditUser,adminLogin,adminUsers} = require('../controller/adminController')

router.get('/profile',userTokenVerify,fetchUser)
router.post('/login',login)
router.post('/signup',signup)
router.put('/edit-profile',userTokenVerify,upload.single('image'),editProfile)

router.post('/admin',adminLogin)
router.post('/add-user',adminTokenVerify,upload.single('image'),adminAddUser) 
router.get('/dashboard',adminTokenVerify,adminUsers)
// router.put('/dashboard/edit-user/:id',adminEditUser)
router.delete('/dashboard/remove-user/:id',adminTokenVerify,adminDeleteUser)



module.exports = router;