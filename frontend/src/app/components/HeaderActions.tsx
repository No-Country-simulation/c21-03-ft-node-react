import Link from "next/link"
import Image from "next/image"

const HeaderActions = () => {
  return (
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
  )
}

export default HeaderActions
