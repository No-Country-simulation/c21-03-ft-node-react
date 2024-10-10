import { Request, Response } from "express"
import User from "../models/user.model"
import jwt from "jsonwebtoken"

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

      res.cookie("token", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      })

      res.status(201).json("Your account has been created!")
    } catch (error) {
      console.error("Error in user registration: ", error)
      const errorMessage = (error as Error).message || "Unknown error"
      res.status(500).json({ message: "Registration failed", error: errorMessage })
    }
  }
  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        res.status(400).json({ message: "Email or password invalid" })
        return
      }

      const isMatch = await user!.validatePassword(password)

      if (!isMatch) {
        res.status(400).json({ message: "Email or password invalid" })
        return
      }

      const token = jwt.sign({ _id: user!._id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      })

      res.cookie("token", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      })

      res.status(200).json("Logged!")
      return
    } catch (error) {
      console.error("Error logging in user: ", error)
      const errorMessage = (error as Error).message || "Unknown error"
      res.status(500).json({ message: "Sign in failed", error: errorMessage })
      return
    }
  }
  async logOut(req: Request, res: Response): Promise<void> {
    try {
      res.cookie("token", "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
      })

      res.status(200).json({ message: "Logged out successfully" })
      return
    } catch (error) {
      console.error("Error logging out user: ", error)
      res.status(500).json({ message: "Logout failed", error: (error as Error).message })
    }
  }
}

export const authController = new AuthController()
