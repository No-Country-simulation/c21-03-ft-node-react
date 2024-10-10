"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const [isLogged, setIsLogged] = useState<boolean>(false)

  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))

    if (!token) {
      setIsLogged(false)
      router.push("/login")
    }
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
      <h1>MAIN</h1> <button onClick={logOut}>Cerrar sesión</button>
    </>
  )
}
