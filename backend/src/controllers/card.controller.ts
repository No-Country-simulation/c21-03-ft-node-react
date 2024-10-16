import Card from "../models/card.model"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

class CardController {
  async addCard(req: Request, res: Response): Promise<void> {
    try {
      const {
        userId,
        cardOwner,
        cardNumber,
        cardExpiry,
        cardType,
        cardName,
        cvv,
        status,
        limit,
        balance,
        currency,
      } = req.body

      if (
        !userId ||
        !cardOwner ||
        !cardNumber ||
        !cardExpiry ||
        !cardType ||
        !cardName ||
        !cvv ||
        !status ||
        !limit ||
        !balance ||
        !currency
      ) {
        res.status(400).json({ error: "All fields are required" })
        return
      }

      const newCard = new Card({
        userId,
        cardOwner,
        cardNumber,
        cardExpiry,
        cardType,
        cardName,
        cvv,
        status,
        limit,
        balance,
        currency,
      })

      await newCard.save()

      res.status(201).json(newCard)
      return
    } catch (error) {
      console.log(error)
      return
    }
  }
  async getCardData(req: Request, res: Response): Promise<void> {
    try {
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

      if (!token) {
        res.status(401).json({ message: "Acces denied. No token provided" })
        return
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { _id: string }

      const card = await Card.findOne({ userId: decoded._id })

      if (!card) {
        res.status(404).json({ message: "Card not found" })
        return
      }

      const filteredCard = {
        balance: card.balance,
        cardName: card.cardName,
        cardType: card.cardType,
        currency: card.currency,
        limit: card.limit,
        status: card.status,
      }

      res.status(200).json(filteredCard)
      return
    } catch (error) {
      console.log(error)
      return
    }
  }
}

export const cardController = new CardController()
