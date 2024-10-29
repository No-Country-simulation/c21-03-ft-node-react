import Link from "next/link"
import Image from "next/image"

interface BalanceCardProps {
  availableBalance: number
}

const BalanceCard = ({ availableBalance }: BalanceCardProps) => {
  return (
    <Link
      href="/operations"
      className="relative mx-auto mb-8 flex h-[168px] w-[328px] flex-col rounded-[25px] bg-[#F3EDF7] pl-2 pt-6 shadow-md"
    >
      <Image
        src="/images/icons/Lines.svg"
        className="absolute right-0 top-0"
        alt="Lines for background"
        width={113}
        height={73}
      />
      <h2 className="mb-3 text-lg text-[#4F4B4B]">CAJA AHORRO</h2>
      <p className="mb-6 text-sm font-bold text-[#9747FF]">Saldo disponible</p>
      <span className="mr-6 flex justify-end text-4xl font-light text-black">
        ${availableBalance?.toLocaleString() || 0}
      </span>
    </Link>
  )
}

export default BalanceCard
