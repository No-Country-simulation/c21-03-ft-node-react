import Link from "next/link"
import Image from "next/image"

export interface User {
  name: string
  bankName: string
  CBU: string
  amount: number
  _id: string
  createdAt?: Date
  updatedAt?: Date
}

interface ModalProps {
  user: User
}

const Modal = ({ user }: ModalProps) => {
  return (
    <Link
      className="relative mx-auto mb-40 flex h-[120px] w-[271px] flex-col rounded-[25px] bg-[#F3EDF7] pl-4 pt-4 font-encode-sans shadow-md"
      href={`/operations/transfers/transfer-to/scheduled-account/${encodeURIComponent(user.name)}`}
      key={user._id}
    >
      <Image
        src="/images/icons/Lines.svg"
        className="absolute right-0 top-0"
        alt="Lines for background"
        width={113}
        height={73}
      />
      <div className="flex flex-col gap-[6px]">
        <h2>{user.name}</h2>
        <p className="text-pale-blue text-[14px]">{user.bankName}</p>
        <span className="text-[14px]">{user.CBU}</span>
        <span className="text-[14px]">{user.amount.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>
    </Link>
  )
}

export default Modal
