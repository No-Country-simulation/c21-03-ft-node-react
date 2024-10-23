import { Router } from "express"
import { transactionController } from "../controllers/transaction.controller"

const transactionRouter = Router()

transactionRouter.post("/create", transactionController.post)
transactionRouter.put("/addMoney", transactionController.addMoney)

export default transactionRouter
