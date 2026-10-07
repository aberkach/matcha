import { useState, type InputHTMLAttributes } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default function TextField({ label, error, type = 'text', ...props }: TextFieldProps) {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'

  return (
    <div>
      <label className="mb-2 block text-[13px] font-semibold text-[#4b4356]">{label}</label>
      <div className="relative">
        <input
          type={isPassword && show ? 'text' : type}
          {...props}
          className={`w-full rounded-xl border bg-white px-4 py-3.5 text-[15px] text-[#1d1626] outline-none transition placeholder:text-[#b4adbf] focus:border-coral-400 focus:ring-4 focus:ring-coral-400/15 ${
            error ? 'border-red-400' : 'border-[#e6e1ea]'
          } ${isPassword ? 'pr-11' : ''}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b4adbf] hover:text-[#6d6578]"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="size-4.5" /> : <Eye className="size-4.5" />}
          </button>
        )}
      </div>
      {/* reserved validation slot — keeps layout from shifting */}
      <p className={`mt-1.5 text-xs font-medium text-red-500 ${error ? '' : 'invisible'}`}>
        {error ?? 'placeholder'}
      </p>
    </div>
  )
}