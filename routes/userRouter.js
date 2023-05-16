import {Router} from "express"

import {userController} from "../controllers/index.js"

const router = new Router()

router.post("/registration", userController.registration)
router.post("/login", userController.login)
router.get("/check", userController.checkUser)
router.patch("/updatePhoto", userController.updatePhoto)
router.patch("/updateBack", userController.updateBackground)
router.patch("/updateProfile", userController.updateInfo)

export default router