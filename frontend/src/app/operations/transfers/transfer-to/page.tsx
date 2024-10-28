"use client"
import { useState, ChangeEvent, FormEvent } from "react"
import Title from "@/components/ui/Title"
import InputLabel from "@/components/auth/InputLabel"
import { useRouter } from "next/navigation"

const TransferTo = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: "",
    bankName: "",
    CBU: "",
    amount: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:8000/api/transfer/create-transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log(result)

      if (!response.ok) throw new Error("Error al enviar los datos")

      if (response.ok) {
        console.log("Transferencia creada", result)
        router.push("/operations/transfers/transfer-to/scheduled-account/enter-amount")
      }

      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.error("Error: ", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-40 flex flex-col">
      <fieldset>
        <legend className="text-center">
          <Title title="Nueva Cuenta" />
        </legend>

        <div className="mb-8 ml-6 flex flex-col gap-2 font-encode-sans">
          <InputLabel
            text="Nombre"
            type="text"
            variant="sign-up"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <InputLabel
            text="Banco"
            type="text"
            variant="sign-up"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            placeholder="Banco Santander Rio"
          />
          <InputLabel
            text="CBU"
            type="number"
            variant="sign-up"
            name="CBU"
            value={formData.CBU}
            onChange={handleChange}
            placeholder="000000000"
          />
          <InputLabel
            text="Monto"
            type="number"
            variant="sign-up"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="000000000"
          />
        </div>

        <button
          className="mx-auto flex h-[40px] w-[83px] items-center justify-center rounded-[100px] bg-[#6630AC] text-center text-sm font-medium text-white"
          disabled={loading}
        >
          {loading ? "Creando" : "Crear"}
        </button>
      </fieldset>
    </form>
  )
}

export default TransferTo
