import { create } from "zustand"

interface UserState {
  userData: object
  getUserData: () => Promise<void>
}

export const useUserDataStore = create<UserState>(set => ({
  userData: {},
  getUserData: async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/getdata", {
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
