import { ChangeEvent } from "react"

interface InputAttributeProps {
  text?: string
  type: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  variant: "sign-up" | "sign-in"
}

const InputLabel = ({
  text,
  type,
  name,
  value,
  onChange,
  placeholder,
  variant,
}: InputAttributeProps) => {
  const inputClasses =
    variant === "sign-up"
      ? "border-none text-base text-black outline-none"
      : "customs-borders mb-8 w-full p-[10px] text-base text-black outline-none"

  return (
    <div className="flex items-center gap-4">
      <label className="text-lg text-[#4F4B4B]">{text}</label>
      <input
        className={inputClasses}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  )
}

export default InputLabel
