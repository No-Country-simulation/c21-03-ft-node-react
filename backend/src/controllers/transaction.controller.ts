import { Request, Response } from "express"
import Transaction from "../models/transaction.model"
import User from "../models/user.model"
import Card from "../models/card.model"

class TransactionController {
  async post(req: Request, res: Response): Promise<void> {
    try {
      const { senderCard, receiverCard, amount, description } = req.body

      if (!senderCard || !receiverCard || amount === undefined || !description) {
        res.status(400).json({ error: "All fields are required" })
        return
      }

      const senderId = senderCard.userId
      const receiverId = receiverCard.userId

      if (!senderId) {
        res.status(404).json({ error: "Sender not found" })
        return
      }

      if (!receiverId) {
        res.status(404).json({ error: "Receiver not found" })
        return
      }

      // Sender card balance needs funds to proccess the transaction
      if (senderCard.balance < amount) {
        res.status(422).json({ error: "Insufficient funds" })
        return
      }

      // Receiver card balance can't exceed the card limit after transaction
      if (receiverCard.balance + amount >= receiverCard.limit) {
        res.status(422).json({ error: "Transaction exceeds card limit" })
        return
      }

      try {
        // Updating Users and Cards balances and timestamps
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

        // If transaction is successful store it with "successful" status
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
        // Even when transaction fails this will be stored with the "unsuccessful" status
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
}

export const transactionController = new TransactionController()
