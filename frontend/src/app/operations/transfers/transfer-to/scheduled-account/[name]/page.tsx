"use client"
import Title from "@/components/ui/Title"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Link from "next/link"

interface BankAccount {
  name: string
  bankName: string
  CBU: string
  amount: number
}

const EnterAmountByName = () => {
  const { name } = useParams()
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null)
  const [amount, setAmount] = useState<string | null>(null)
  const routeParams = useParams()

  useEffect(() => {
    const fetchBankAccount = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/transfer/get-transfer/${name}`)
        const data = await response.json()

        if (response.ok) {
          setBankAccount(data.account)
        }

        const storedAmount = localStorage.getItem(`amount-${name}`)
        setAmount(storedAmount)
      } catch (err) {
        console.error("Error fetching bank account: ", err)
      }
    }

    fetchBankAccount()
  }, [name])

  return (
    <div className="mb-20 flex flex-col items-center justify-center">
      <Title title="REVISA LOS DATOS" />
      {bankAccount && amount && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-600">{bankAccount.name}</h2>
          <p className="text-gray-600">{bankAccount.bankName}</p>
          <p className="text-gray-600">{bankAccount.CBU}</p>
          <p className="text-gray-600">{amount}</p>
        </div>
      )}

      <Link
        href={`/operations/transfers/transfer-to/scheduled-account/${routeParams.name}/success`}
        className="mb-40 flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
      >
        Transferir dinero
      </Link>
    </div>
  )
}

export default EnterAmountByName
