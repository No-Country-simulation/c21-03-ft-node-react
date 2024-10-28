import Link from "next/link"
import Image from "next/image"

interface ServiceLink {
  label: string
  href: string
  icon: string
}

const ServicesLinks: ServiceLink[] = [
  { label: "Beneficios", href: "/benefits", icon: "/images/icons/Gift.svg" },
  { label: "Vacaciones", href: "/vacations", icon: "/images/icons/Beach.svg" },
  { label: "Recargar celular", href: "/recharge-mobile", icon: "/images/icons/Mobile.svg" },
  { label: "Transporte", href: "/transport", icon: "/images/icons/Transport.svg" },
  { label: "Delivery", href: "/delivery", icon: "/images/icons/Food.svg" },
  { label: "Viajes", href: "/trips", icon: "/images/icons/Airplane.svg" },
]
const ServicesNavigation = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10">
      {ServicesLinks.map(({ label, href, icon }, index) => (
        <Link
          href={href}
          key={index}
          className="mx-auto flex size-[104px] flex-col items-center justify-center gap-2 rounded-[20px] bg-[#F3EDF7] text-center shadow-1.5xl"
        >
          <Image
            src={icon}
            className="mx-auto size-[24px] object-center"
            alt={`Icon of ${label}`}
            width={24}
            height={24}
          />
          <span className="text-sm text-[#4F4B4B]">{label}</span>
        </Link>
      ))}
    </div>
  )
}

export default ServicesNavigation
