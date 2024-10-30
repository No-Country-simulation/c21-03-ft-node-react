// "use client"

// import { useUserDataStore } from "@/store/userDataStore"
// import { useState } from "react"

// interface UserFound {
//   user: {
//     name: string
//     surname: string
//   }
//   cvu: string
// }

// export default function TransferTo() {
//   const [cvuAlias, setCvuAlias] = useState("")
//   const { findUser, userData, transferMoney } = useUserDataStore()
//   const [userFound, setUserFound] = useState<UserFound | null>(null)
//   const [amount, setAmount] = useState<number | undefined>(undefined)

//   const handleLookForUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault()
//     const user = await findUser(cvuAlias)
//     setUserFound(user!)
//   }

//   const handleSendMoney = async (
//     e: React.FormEvent<HTMLFormElement>,
//     cvu: string,
//     amount: number,
//   ) => {
//     e.preventDefault()

//     if (!amount || isNaN(amount) || amount <= 0) {
//       console.error("Monto inválido para la transferencia")
//       console.log(amount)
//       return
//     }

//     transferMoney(cvu, amount)
//   }

//   return (
//     <>
//       <form>
//         <label htmlFor="cvuOrAlias">CVU o Alias</label>
//         <input type="text" id="cvuOrAlias" onChange={e => setCvuAlias(e.target.value)} />
//         <button onClick={handleLookForUser}>Buscar</button>
//       </form>
//       {userFound && (
//         <>
//           <div>
//             <h5>
//               {userFound.user?.name} {userFound.user?.surname}
//             </h5>
//             <p>CVU: {userFound?.cvu}</p>
//           </div>
//           <form onSubmit={e => handleSendMoney(e, userFound.cvu, amount!)}>
//             <h3>¿Cuánto querés transferir?</h3>
//             <input
//               type="number"
//               defaultValue={0}
//               onChange={e => setAmount(Number(e.target.value))}
//             />
//             <p>Saldo disponible: ${userData?.card.balance}</p>
//             <input type="submit" />
//           </form>
//         </>
//       )}
//     </>
//   )
// }
