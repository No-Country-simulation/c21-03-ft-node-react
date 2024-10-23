"use client"
import { useUserDataStore } from "@/store/userDataStore"
import { useEffect, useState } from "react"
import Header from "@/components/home/Header"
import BalanceCard from "@/components/BalanceCard"
import ServicesNavigation from "@/components/home/ServicesNavigation"
import { useRouter } from "next/navigation"
import FooterNavBar from "./components/FooterNavBar"

const Home = () => {
  const { getUserData, userData, getUserCardData } = useUserDataStore()
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true)

  useEffect(() => {
    const token = document.cookie.split("; ").find(row => row.startsWith("token="))

    if (!token) {
      router.push("/login")
    } else setCheckingAuth(false)
  }, [])

  useEffect(() => {
    const getAllUserData = async () => {
      try {
        await Promise.all([getUserData(), getUserCardData()])
      } catch (error) {
        console.log(error)
      }
    }
    getAllUserData()
  }, [])

  if (checkingAuth) return null

  return (
    <>
      <Header name={userData.user.name || "Usuario"} />

      <main>
        <BalanceCard availableBalance={userData.card?.balance} />

        <section className="mb-8 px-6">
          <h3 className="mb-8 text-center text-2xl font-light text-[#4F4B4B]">
            ¿QUÉ QUERES HACER HOY?
          </h3>

          <ServicesNavigation />
        </section>

        <div className="mb-[120px]">
          <h3 className="mb-8 ml-9 text-2xl font-light text-[#4F4B4B]">NOVEDADES</h3>
          <div className="h-[74px] w-full bg-[#9747FF]"></div>
        </div>
      </main>
      <footer>
        <FooterNavBar />
      </footer>
    </>
  )
}

export default Home
