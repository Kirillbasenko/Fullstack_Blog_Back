import {Router} from "express"

import {userController} from "../controllers/index.js"

const router = new Router()

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.get("/", userController.getAllUsers)
router.patch("/updateFriends", userController.updateFriends)
router.get("/check", userController.checkUser)
router.patch("/updatePhoto", userController.updatePhoto)
router.patch("/updateBack", userController.updateBackground)
router.patch("/updateProfile", userController.updateInfo)
router.patch("/updateView", userController.updateViewUser)

export default router