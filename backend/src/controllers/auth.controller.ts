import { Request, Response } from "express"
import User from "../models/user.model"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

class AuthController {
  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { user, email, password, phone, birthdate, balance } = req.body

      const userExists = await User.findOne({ email })
      if (userExists) {
        res.status(400).json({ error: "Email already in use" })
      }

      const newUser = new User({
        user,
        email,
        password: await new User().encryptPassword(password),
        phone,
        birthdate,
        balance,
      })

      const savedUser = await newUser.save()
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      })

      res.status(201).json({ token })
    } catch (error) {
      console.error("Error in user registration: ", error)
      const errorMessage = (error as Error).message || "Unknown error"
      res.status(500).json({ message: "Registration failed", error: errorMessage })
    }
  }
}

export const authController = new AuthController()
