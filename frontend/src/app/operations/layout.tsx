"use client"
import HeaderActions from "@/components/HeaderActions"
import { useUserDataStore } from "@/store/userDataStore"
import BalanceCard from "@/components/BalanceCard"
import FooterNavBar from "@/components/FooterNavBar"

export default function OperationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userData } = useUserDataStore()

  return (
    <>
      <HeaderActions />
      <BalanceCard availableBalance={userData.card?.balance} />
      {children}
      <FooterNavBar />
    </>
  )
}
