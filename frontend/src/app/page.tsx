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
  const { getUserData, userData, getUserCardData } = useUserDataStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))

    if (!token) {
      router.push("/login")
    } else setCheckingAuth(false)
  }, [])

  useEffect(() => {
    const getAllUserData = async () => {
      try {
        await Promise.all([getUserData(), getUserCardData()])
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
    getAllUserData()
  }, [])

  if (checkingAuth) {
    return null
  }

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
      {loading ? (
        // Have to define a loader
        <p>Cargando...</p>
      ) : error ? (
        <h1>Error! Por favor, intenta nuevamente.</h1>
      ) : userData && userData.card ? (
        <>
          <Header logout={logOut} />
          <Sidebar name={userData.user.name} id={userData._id} />
          <main style={{ display: "flex", flexDirection: "row", gap: "4rem" }}>
            <YourBalance balance={userData.card.balance} />
            <YourActivity />
          </main>
        </>
      ) : (
        <p>No se encontraron datos.</p>
      )}
    </>
  )
}
