import { cardController } from "../controllers/card.controller"
import { Router } from "express"

const cardRouter = Router()

cardRouter.post("/create", cardController.addCard)
cardRouter.get("/getCard", cardController.getCardData)

export default cardRouter
