import { create } from "zustand"

interface UserState {
  userData: userData
  getUserData: () => Promise<void>
}

interface userData {
  user: User
  email: string
  phone: string
  birthdate: string
  balance: number
}

interface User {
  name: string
  surname: string
  username: string
}

export const useUserDataStore = create<UserState>(set => ({
  userData: {
    user: { name: "", surname: "", username: "" },
    email: "",
    phone: "",
    birthdate: "",
    balance: 0,
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
      console.log(data)
    } catch (error) {
      console.error((error as Error).message || "An error occurred")
    }
  },
}))
