"use client"
import { useState, ChangeEvent } from "react"
import { useFetchData } from "@/hooks/useFetchData"
import Title from "@/components/ui/Title"
import Image from "next/image"
import Modal from "@/components/ui/Modal"

const ScheduledAccount = () => {
  const [username, setUsername] = useState<string>("")
  const [data, loading] = useFetchData(username)
  const [showModal, setShowModal] = useState<boolean>(true)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    setShowModal(true)
  }

  return (
    <div className="flex flex-col items-center">
      <Title title="Cuenta Agendada" />
      <input
        type="text"
        className="h-16 w-[271px] bg-[#F3EDF7] pl-6 outline-none"
        value={username}
        onChange={handleInputChange}
      />
      <Image
        src="/images/icons/Search.svg"
        className="relative bottom-[40px] left-[105px]"
        alt="Magnifying glass search icon"
        width={17.5}
        height={17.5}
      />

      {data && loading && showModal && <Modal user={data} />}
    </div>
  )
}

export default ScheduledAccount
