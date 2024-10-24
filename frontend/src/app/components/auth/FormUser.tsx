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
  
    if (formType === "sign-up") {
      const registrationData = {
        user: {
          name: formData.name,
        },
        email: formData.email,
        password: formData.password
      }
  
      const response = await signUp(registrationData)
      if (response.success) {
        router.push("/")
      }
    }
  
    if (formType === "sign-in") {
      const loginData = {
        email: formData.email, // Agregamos el email que faltaba
        password: formData.password
      }
  
      const response = await signIn(loginData)
      if (response.success) {
        router.push("/")
      }
    }
  }
  return (
    <div className="flex min-h-screen flex-col">
      <form
        onSubmit={handleSubmit}
        className="form-container flex flex-1 flex-col items-center justify-center"
      >
        <fieldset>
          {formType === "sign-in" && (
            <div>
              <legend className="mb-12 text-center font-open-sans text-4xl font-light text-[#4F4B4B]">
                Bienvenido
              </legend>
    <InputLabel
      text="Email"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="johndoe@gmail.com"
    />
              <div className="mb-10 flex gap-6">
                <input
                  type="text"
                  className="customs-borders h-10 w-16 text-center text-2xl outline-none"
                  maxLength={1}
                  name="password"
                  //   value={formData.password}
                  onChange={handleChange}
                  placeholder="1"
                  required
                />
                <input
                  type="text"
                  className="customs-borders h-10 w-16 text-center text-2xl outline-none"
                  maxLength={1}
                  name="password"
                  //   value={formData.password}
                  onChange={handleChange}
                  placeholder="2"
                  required
                />
                <input
                  type="text"
                  className="customs-borders h-10 w-16 text-center text-2xl outline-none"
                  maxLength={1}
                  name="password"
                  //   value={formData.password}
                  onChange={handleChange}
                  placeholder="3"
                  required
                />
                <input
                  type="text"
                  className="customs-borders h-10 w-16 text-center text-2xl outline-none"
                  maxLength={1}
                  name="password"
                  //   value={formData.password}
                  onChange={handleChange}
                  placeholder="4"
                  required
                />
              </div>
            </div>
          )}

          {formType === "sign-up" && (
            <>
              <InputLabel
                text="Nombre"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              <InputLabel
                text="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
              />
              <InputLabel
                text="Clave"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="1234"
              />
              <InputLabel
                text="Confirmar Clave"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="1234"
              />
            </>
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