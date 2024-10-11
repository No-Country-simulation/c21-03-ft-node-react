"use client"

import Header from "@/components/mainPage/Header"
import Sidebar from "@/components/mainPage/Sidebar"
import YourBalance from "@/components/mainPage/YourBalance"
import YourActivity from "@/components/mainPage/YourActivity"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useUserDataStore } from "@/store/userDataStore"

export default function Home() {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const { getUserData, userData } = useUserDataStore()

  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))

    if (!token) {
      setIsLogged(false)
      router.push("/login")
    }
  }, [])

  useEffect(() => {
    console.log("Obteniendo datos del usuario")
    getUserData()
  }, [])

  // This function must be in another file that contains all the async operations to share it between components.
  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Error logging out")
      }

      router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header logout={logOut} />
      <Sidebar />
      <main style={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
        <>
          <YourBalance />
          <YourActivity />
        </>
      </main>
    </>
  )
}
