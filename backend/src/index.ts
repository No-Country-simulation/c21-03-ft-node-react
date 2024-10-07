import express from "express"
import cors from "cors"
import { config } from "dotenv"
import connectDB from "@/db/db"
config()

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())
app.use(cors())

const initialize = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error("Error initializing: ", err)
  }
}

initialize()
