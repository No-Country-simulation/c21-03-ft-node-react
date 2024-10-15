import { Request, Response } from "express"
import Transaction from "../models/transaction.model"
import User from "../models/user.model"
import Card from "../models/card.model"

class TransactionController {
  async post(req: Request, res: Response): Promise<void> {
    try {
      const { cardOwner, cardNumber, cardExpiry, cvv, amount, description, receiverId } = req.body

      // Validate input fields (early return to reduce nesting)
      if (!cardOwner || !cardNumber || !cardExpiry || !cvv || amount === undefined || !description) {
        res.status(400).json({ error: "All fields are required" })
        return
      }

      // * Sender logic *
      // Find the sender card using the cardNumber (this should be unique)
      const senderCard = await Card.findOne({ cardNumber });
      if (!senderCard) {
        res.status(404).json({ error: "Sender card not found. Please check the card number and try again" });
        return;
      }

      // Validate the card details (owner, expiry, cvv). cardNumber is not neccesary in this validation
      if (senderCard.cardOwner !== cardOwner || senderCard.cardExpiry !== cardExpiry || senderCard.cvv !== cvv) {
        res.status(400).json({ message: "The card details do not match the provided information" });
        return;
      }

      // Retrieve sender user ID from the card
      const senderId = senderCard.userId
      if (!senderId) {
        res.status(404).json({ error: "Sender user not found. Please check the card details" })
        return
      }

      // Ensure sender has enough balance to complete the transaction
      if (senderCard.balance < amount) {
        res.status(422).json({ error: "Insufficient funds. Your balance is lower than the transaction amount" })
        return
      }

      // * Receiver logic *
      // Find the receiver's card using userId and cardName (which must be "BANCA_VIRTUAL"). A user can only have one card called "BANCA_VIRTUAL"
      const receiverCard = await Card.findOne({ userId: receiverId, cardName: "BANCA_VIRTUAL" });

      if (!receiverCard) {
        res.status(404).json({ error: "Receiver's BANCA_VIRTUAL card not found" });
        return;
      }

      // Ensure that the receiver's card balance does not exceed the limit after the transaction
      if (receiverCard.balance + amount > receiverCard.limit) {
        res.status(422).json({ error: "Transaction exceeds the receiver's card limit" });
        return;
      }

      // * Transaction logic *
      try {
        // Perform atomic updates to both sender and receiver cards
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

        // Create and store the successful transaction record
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
