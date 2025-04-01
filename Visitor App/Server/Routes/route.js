const express=require('express')

const userController=require('../Controller/userController')
const visitorController= require('../Controller/visitorController')
const categoryController=require('../Controller/categoryController')

const jwtMiddileware = require('../Middileware/jwt')
const multerConfig=require("../Middileware/multerConfigration")

const router=new express.Router()

router.post('/register', multerConfig.single('image'), userController.register);
router.post('/login',userController.Login)

// router.post('/add-visitor',jwtMiddileware,multerConfig.single('image'), visitorController.addVisitor);
router.get('/all-visitor',jwtMiddileware,visitorController.allVisitors)
// router.get('/all-users',jwtMiddileware,userController.allUsersforCategory)
router.get('/get-user',jwtMiddileware,userController.getUserProfile)

router.post('/add-category',jwtMiddileware,categoryController.addNewCategory)
router.get('/all-category',jwtMiddileware,categoryController.allcategory)
router.post('/add-attender',jwtMiddileware,multerConfig.single('image'), userController.register);

router.put('/update-profile',jwtMiddileware,multerConfig.single('image'),userController.profileUpdate)

router.delete('/delete-visitor/:id',jwtMiddileware,visitorController.deleteVisitor)
// router.get('/get-all-visitor',jwtMiddileware,visitorController.visitorList)

router.post('/new-update-visitor',jwtMiddileware,multerConfig.single('image'),visitorController.addUpdateVisitor)

module.exports=router