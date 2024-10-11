import { create } from "zustand"

interface UserState {
  userData: object
  getUserData: () => Promise<void>
}

export const useUserDataStore = create<UserState>(set => ({
  userData: {},
  getUserData: async () => {
    try {
      const response = await fetch("", {
        method: "GET",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Error retrieving user data")
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  },
}))
