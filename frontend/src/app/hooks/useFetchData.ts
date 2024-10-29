import { useState, useEffect } from "react"

interface User {
  name: string
  bankName: string
  CBU: string
  amount: number
  _id: string
  createdAt?: Date
  updatedAt?: Date
}

export const useFetchData = (name: string) => {
  const [data, setData] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (name.trim() === "") {
      setData(null)
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)

      try {
        const response = await fetch(`http://localhost:8000/api/transfer/get-transfer/${name}`)

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await response.json()

        const userData: User = {
          name: data.account.name,
          bankName: data.account.bankName,
          CBU: data.account.CBU,
          amount: data.account.amount,
          _id: data.account._id,
          createdAt: data.account.createdAt,
          updatedAt: data.account.updatedAt,
        }

        setData(userData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [name])

  return [data, loading] as const
}
