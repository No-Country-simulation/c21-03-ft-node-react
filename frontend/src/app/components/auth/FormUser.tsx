"use client"
import { useState, ChangeEvent, FormEvent } from "react"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import InputLabel from "./InputLabel"

type FormUserProps = {
  formType: "sign-up" | "sign-in"
}

const FormUser = ({ formType }: FormUserProps) => {
  const router = useRouter()
  const { signUp, signIn, loading, error } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formType === "sign-up" && formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.")
      return
    }

    const response =
      formType === "sign-up"
        ? await signUp({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          })
        : await signIn({
            email: formData.email,
            password: formData.password,
          })

    if (response.success) {
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col items-center justify-center">
        <fieldset>
          <legend className="mb-8 text-center font-open-sans text-4xl font-light text-[#4F4B4B]">
            {formType === "sign-in" ? "Bienvenido" : "Ingresa tus datos"}
          </legend>

          {formType === "sign-in" && (
            <div>
              <InputLabel
                type="email"
                variant="sign-in"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@example.com"
                aria-label="Correo"
              />
              <InputLabel
                type="password"
                variant="sign-in"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="12345678"
                aria-label="Contraseña"
              />
            </div>
          )}

          {formType === "sign-up" && (
            <div className="mb-8 flex flex-col justify-center gap-4 font-encode-sans">
              <InputLabel
                text="Nombre:"
                type="text"
                variant="sign-up"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <InputLabel
                text="E-mail:"
                type="email"
                variant="sign-up"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
              />

              <InputLabel
                text="Clave:"
                type="password"
                variant="sign-up"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
              />
              <InputLabel
                text="Confirmar Clave:"
                type="password"
                variant="sign-up"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="relative mx-auto mb-4 flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
          >
            {loading ? "Cargando..." : formType === "sign-up" ? "Crear Cuenta" : "Iniciar Sesión"}
          </button>

          {error && <p className="text-red-500">{error}</p>}

          {formType === "sign-in" && (
            <div className="flex flex-col items-end gap-1.5">
              <Link
                href="/create-account"
                className="font-roboto text-xs font-normal text-[#4F4B4B]"
              >
                Crear cuenta
              </Link>
              <Link href="/" className="font-roboto text-xs font-normal text-[#4F4B4B]">
                Olvidaste tu contraseña
              </Link>
            </div>
          )}
        </fieldset>
      </form>

      {formType === "sign-in" && (
        <div className="mt-auto flex w-full items-center justify-between px-16 py-6">
          <Link href="/create-account" className="font-roboto text-xs font-normal text-[#6630AC]">
            EMPRESA
          </Link>
          <Link href="/" className="font-roboto text-xs font-normal text-[#6630AC]">
            ADMINISTRADOR
          </Link>
        </div>
      )}
    </div>
  )
}

export default FormUser
