import {Router} from "express"

import {postController} from "../controllers/index.js"
import { deviceCreateValidation } from "../validations.js"
import checkAuth from "../middleware/checkAuth.js"

const router = new Router()

router.get("/", postController.getAll)
router.get("/onlyUser", checkAuth, postController.getAllPostOnlyUser)
//router.get("/:id", postController.getOne)
router.get("/check", postController.checkOne)
router.post("/", checkAuth, postController.create)
router.delete("/", checkAuth, postController.remove)
router.patch("/update", checkAuth, postController.update)
router.patch("/", checkAuth, postController.updateLike)


export default router