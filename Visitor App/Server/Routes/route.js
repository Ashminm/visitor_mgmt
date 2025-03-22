const express=require('express')

const userController=require('../Controller/userController')
const visitorController= require('../Controller/visitorController')

const jwtMiddileware = require('../Middileware/jwt')
const multerConfig=require("../Middileware/multerConfigration")

const router=new express.Router()

router.post('/register', multerConfig.single('image'), userController.register);
router.post('/login',userController.Login)

router.post('/add-visitor',jwtMiddileware,multerConfig.single('image'), visitorController.addVisitor);
router.get('/all-users',userController.allUsersforCategory)



module.exports=router