"use client"
import BalanceCard from "@/components/BalanceCard"
import { useUserDataStore } from "@/store/userDataStore"
import Title from "@/components/ui/Title"
import Link from "next/link"
import Image from "next/image"

const Transfer = () => {
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
      <BalanceCard availableBalance={userData.card.balance} />
      <Title title="Transferir" />
      <Link
        className="mx-auto mb-[50px] flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
        href="/transfer-to"
      >
        Nueva cuenta
      </Link>
      <Link
        href="/add-money"
        className="mx-auto mb-[200px] flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
      >
        Cargar Dinero a tu cuenta
      </Link>
    </>
  )
}

export default Transfer
