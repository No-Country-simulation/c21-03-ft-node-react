import { useState } from "react"

interface AuthResponse {
  success: boolean
  data?: object
  error?: string
}

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const authenticate = async (url: string, data: object): Promise<AuthResponse> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Error en la autenticación")
      }

      const json = await response.json()
      setLoading(false)
      return { success: true, data: json }
    } catch (error) {
      setLoading(false)
      setError(error instanceof Error ? error.message : "Error desconocido")
      return { success: false, error: error instanceof Error ? error.message : "Error desconocido" }
    }
  }

  const signUp = (data: object) => authenticate("http://localhost:4444/api/auth/sign-up", data)
  const signIn = (data: object) => authenticate("http://localhost:4444/api/auth/sign-in", data)

  return { signUp, signIn, loading, error }
}
