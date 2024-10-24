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

const isValidCardNumber = (number: string) => {
  return /^\d{16}$/.test(number)
}

const isValidExpiryDate = (date: string) => {
  return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(date)
}

const isValidCVC = (cvc: string) => {
  return /^\d{3}$/.test(cvc)
}

export {
  generateCardNumber,
  getExpiryDate,
  generateCVV,
  isValidCardNumber,
  isValidCVC,
  isValidExpiryDate,
}
