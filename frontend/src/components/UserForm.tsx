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
      // Acá irá la lógica para iniciar sesión
    }

    if (typeForm === "createAccount") {
      // Acá irá la lógica para crear cuenta
      const fullName = target.fullName.value
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2 className="form-title">{title}</h2>
        <div>
          <input type="email" id="email" placeholder="Email" className="input-form" />
          {typeForm === "createAccount" && (
            <input type="text" id="fullName" placeholder="Nombre completo" className="input-form" />
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
