"use client"

import { useUserDataStore } from "@/store/userDataStore"
import { useState } from "react"

export default function AddMoney() {
  const [moneyToAdd, setMoneyToAdd] = useState(0)
  const { getUserCardData } = useUserDataStore()
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cardholderName: "",
    cvc: "",
  })

  interface CreditCard {
    cardNumber: string
    expiryDate: string
    cardholderName: string
    cvc: string
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addMoney(moneyToAdd, cardDetails)
  }

  const addMoney = async (balance: number, cardDetails: CreditCard) => {
    try {
      const response = await fetch("http://localhost:4444/api/transaction/addMoney", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance, cardDetails }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error adding money")
      }

      const json = await response.json()
      console.log(json)

      await getUserCardData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="money">¿Cuánto querés agregar?</label>
      <input type="number" id="money" onChange={e => setMoneyToAdd(Number(e.target.value))} />

      <label htmlFor="cardNumber">Número de tarjeta</label>
      <input
        type="text"
        id="cardNumber"
        onChange={e => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
      />

      <label htmlFor="expiryDate">Fecha de vencimiento (MM/AA)</label>
      <input
        type="text"
        id="expiryDate"
        onChange={e => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
      />

      <label htmlFor="cardholderName">Nombre del titular</label>
      <input
        type="text"
        id="cardholderName"
        onChange={e => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
      />

      <label htmlFor="cvc">CVC</label>
      <input
        type="text"
        id="cvc"
        onChange={e => setCardDetails({ ...cardDetails, cvc: e.target.value })}
      />

      <input type="submit" />
    </form>
  )
}
