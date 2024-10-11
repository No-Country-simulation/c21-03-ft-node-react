import { Router } from "express"
import { authController } from "../controllers/auth.controller"

const authRouter = Router()

authRouter.post("/sign-up", authController.signUp)
authRouter.post("/sign-in", authController.signIn)
authRouter.post("/logout", authController.logOut)
authRouter.get("/getdata", authController.getData)

export default authRouter
