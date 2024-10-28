"use client"
import { useUserDataStore } from "@/store/userDataStore"
import { useState } from "react"

export default function AddMoney() {
  const [moneyToAdd, setMoneyToAdd] = useState(0)
  const { getUserCardData } = useUserDataStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addMoney(moneyToAdd)
  }

  const addMoney = async (balance: number) => {
    try {
      const response = await fetch("https://c21-03-ft-node-react-backend.onrender.com/api/transaction/addMoney", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance }),
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
      <input type="submit" />
    </form>
  )
}
