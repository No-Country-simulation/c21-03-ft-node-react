import "./sidebarStyles.css"

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Opciones</h2>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <a>
              <span className="link-text">Inicio</span>
            </a>
          </li>
          <li>
            <a>
              <span className="link-text">Transferencias</span>
            </a>
          </li>
          <li>
            <a>
              <span className="link-text">Notificaciones</span>
            </a>
          </li>
          <li>
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
