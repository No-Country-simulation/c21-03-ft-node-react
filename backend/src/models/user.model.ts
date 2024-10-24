import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"

export interface UserDocument extends Document {
  user: {
    name: string
  }
  email: string
  password: number
  encryptPassword(password: number): Promise<number>
  validatePassword(password: number): Promise<boolean>
  createdAt: Date
  updatedAt: Date
  isModified: (path: string) => boolean
}

const userSchema = new Schema<UserDocument>({
  user: {
    name: {
      type: String,
      required: true,
      minlength: [3, "Introducir al menos 3 caracteres."],
    },
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    unique: true,
  },
  password: {
    type: Number,
    required: true,
    minlength: [6, "Introducir al menos 6 caracteres."],
    maxlength: [64, "No introducir más de 64 caracteres."],
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})

userSchema.methods.encryptPassword = async function (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model<UserDocument>("User", userSchema)

export default User
