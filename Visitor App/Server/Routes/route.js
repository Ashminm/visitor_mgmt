const express=require('express')

const userController=require('../Controller/userController')
const jwtMiddileware = require('../Middileware/jwt')
const multerConfig=require("../Middileware/multerConfigration")

const router=new express.Router()

router.post('/register', multerConfig.single('image'), userController.register);
router.post('/login',userController.Login)




module.exports=router