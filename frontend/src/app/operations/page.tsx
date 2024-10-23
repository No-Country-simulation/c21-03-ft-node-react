"use client"
import { useUserDataStore } from "@/store/userDataStore"
import BalanceCard from "@/components/BalanceCard"
import Image from "next/image"
import Link from "next/link"

const Operations = () => {
  const { userData } = useUserDataStore()

  return (
    <>
      <header className="mb-16 flex h-16 items-center justify-between bg-[#F3EDF7] px-6">
        <Link href="/">
          <Image
            src="/images/icons/AngleBracket.svg"
            alt="Icon of less than"
            width={7.4}
            height={12}
          />
        </Link>

        <Link href="/profile">
          <Image
            src="/images/icons/AvatarExample.svg"
            alt="Example of avatar"
            width={20}
            height={20}
          />
        </Link>
      </header>
      <BalanceCard availableBalance={userData.card?.balance} />
      <h3 className="mx-auto mb-8 text-center text-[28px] font-light text-[#4F4B4B]">
        Operaciones
      </h3>
      <div className="mb-20 flex flex-col items-center gap-10 text-center">
        <Link
          className="flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
          href="/movements"
        >
          Movimientos
        </Link>
        <Link
          className="flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
          href="/transfers"
        >
          Transferencias
        </Link>
        <Link
          className="flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
          href="/payments"
        >
          Pagos
        </Link>
      </div>
    </>
  )
}

export default Operations
