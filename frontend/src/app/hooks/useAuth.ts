import { useState } from "react"
import { useRouter } from "next/navigation"

interface AuthResponse {
  success: boolean
  data?: {
    message?: string
    token?: string
  }
  error?: string
}

export default function useAuth() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const authenticate = async (
    url: string,
    data: object,
    redirectPath: string,
  ): Promise<AuthResponse> => {
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

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message || "Error en la autenticación")
      }

      if (response.ok && json.token) {
        localStorage.setItem("authToken", json.token)
        router.push(redirectPath)
      }

      setLoading(false)
      return { success: true, data: json }
    } catch (error) {
      setLoading(false)
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const signUp = async (data: { name: string; email: string; password: string }) =>
    authenticate("https://c21-03-ft-node-react-backend.onrender.com/api/auth/sign-up", data, "/")
  const signIn = async (data: { email: string; password: string }) =>
    authenticate("https://c21-03-ft-node-react-backend.onrender.com/api/auth/sign-in", data, "/")

  return { signUp, signIn, loading, error }
}
