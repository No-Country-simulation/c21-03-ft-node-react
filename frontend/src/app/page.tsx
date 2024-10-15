"use client"
import Header from "@/app/components/mainPage/Header"
import Sidebar from "@/app/components/mainPage/Sidebar"
import YourBalance from "@/app/components/mainPage/YourBalance"
import YourActivity from "@/app/components/mainPage/YourActivity"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useUserDataStore } from "@/app/store/userDataStore"

export default function Home() {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const { getUserData, userData, getUserCardData } = useUserDataStore()

  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))

    if (!token) {
      setIsLogged(false)
      router.push("/login")
    }
  }, [])

  useEffect(() => {
    const guscar = async () => {
      await getUserData()
      getUserCardData()
    }

    guscar()
  }, [])

  // This function must be in another file that contains all the async operations to share it between components.
  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:4444/api/auth/logout", {
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
      {userData.user.name ? (
        <>
          <Header logout={logOut} />
          <Sidebar name={userData.user.name} />
          <main style={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
            <YourBalance balance={userData.balance} />
            <YourActivity />
          </main>
        </>
      ) : (
        <p>Cargando...</p>
        // Have to define a loader
      )}
    </>
  )
}
