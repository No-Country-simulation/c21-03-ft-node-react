import { create } from "zustand"

interface UserState {
  userData: userData
  getUserData: () => Promise<void>
  getUserCardData: () => Promise<void>
}

interface userData {
  _id: string
  name: string
  email: string
  card: Card
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
    name: "",
    email: "",
    card: { balance: 0, cardName: "", cardType: "", currency: "", limit: 0, status: "" },
  },

  getUserData: async () => {
    try {
      const token = localStorage.getItem("authToken")

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch("https://c21-03-ft-node-react-backend.onrender.com/api/auth/getdata", {
        method: "GET",
        credentials: "include",
        headers,
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
      const token = localStorage.getItem("authToken")

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      }

      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      const response = await fetch(`https://c21-03-ft-node-react-backend.onrender.com/api/transfer/get-transfer/${name}`, {
        method: "GET",
        credentials: "include",
        headers,
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
