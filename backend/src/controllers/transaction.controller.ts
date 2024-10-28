import { Request, Response } from "express"
import Transaction from "../models/transaction.model"
import User from "../models/user.model"
import jwt from "jsonwebtoken"
import Card from "../models/card.model"
import { isValidCVC, isValidCardNumber, isValidExpiryDate } from "../utils/card.utils"

class TransactionController {
  async post(req: Request, res: Response): Promise<void> {
    try {
      const { cardOwner, cardNumber, cardExpiry, cvv, amount, description, receiverId } = req.body

      if (
        !cardOwner ||
        !cardNumber ||
        !cardExpiry ||
        !cvv ||
        amount === undefined ||
        !description
      ) {
        res.status(400).json({ error: "All fields are required" })
        return
      }

      const senderCard = await Card.findOne({ cardNumber })
      if (!senderCard) {
        res
          .status(404)
          .json({ error: "Sender card not found. Please check the card number and try again" })
        return
      }

      if (
        senderCard.cardOwner !== cardOwner ||
        senderCard.cardExpiry !== cardExpiry ||
        senderCard.cvv !== cvv
      ) {
        res.status(400).json({ message: "The card details do not match the provided information" })
        return
      }

      const senderId = senderCard.userId
      if (!senderId) {
        res.status(404).json({ error: "Sender user not found. Please check the card details" })
        return
      }

      if (senderCard.balance < amount) {
        res
          .status(422)
          .json({ error: "Insufficient funds. Your balance is lower than the transaction amount" })
        return
      }

      const receiverCard = await Card.findOne({ userId: receiverId, cardName: "BANCA_VIRTUAL" })

      if (!receiverCard) {
        res.status(404).json({ error: "Receiver's BANCA_VIRTUAL card not found" })
        return
      }

      if (receiverCard.balance + amount > receiverCard.limit) {
        res.status(422).json({ error: "Transaction exceeds the receiver's card limit" })
        return
      }

      try {
        await Promise.all([
          Card.updateOne(
            { _id: senderCard._id },
            { $inc: { balance: -amount }, $set: { updatedAt: new Date() } },
          ),
          Card.updateOne(
            { _id: receiverCard._id },
            { $inc: { balance: amount }, $set: { updatedAt: new Date() } },
          ),
          User.updateOne(
            { _id: senderId },
            { $inc: { balance: -amount }, $set: { updatedAt: new Date() } },
          ),
          User.updateOne(
            { _id: receiverId },
            { $inc: { balance: amount }, $set: { updatedAt: new Date() } },
          ),
        ])

        const newTransaction = new Transaction({
          senderCardId: senderCard._id,
          receiverCardId: receiverCard._id,
          amount,
          description,
          status: "successful",
        })

        await newTransaction.save()
        res.status(201).json({
          message: "Transaction created successfully",
          transaction: newTransaction,
        })
      } catch (error) {
        const failedTransaction = new Transaction({
          senderCardId: senderCard._id,
          receiverCardId: receiverCard._id,
          amount,
          description,
          status: "unsuccessful",
        })

        await failedTransaction.save()
        console.error("Error processing transaction: ", error)
        res.status(500).json({ error: "Failed to process transaction" })
      }
    } catch (error) {
      console.error("Error creating transaction: ", error)
      res.status(500).json({ error: "Failed to create transaction" })
    }
  }

  async addMoney(req: Request, res: Response): Promise<void> {
    try {
      const { balance, cardDetails } = req.body

      if (
        !isValidCardNumber(cardDetails.cardNumber) ||
        !isValidExpiryDate(cardDetails.expiryDate) ||
        !isValidCVC(cardDetails.cvc)
      ) {
        res.status(400).json({ message: "Invalid card details" })
        return
      }

      const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
      if (!token) {
        res.status(401).json({ message: "Access denied. No token provided" })
        return
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { _id: string }
      const user = await User.findByIdAndUpdate(decoded._id, { $inc: { balance } }, { new: true })

      if (!user) {
        res.status(404).json({ message: "User not found" })
        return
      }

      res.status(201).json({
        message: "transaction successfully",
      })
      return
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
      return
    }
  }
  async findUser(req: Request, res: Response): Promise<void> {
    try {
      const { cvuOrAlias } = req.body

      let user

      if (cvuOrAlias.length === 22) {
        user = await User.findOne({ cvu: cvuOrAlias })
      } else {
        user = await User.findOne({ alias: cvuOrAlias })
      }

      if (!user) {
        res.status(404).json({ message: "User not found" })
        return
      }

      res.status(200).json(user)
      return
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
      return
    }
  }
  async transferMoney(req: Request, res: Response) {
    try {
      const { cvu, amount } = req.body

      const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

      if (!token) {
        res.status(401).json({ message: "Access denied. No token provided" })
        return
      }

      const receiverUser = await User.findOne({ cvu })
      if (!receiverUser) {
        res.status(404).json({ message: "Receiver user not found" })
        return
      }

      // Needs to evaluate if the one who transfers has enough money to do it.

      receiverUser.balance += amount

      await receiverUser.save()

      res.status(200).json({ message: "Transfer successful" })
      return
    } catch (error) {
      res.status(500).json({ message: "Internal server error" })
      return
    }
  }
}

export const transactionController = new TransactionController()
