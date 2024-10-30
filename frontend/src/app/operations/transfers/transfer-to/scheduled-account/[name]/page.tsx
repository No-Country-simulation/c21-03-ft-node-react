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
  const routeParams = useParams()

  useEffect(() => {
    const fetchBankAccount = async () => {
      try {
        const response = await fetch(`https://c21-03-ft-node-react-backend.onrender.com/api/transfer/get-transfer/${name}`)
        const data = await response.json()

        if (response.ok) {
          console.log("Monto recibido: ", data.account.amount)
          setBankAccount(data.account)
        }

      } catch (err) {
        console.error("Error fetching bank account: ", err)
      }
    }

    fetchBankAccount()
  }, [name])

  return (
    <div className="mb-20 flex flex-col items-center justify-center">
      <Title title="REVISA LOS DATOS" />
      {bankAccount && (
        <div className="mb-12 font-encode-sans text-[#4F4B4B] flex flex-col gap-2 text-center items-center justify-center">
          <h4 className="text-lg">Nombre: {bankAccount.name}</h4>
          <p>Banco: {bankAccount.bankName}</p>
          <p>CBU: {bankAccount.CBU}</p>
          <p>Monto: {bankAccount.amount.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
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
