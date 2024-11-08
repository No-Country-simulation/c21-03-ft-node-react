import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import Transfer from "../models/transfer.model"
import User from "../models/user.model"

class TransferController {
  async createTransfer(req: Request, res: Response): Promise<void> {
    try {
      const { name, bankName, CBU, amount } = req.body

      if (!name || !bankName || !CBU || amount === undefined) {
        res.status(400).json({ error: "Todos los campos son requeridos" })
        return
      }

      const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
      if (!token) {
        res.status(401).json({ message: "Acceso denegado. No se proporcionó token" })
        return
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { _id: string }

      const user = await User.findById(decoded._id)
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" })
        return
      }

      if (user.balance < amount) {
        res.status(400).json({ message: "Saldo insuficiente para realizar la transferencia" })
        return
      }

      user.balance -= amount
      await user.save()

      const newTransfer = new Transfer({
        name,
        bankName,
        CBU,
        amount,
      })

      const savedTransfer = await newTransfer.save()

      res.status(201).json({
        message: "Transferencia realizada exitosamente",
        transfer: {
          _id: savedTransfer._id,
          name: savedTransfer.name,
          bankName: savedTransfer.bankName,
          CBU: savedTransfer.CBU,
          amount: savedTransfer.amount,
          createdAt: savedTransfer.createdAt,
        },
        balance: user.balance,
      })

      return
    } catch (error) {
      console.error("Error al realizar la transferencia: ", error)
      res.status(500).json({
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido",
      })
    }
  }

  async getTransfer(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.params

      const transfer = await Transfer.findOne({
        name: { $regex: new RegExp(name, "i") },
      })

      if (!transfer) {
        res.status(404).json({ error: "Cuenta bancaria no encontrada" })
        return
      }

      res.status(200).json({
        account: {
          _id: transfer._id,
          name: transfer.name,
          bankName: transfer.bankName,
          CBU: transfer.CBU,
          amount: transfer.amount,
          createdAt: transfer.createdAt,
          updatedAt: transfer.updatedAt,
        },
      })
      return
    } catch (error) {
      console.error("Error al obtener cuenta bancaria: ", error)
      res.status(500).json({
        message: "Error al obtener la cuenta bancaria",
        error: error instanceof Error ? error.message : "Error desconocido",
      })
    }
  }

  async addMoney(req: Request, res: Response): Promise<void> {
    try {
      const { balance } = req.body

      if (balance === undefined || typeof balance !== "number" || balance <= 0) {
        res.status(400).json({ message: "Monto inválido" })
        return
      }
      const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
      if (!token) {
        res.status(401).json({ message: "Acceso denegado. No se proporcionó token" })
        return
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as { _id: string }

      const user = await User.findById(decoded._id)
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" })
        return
      }

      user.balance += balance
      await user.save()

      res.status(200).json({
        message: "Dinero agregado exitosamente",
        balance: user.balance,
      })

      return
    } catch (error) {
      console.error("Error al agregar dinero:", error)
      res.status(500).json({
        message: "Error interno del servidor",
        error: error instanceof Error ? error.message : "Error desconocido",
      })
    }
  }
}

export const transferController = new TransferController()
