import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcrypt"

interface UserDocument extends Document {
  user: {
    username: string
    first_name: string
    last_name: string
  }
  email: string
  phone: string
  password: string
  createdAt: Date
  updatedAt: Date
  isModified: (path: string) => boolean
}

const userSchema = new Schema<UserDocument>({
  user: {
    username: {
      type: String,
      required: true,
      minlength: [3, "Introducir al menos 3 caracteres"],
    },
    first_name: {
      type: String,
      required: true,
      minlength: [3, "Introducir al menos 3 caracteres."],
    },
    last_name: {
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
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Introducir al menos 6 caracteres."],
    maxlength: [16, "No introducir más de 16 caracteres."],
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
})

userSchema.pre<UserDocument>("save", function (next) {
  this.email = this.email.toLowerCase()
  next()
})

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err: any) {
    return next(err)
  }
})

const User = mongoose.model<UserDocument>("User", userSchema)

export default User