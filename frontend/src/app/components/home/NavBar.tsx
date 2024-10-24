import Link from "next/link"
import MenuHamburgerButton from "@/components/home/MenuHamburgerButton"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  name: string
}

interface NavLink {
  label: string
  href: string
}

const NavLinks: NavLink[] = [
  { label: "Mi perfil", href: "/profile" },
  { label: "Seguridad", href: "/security" },
  { label: "Configuración", href: "/configuration" },
]

const NavBar = ({ name }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleToggleMenu = () => {
    setIsMenuOpen(prevState => !prevState)
  }

  const handleLogOut = async () => {
    try {
      const response = await fetch("https://c21-03-ft-node-react-backend.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Error logging out")
      }

      router.push("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <nav className="flex h-24 items-center justify-between px-[24px]">
      <h1
        className={`z-20 text-[30px] font-light text-[#4F4B4B] transition-all duration-300 ${isMenuOpen ? "relative top-20" : ""} `}
      >
        ¡Hola {name}!
      </h1>

      <MenuHamburgerButton toggleMenu={handleToggleMenu} />

      {isMenuOpen && (
        <ul className="fixed inset-0 z-10 flex flex-col items-end justify-center gap-10 overflow-hidden bg-white pr-6">
          {NavLinks.map(({ label, href }, index) => (
            <li key={index}>
              <Link href={href} className="text-2xl font-light text-black">
                {label}
              </Link>
            </li>
          ))}
          <li>
            <button className="text-2xl font-light text-black" onClick={handleLogOut}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default NavBar
