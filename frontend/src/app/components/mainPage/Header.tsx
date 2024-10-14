"use client"

import React from "react"
import "./headerStyles.css"

export default function Header({ logout }) {
  return (
    <header className="header">
      <h1>Banco</h1>
      <button className="logout-button" onClick={logout}>
        Cerrar Sesión
      </button>
    </header>
  )
}
