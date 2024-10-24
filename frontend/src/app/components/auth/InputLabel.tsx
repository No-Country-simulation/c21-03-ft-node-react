import { ChangeEvent } from "react"

interface InputAttributeProps {
  text: string
  type: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder: string
}

const InputLabel = ({ text, type, name, value, onChange, placeholder }: InputAttributeProps) => {
  return (
    <div className="mb-8 flex items-center gap-4">
      <label className="font-encode-sans text-lg font-normal text-[#4F4B4B]">{text}:</label>
      <input
        className="customs-borders mb-4 w-full p-[10px] text-base text-black outline-none font-open-sans placeholder:font-open-sans"
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
