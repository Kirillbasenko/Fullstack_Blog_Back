import Router from "express"

import checkAuth from "../middleware/checkAuth.js"

import {commentController} from "../controllers/index.js"

const router = new Router()

router.get("/", commentController.getAll)
router.post("/", checkAuth, commentController.create)
router.delete("/", checkAuth, commentController.remove)
router.patch("/", checkAuth, commentController.updateLike)
router.get("/check", commentController.checkOne)
router.patch("/update", commentController.updateComment)

export default router