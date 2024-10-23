import NavBar from "@/components/home/NavBar"

interface Props {
  name: string
}

const Header = ({ name }: Props) => {
  return (
    <header>
      <NavBar name={name} />
    </header>
  )
}

export default Header
