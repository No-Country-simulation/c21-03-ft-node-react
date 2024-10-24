import { Request, Response } from "express"
import User from "../models/user.model"
import Card from "../models/card.model"
import jwt from "jsonwebtoken"
import { getExpiryDate, generateCVV, generateCardNumber } from "../utils/card.utils"
import { ObjectId } from "mongoose"

class AuthController {
  async signUp(req: Request, res: Response): Promise<void> {
    try {
      const { user, email, password } = req.body
  
      if (!user?.name || !email || !password) {
        res.status(400).json({ error: "All fields are required" })
        return
      }
  
      const newUser = new User({
        user: { name: user.name },
        email,
        password,
      })
  
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
        token 
      })
    } catch (error) {
      console.error("Error in user registration: ", error)
      res.status(500).json({
        message: "Registration failed",
        error: error instanceof Error ? error.message : "Unknown error"
      })
    }
  }

  async signIn(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body
  
      // Imprime los datos recibidos para debug
      console.log("Login attempt:", { email, password })
  
      const user = await User.findOne({ email })
      
      // Imprime el usuario encontrado para debug
      console.log("User found:", user)
  
      if (!user) {
        res.status(400).json({ message: "Email or password invalid" })
        return
      }
  
      // Solución temporal: compara directamente las contraseñas
      // const isMatch = await user.validatePassword(password)
      const isMatch = password === user.password || await user.validatePassword(password)
  
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
        token
      })
    } catch (error) {
      console.error("Error logging in user: ", error)
      res.status(500).json({ message: "Sign in failed", error: (error as Error).message })
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
      return
    }
  }

  async getData(req: Request, res: Response): Promise<void> {
    try {
      let token = req.cookies.token
      const authHeader = req.headers.authorization

      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.slice(7)
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
          ...user.toObject(),
          _id: userId,
        })
      } catch (jwtError) {
        console.error("JWT Error:", jwtError)
        res.status(401).json({ message: "Invalid token" })
        return
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
