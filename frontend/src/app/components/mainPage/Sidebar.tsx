import { useRouter } from "next/navigation"
import "./sidebarStyles.css"

interface SidebarProps {
  name: string
  id: string
}

export default function Sidebar({ name, id }: SidebarProps) {
  const router = useRouter()

  const goToUserPage = () => {
    router.push(`/users/${id}`)
  }

  const goToOperationsPage = () => {
    router.push("/operations")
  }

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Hola, {name}!</h2>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <a>
              <span className="link-text">Inicio</span>
            </a>
          </li>
          <li onClick={goToOperationsPage}>
            <a>
              <span className="link-text">Operaciones</span>
            </a>
          </li>
          <li>
            <a>
              <span className="link-text">Notificaciones</span>
            </a>
          </li>
          <li onClick={goToUserPage}>
            <a>
              <span className="link-text">Perfil</span>
            </a>
          </li>
          <li>
            <a>
              <span className="link-text">Administrador</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
