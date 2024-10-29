"use client"
import { useUserDataStore } from "@/store/userDataStore"
import { useState } from "react"
import Title from "@/components/ui/Title"

export default function AddMoney() {
  const [moneyToAdd, setMoneyToAdd] = useState(0)
  const { getUserCardData } = useUserDataStore()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addMoney(moneyToAdd)
  }

  const addMoney = async (balance: number) => {
    try {
      const response = await fetch(
        "https://c21-03-ft-node-react-backend.onrender.com/api/transfer/add-money",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ balance }),
        },
      )

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
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <Title title="¿Cuanto dinero quieres ingresar?" />
      <input
        type="number"
        className="mb-4 h-16 w-[271px] bg-[#F3EDF7] pl-6 outline-none"
        placeholder="1000"
        id="money"
        onChange={e => setMoneyToAdd(Number(e.target.value))}
      />
      <input type="submit" />
    </form>
  )
}
