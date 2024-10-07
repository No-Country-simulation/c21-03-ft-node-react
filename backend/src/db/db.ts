import mongoose from "mongoose"
import { config } from "dotenv"

config()

const DB_URI = process.env.DB_URI as string

if (!DB_URI) {
  throw new Error("MONGODB_URL is not defined in .env file")
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(DB_URI)
    console.log("Database connection successful")
  } catch (err) {
    console.error("Error connecting to database: ", err)
  }
}

export default connectDB
