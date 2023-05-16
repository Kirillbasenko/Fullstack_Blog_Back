import {Router} from "express"

import postRouter from "./postRouter.js"
import userRouter from "./userRouter.js"
import commentRouter from "./commentRouter.js"

const router = new Router()

router.use("/user", userRouter)
router.use("/post", postRouter)
router.use("/comment", commentRouter)

export default router