import express from "express"
import cors from "cors"
import { config } from "dotenv"
import connectDB from "./db/db"
import authRoutes from "./routes/auth.routes"
import cookieParser from "cookie-parser"
import transactionRoutes from "./routes/transaction.routes"
import cardRouter from "./routes/card.routes"

config()

const app = express()
const PORT = process.env.PORT ?? 8000

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [
      "http://c21-03-ft-node-react-frontend.up.railway.app",
      "https://c21-03-ft-node-react-frontend.onrender.com",
      "http://localhost:3000",
    ],
    credentials: true,
  }),
)

app.use("/api/auth", authRoutes)
app.use("/api/transaction", transactionRoutes)
app.use("/api/card", cardRouter)

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
