import { Router } from "express"
import { transactionController } from "../controllers/transaction.controller"

const transactionRouter = Router()

transactionRouter.post("/create", transactionController.post)

export default transactionRouter
