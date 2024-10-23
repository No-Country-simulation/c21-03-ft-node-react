function generateCardNumber(): string {
  const cardNumber = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join("")
  return cardNumber.match(/.{1,4}/g)?.join(" ") || cardNumber
}

function getExpiryDate(): string {
  const currentDate = new Date()
  const expiryYear = currentDate.getFullYear() + 5
  const expiryMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0")
  return `${expiryMonth}/${expiryYear.toString().slice(-2)}`
}

function generateCVV(): number {
  return Math.floor(100 + Math.random() * 900)
}

export { generateCardNumber, getExpiryDate, generateCVV }
