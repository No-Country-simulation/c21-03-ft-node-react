"use client"
import Title from "@/components/ui/Title"
import Link from "next/link"

const Transfers = () => {
  return (
    <>
      <Title title="Transferir" />
      <div className="mb-40 flex flex-col items-center gap-10 text-center">
        <Link
          className="flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
          href="/operations/transfers/transfer-to"
        >
          Nueva cuenta
        </Link>
      </div>
    </>
  )
}

export default Transfers
