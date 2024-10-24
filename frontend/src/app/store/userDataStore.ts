import { create } from "zustand"

interface UserState {
  userData: userData
  getUserData: () => Promise<void>
  getUserCardData: () => Promise<void>
  findUser: (cvuOrAlias: string) => Promise<void>
  transferMoney: (cvu: string, amount: number) => Promise<void>
}

interface userData {
  _id: string
  user: User
  email: string
  phone: string
  birthdate: string
  card: Card
  cvu: string
  alias: string
}

interface User {
  name: string
  surname: string
  username: string
}

interface Card {
  balance: number
  cardName: string
  cardType: string
  currency: string
  limit: number
  status: string
}

export const useUserDataStore = create<UserState>(set => ({
  userData: {
    _id: "",
    user: { name: "", surname: "", username: "" },
    email: "",
    phone: "",
    birthdate: "",
    card: { balance: 0, cardName: "", cardType: "", currency: "", limit: 0, status: "" },
    cvu: "",
    alias: "",
  },
  getUserData: async () => {
    try {
      const response = await fetch("http://localhost:4444/api/auth/getdata", {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error retrieving user data")
      }

      const data = await response.json()

      set(state => ({
        ...state,
        userData: data,
      }))
    } catch (error) {
      console.error((error as Error).message || "An error occurred")
    }
  },
  getUserCardData: async () => {
    try {
      const response = await fetch("http://localhost:4444/api/card/getCard", {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error retrieving user card data")
      }

      const data = await response.json()

      set(state => ({
        userData: {
          ...state.userData,
          card: data,
        },
      }))
    } catch (error) {
      console.log(error)
    }
  },
  findUser: async (cvuOrAlias: string) => {
    try {
      const response = await fetch("http://localhost:4444/api/transaction/find-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cvuOrAlias }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const user = await response.json()
      return user
    } catch (error) {
      console.log(error)
    }
  },
  transferMoney: async (cvu: string, amount: number) => {
    try {
      const response = await fetch("http://localhost:4444/api/transaction/transfer", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cvu, amount }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const json = await response.json()
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  },
}))
