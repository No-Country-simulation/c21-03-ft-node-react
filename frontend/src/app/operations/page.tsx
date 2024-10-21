"use client"

import { useUserDataStore } from "../store/userDataStore"

export default function Operations() {
  const { userData } = useUserDataStore()
  return (
    <>
      <div className="px-12 py-16">
        <div className="mx-auto mb-8 w-full max-w-72 flex-col items-center justify-between rounded-3xl bg-gray-200 p-4">
          <h2 className="text-lg text-gray-600">CAJA AHORRO</h2>
          <h6 className="mb-4 text-sm font-semibold text-violet-600">Saldo disponible</h6>
          <p className="ml-40 text-3xl text-gray-900">${userData.card.balance}</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="mb-2 text-2xl text-gray-600">Operaciones</p>
          <button className="w-3/5 rounded-3xl bg-blue-500 bg-violet-700 px-4 py-3 text-white">
            Movimientos
          </button>
          <button className="w-3/5 rounded-3xl bg-blue-500 bg-violet-700 px-4 py-3 text-white">
            Transferencias
          </button>
          <button className="w-3/5 rounded-3xl bg-blue-500 bg-violet-700 px-4 py-3 text-white">
            Pagos
          </button>
        </div>
      </div>
    </>
  )
}
