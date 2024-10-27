import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  encryptPassword(password: string): Promise<string>
  validatePassword(password: string): Promise<boolean>
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [3, "Introducir al menos 3 caracteres."],
    },
    email: {
      type: String,
      required: [true, "El email es requerido"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Formato de email inválido"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es requerida"],
      minlength: [6, "Introducir al menos 6 caracteres."],
      maxlength: [64, "No introducir más de 64 caracteres."],
    },
  },
  {
    timestamps: true,
  },
)

userSchema.methods.encryptPassword = async function (password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password)
}

const User = mongoose.model<UserDocument>("User", userSchema)

export default User
