import type { Metadata } from "next"
import "@fontsource/open-sans/300.css"
import "@fontsource/open-sans/400.css"
import "@fontsource/open-sans/500.css"
import "@fontsource/open-sans/600.css"
import "@fontsource/open-sans/700.css"
import "@fontsource/encode-sans/400.css"
import "@fontsource/encode-sans/500.css"
import "@fontsource/encode-sans/700.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "Banco virtual",
  description: "",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
