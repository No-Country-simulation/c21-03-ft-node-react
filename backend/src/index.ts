import express from "express"
import cors from "cors"
import { config } from "dotenv"
config()

const PORT = 8080

const app = express()

app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
