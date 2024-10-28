import mongoose, { Schema, Document } from "mongoose"

export interface TransferDocument extends Document {
  name: string
  bankName: string
  CBU: string
  amount: number
  createdAt: Date
  updatedAt: Date
}

const transferSchema = new Schema<TransferDocument>(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
    },
    bankName: {
      type: String,
      required: [true, "El nombre del banco es requerido"],
      lowercase: true,
    },
    CBU: {
      type: String,
      required: [true, "El CBU es requerido para transferir"],
      minlength: [22, "El CBU debe tener al menos 22 caracteres"],
      maxlength: [22, "El CBU debe tener como máximo 22 caracteres"],
    },
    amount: {
      type: Number,
      required: [true, "El monto es requerido para transferir"],
      min: [1, "El monto debe ser positivo"],
    },
  },
  {
    timestamps: true,
  },
)

const Transfer = mongoose.model<TransferDocument>("Transfer", transferSchema)

export default Transfer
