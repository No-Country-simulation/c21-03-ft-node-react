import { Router } from "express"
import { transactionController } from "../controllers/transaction.controller"

const transactionRouter = Router()

transactionRouter.post("/create", transactionController.post)
transactionRouter.put("/addMoney", transactionController.addMoney)
transactionRouter.post("/find-user", transactionController.findUser)
transactionRouter.post("/transfer", transactionController.transferMoney)

export default transactionRouter
