import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import TextField from '../components/auth/TextField'
import GoogleButton from '../components/auth/GoogleButton'

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters.'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      // TODO: call your login API here
      console.log('sign in', form)
    }
  }

  return (
    <AuthLayout>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-coral-500">
        Welcome to matcha
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#17111f]">
        Good to see you again.
      </h1>
      <p className="mt-3 text-[15px] text-[#8d8698]">Enter your details to continue matching.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <TextField
          label="Email address"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          error={errors.email}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => set('password', e.target.value)}
          error={errors.password}
        />

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral-600 to-coral-400 py-4 text-[15px] font-semibold text-white shadow-lg shadow-coral-500/30 transition hover:brightness-105"
        >
          Log in <ArrowRight className="size-4" />
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-[#e8e4ec]" />
        <span className="text-xs text-[#9b94a6]">or continue with</span>
        <span className="h-px flex-1 bg-[#e8e4ec]" />
      </div>

      <GoogleButton />

      <p className="mt-8 text-center text-sm text-[#8d8698]">
        New to Matcha?{' '}
        <Link to="/signup" className="font-semibold text-coral-500 hover:underline">
          Create account
        </Link>
      </p>
    </AuthLayout>
  )
}
