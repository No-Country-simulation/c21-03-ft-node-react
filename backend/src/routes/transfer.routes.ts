import { Router } from "express"
import { transferController } from "../controllers/transfer.controller"

const transferRouter = Router()

transferRouter.post("/add-money", transferController.addMoney)
transferRouter.post("/create-transfer", transferController.createTransfer)
transferRouter.get("/get-transfer/:name", transferController.getTransfer)

export default transferRouter
