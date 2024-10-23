import { ChangeEvent } from "react"

interface InputAttributeProps {
  text: string
  type: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const InputLabel = ({ text, type, name, value, onChange }: InputAttributeProps) => {
  return (
    <div>
      <label className="mb-5 text-center text-[#333]">{text}:</label>
      <input
        className="mb-4 w-full rounded-[4px] border border-solid border-[#ccc] p-[10px] text-base text-black"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}

export default InputLabel
