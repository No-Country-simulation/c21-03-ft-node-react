import Image from "next/image"
import { useState } from "react"

interface MenuHamburgerButtonProps {
  toggleMenu: () => void
}

const MenuHamburgerButton = ({ toggleMenu }: MenuHamburgerButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const handleToggleMenu = () => {
    setIsOpen(prevState => !prevState)
    toggleMenu()
  }

  return (
    <button onClick={handleToggleMenu} className="z-50 transition-transform duration-300">
      {isOpen ? (
        <Image
          src="/images/icons/MenuHamburger.svg"
          alt="Icon of menu hamburger"
          width={24}
          height={24}
          className="transition-opacity duration-300"
        />
      ) : (
        <Image
          src="/images/icons/Close.svg"
          alt="Icon of close"
          width={24}
          height={24}
          className="transition-opacity duration-300"
        />
      )}
    </button>
  )
}

export default MenuHamburgerButton
