import { Router } from "express"
import { authController } from "../controllers/auth.controller"

const authRouter = Router()

authRouter.post("/sign-up", authController.signUp)

export default authRouter
