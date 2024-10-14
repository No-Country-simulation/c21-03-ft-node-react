"use client"
import { useState, ChangeEvent, FormEvent } from "react"
import useAuth from "../../hooks/useAuth"
import { useRouter } from "next/navigation"
import "./FormUser.css"
import Link from "next/link"

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
          <div>
            <label className="form-title">Nombre:</label>
            <input
              className="input-form text-black"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-title">Apellido:</label>
            <input
              className="input-form text-black"
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="form-title">Nombre de usuario</label>
            <input
              className="input-form text-black"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-title">Email:</label>
            <input
              className="input-form text-black"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-title">Contraseña:</label>
            <input
              className="input-form text-black"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-title">Confirmar contraseña</label>
            <input
              className="input-form text-black"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-title">Fecha de Nacimiento:</label>
            <input
              className="input-form text-black"
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-title">Teléfono:</label>
            <input
              className="input-form text-black"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-title">Balance</label>
            <input
              className="input-form text-black"
              type="tel"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
      {formType === "sign-in" && (
        <>
          <div>
            <label className="form-title">Email:</label>
            <input
              className="input-form text-black"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="form-title">Contraseña:</label>
            <input
              className="input-form text-black"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        </>
      )}
      <button type="submit" disabled={loading} className="form-button">
        {loading ? "Cargando..." : formType === "sign-up" ? "Registrarse" : "Iniciar Sesión"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {formType === "sign-in" ? (
        <Link href="/create-account" className="link-form">
          ¿No tienes cuenta? Crea una aquí
        </Link>
      ) : (
        <Link href="/login" className="link-form">
          ¿Ya tienes cuenta? Inicia sesión aquí
        </Link>
      )}
    </form>
  )
}

export default FormUser
