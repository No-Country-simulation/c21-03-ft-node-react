import "./yourBalanceStyles.css"

interface YourBalanceProps {
  balance: number
}

export default function YourBalance({ balance }: YourBalanceProps) {
  return (
    <div className="balance">
      <p className="balance-title">Tu saldo</p>
      <h2 className="balance-balance">${balance}</h2>
    </div>
  )
}
