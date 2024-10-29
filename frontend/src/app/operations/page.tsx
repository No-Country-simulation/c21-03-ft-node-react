"use client"
import Link from "next/link"

const Operations = () => {
  return (
    <>
      <h3 className="mx-auto mb-8 text-center text-[28px] font-light text-[#4F4B4B]">
        Operaciones
      </h3>
      <div className="mb-40 flex flex-col items-center gap-10 text-center">
        <Link
          className="flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
          href="/operations/transfers"
        >
          Transferencias
        </Link>
        <Link
          className="flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
          href="/operations/add-money"
        >
          Ingresar dinero
        </Link>
        <Link
          className="flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
          href="/operations/movements"
        >
          Movimientos
        </Link>
        <Link
          className="flex h-[60px] w-[240px] items-center justify-center rounded-[80px] bg-[#6630AC] text-center text-base font-bold text-white"
          href="/operations/payments"
        >
          Pagos
        </Link>
      </div>
    </>
  )
}

export default Operations
