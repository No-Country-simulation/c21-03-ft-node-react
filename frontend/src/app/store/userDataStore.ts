import { create } from "zustand"

interface UserState {
  userData: userData
  getUserData: () => Promise<void>
  getUserCardData: () => Promise<void>
}

interface userData {
  _id: string
  user: User
  email: string
  phone: string
  birthdate: string
  card: Card
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
}))
