"use client"
import { useState, ChangeEvent, FormEvent } from "react"
import useAuth from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import "./FormUser.css"
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
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    phone: "",
    balance: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Formulario enviado: ", formData)

    if (formType === "sign-up") {
      const registrationData = {
        user: {
          username: formData.username,
          name: formData.name,
          surname: formData.surname,
        },
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phone: formData.phone,
        birthdate: formData.birthdate,
        balance: parseFloat(formData.balance),
      }

      const response = await signUp(registrationData)
      if (response.success) {
        console.log("Registro exitoso: ", response.data)
        router.push("/")
      } else {
        console.error("Error en registro: ", response.error)
      }
    }

    if (formType === "sign-in") {
      const loginData = {
        email: formData.email,
        password: formData.password,
      }

      const response = await signIn(loginData)
      if (response.success) {
        console.log("Inicio de sesión exitoso: ", response.data)
        router.push("/")
      } else {
        console.error("Error en inicio de sesión: ", response.error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">
      {formType === "sign-up" && (
        <>
          <InputLabel
            text="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <InputLabel
            text="Apellido"
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />
          <InputLabel
            text="Nombre de usuario"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <InputLabel
            text="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputLabel
            text="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <InputLabel
            text="Confirmar contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <InputLabel
            text="Fecha de Nacimiento"
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
          <InputLabel
            text="Teléfono"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <InputLabel
            text="Balance"
            type="tel"
            name="balance"
            value={formData.balance}
            onChange={handleChange}
          />
        </>
      )}

      {formType === "sign-in" && (
        <>
          <p className="font-open-sans text-4xl font-light text-[#4F4B4B]">Bienvenido</p>
          <input type="text" maxLength={1} className="" />
          <InputLabel
            text="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputLabel
            text="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </>
      )}

      <button type="submit" disabled={loading} className="form-button">
        {loading ? "Cargando..." : formType === "sign-up" ? "Registrarse" : "Iniciar Sesión"}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {formType === "sign-in" && (
        <div>
          <Link href="/create-account" className="font-roboto text-xs font-normal text-[#4F4B4B]">
            Crear cuenta
          </Link>
          <Link href="/" className="font-roboto text-xs font-normal text-[#4F4B4B]">
            Olvidaste tu contraseña
          </Link>
        </div>
      )}
    </form>
  )
}

export default FormUser
