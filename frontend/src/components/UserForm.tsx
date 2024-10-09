"use client"

import "./userFormStyles.css"
import Link from "next/link"

interface UserFormProps {
  title: string
  buttonText: string
  typeForm: string
  linkText: string
  linkHref: string
}

export default function UserForm({
  title,
  buttonText,
  typeForm,
  linkText,
  linkHref,
}: UserFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const target = e.currentTarget as HTMLFormElement
    const email: string = target.email.value
    const password: string = target.password.value

    if (typeForm === "login") {
      // Login
      const user: object = { email, password }
      signIn(user)
    }

    if (typeForm === "createAccount") {
      // Create account
      const name: string = target.uName.value
      const surname: string = target.surname.value
      const username: string = target.username.value
      const birthDate: string = target.birthDate.value
      const phone: string = target.phone.value

      const user: object = { username, name, surname }

      const userData: object = { user, email, password, birthDate, phone, balance: 0 }
      signUp(userData)
    }
  }

  const signUp = async (data: object) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Error creating the account")
      }

      const json = await response.json()
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  const signIn = async (data: object) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Error iniciando sesión")
      }

      const json = await response.json()
      console.log(json)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">{title}</h2>
        <div>
          <input type="email" id="email" placeholder="Email" className="input-form" />
          {typeForm === "createAccount" && (
            <>
              <div className="form-full-name">
                <input type="text" id="uName" placeholder="Nombre" className="input-form-name" />
                <input
                  type="text"
                  id="surname"
                  placeholder="Apellido"
                  className="input-form-name"
                />
              </div>
              <input
                type="text"
                id="username"
                placeholder="Nombre de usuario"
                className="input-form"
              />
              <input type="date" id="birthDate" className="input-form" />
              <input
                type="tel"
                id="phone"
                placeholder="Número de teléfono"
                className="input-form"
              />
            </>
          )}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Contraseña"
            className="input-form"
          />
        </div>
        <button type="submit" className="form-button">
          {buttonText}
        </button>
        <Link href={linkHref} className="link-form">
          {linkText}
        </Link>
      </form>
    </div>
  )
}
