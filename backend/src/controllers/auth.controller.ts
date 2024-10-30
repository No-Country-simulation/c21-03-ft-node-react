import { Request, Response } from "express"
import User from "../models/user.model"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongoose"

class AuthController {
  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
        res.status(400).json({ error: "All fields are required" })
        return
      }

      const existingUser = await User.findOne({ email })
      if (existingUser) {
        res.status(400).json({ error: "Email already exists" })
        return
      }

      const newUser = new User({ name, email, password })
      newUser.password = await newUser.encryptPassword(password)

      const savedUser = await newUser.save()

      const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      })

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      })

      res.status(201).json({
        message: "Your account has been created!",
        token,
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
        },
      })
    } catch (error) {
      console.error("Error in user registration: ", error)
      res.status(500).json({
        message: "Registration failed",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        res.status(400).json({ message: "Both email and password are required" })
        return
      }

      console.log("Login attempt:", { email, password })

      const user = await User.findOne({ email })

      console.log("User found: ", user)

      if (!user) {
        res.status(400).json({ message: "password invalid" })
        return
      }

      const isMatch = await user.validatePassword(password)

      console.log("Password match:", isMatch)

      if (!isMatch) {
        res.status(400).json({ message: "Email or password invalid" })
        return
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      })

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      })

      res.status(200).json({
        message: "Logged in successfully!",
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
        },
      })
    } catch (error) {
      console.error("Error logging in user: ", error)
      res.status(500).json({ message: "Sign in failed", error: (error as Error).message })
    }
  }

  async logOut(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })

      res.status(200).json({ message: "Logged out successfully" })
      return
    } catch (error) {
      console.error("Error logging out user: ", error)
      res.status(500).json({ message: "Logout failed", error: (error as Error).message })
      return
    }
  }

  async getData(req: Request, res: Response): Promise<void> {
    try {
      const token =
        req.cookies.token ||
        (req.headers.authorization?.startsWith("Bearer ")
          ? req.headers.authorization.slice(7)
          : null)

      if (!token) {
        res.status(401).json({ message: "Access denied. No token provided" })
        return
      }

      console.log("Token recibido: ", token)

      if (!token) {
        res.status(401).json({ message: "Access denied. No token provided" })
        return
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { _id: string }
        console.log("Decoded token: ", decoded)

        const user = await User.findById(decoded._id).select("-password")

        if (!user) {
          res.status(404).json({ message: "User not found" })
          return
        }

        const userId = (user._id as ObjectId).toString()

        res.status(200).json({
          _id: userId,
          name: user.name,
          email: user.email,
        })
      } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
          console.error("JWT Error:", error)
          res.status(401).json({ message: "Invalid token" })
          return
        }
      }
    } catch (error) {
      console.error("Error en getData: ", error)
      res.status(500).json({
        message: "Server error",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }
}

export const authController = new AuthController()
