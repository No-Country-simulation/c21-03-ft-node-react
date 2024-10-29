import Link from "next/link"
import Image from "next/image"

const Links = [
  { icon: "/images/icons/Home.svg", href: "/" },
  { icon: "/images/icons/Arrows.svg", href: "/operations/transfers" },
  { icon: "/images/icons/QR.svg", href: "/code-QR" },
  { icon: "/images/icons/Yields.svg", href: "/stats" },
  { icon: "/images/icons/Bell.svg", href: "/notifications" },
]

const FooterNavBar = () => {
  return (
    <footer className="fixed bottom-0 z-50 flex h-[80px] w-full items-center justify-center bg-[#F3EDF7]">
      <nav>
        <ul className="flex items-center gap-[60px]">
          {Links.map(({ href, icon }, index) => (
            <li key={index}>
              <Link href={href}>
                <Image
                  src={icon}
                  className="size-[30px]"
                  alt={`Icon of ${href}`}
                  width={30}
                  height={30}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default FooterNavBar
