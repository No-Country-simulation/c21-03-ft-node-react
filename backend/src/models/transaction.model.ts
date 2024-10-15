import mongoose, { Schema, Document } from "mongoose";

export interface TransactionDocument extends Document {
  senderCardId: string
  receiverCardId: string
  amount: number
  description: string
  status: string
  createdAt: Date
  updatedAt: Date
}

const transactionSchema = new Schema({
  senderCardId: { type: String, required: true },
  receiverCardId: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const Transaction = mongoose.model<TransactionDocument>("Transaction", transactionSchema)

export default Transaction