import mongoose, { Schema, Document } from "mongoose"

export interface CardDocument extends Document {
  userId: string
  cardOwner: string
  cardNumber: string
  cardExpiry: string
  cardType: string
  cardName: string
  cvv: number
  status: string
  limit: number
  balance: number
  currency: string
  createdAt: Date
  updatedAt: Date
}

const cardSchema = new Schema<CardDocument>({
  userId: { type: String, required: true },
  cardOwner: { type: String, required: true },
  cardNumber: { type: String, required: true },
  cardExpiry: { type: String, required: true },
  cardType: { type: String, required: true },
  cardName: { type: String, required: true },
  cvv: { type: Number, required: true },
  status: { type: String, required: true },
  limit: { type: Number, required: true },
  balance: { type: Number, required: true },
  currency: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Card = mongoose.model<CardDocument>("Card", cardSchema)

export default Card
