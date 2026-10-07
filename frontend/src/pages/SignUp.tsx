import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import AuthLayout from '../components/auth/AuthLayout'
import TextField from '../components/auth/TextField'
import GoogleButton from '../components/auth/GoogleButton'

export default function SignUp() {
  const [form, setForm] = useState({ firstName: '', email: '', password: '', terms: false })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (key: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [key]: value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: Record<string, string> = {}
    if (!form.firstName.trim()) next.firstName = 'Please tell us your first name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address.'
    if (form.password.length < 8) next.password = 'Password must be at least 8 characters.'
    if (!form.terms) next.terms = 'You need to accept the terms to continue.'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      // TODO: call your sign-up API here
      console.log('sign up', form)
    }
  }

  return (
    <AuthLayout>
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-coral-500">
        Welcome to matcha
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[#17111f]">
        Create your profile.
      </h1>
      <p className="mt-3 text-[15px] text-[#8d8698]">
        A few details and you're ready to discover.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        <TextField
          label="First name"
          placeholder="How should we call you?"
          autoComplete="given-name"
          value={form.firstName}
          onChange={(e) => set('firstName', e.target.value)}
          error={errors.firstName}
        />
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
          autoComplete="new-password"
          value={form.password}
          onChange={(e) => set('password', e.target.value)}
          error={errors.password}
        />

        <div>
          <label className="flex items-start gap-3 text-sm text-[#6d6578]">
            <input
              type="checkbox"
              checked={form.terms}
              onChange={(e) => set('terms', e.target.checked)}
              className="mt-0.5 size-4 accent-coral-500"
            />
            <span>
              I agree to the <a href="#" className="underline underline-offset-2">Terms</a> and{' '}
              <a href="#" className="underline underline-offset-2">Privacy Policy</a>.
            </span>
          </label>
          {errors.terms && (
            <p className="mt-1.5 text-xs font-medium text-red-500">{errors.terms}</p>
          )}
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-coral-600 to-coral-400 py-4 text-[15px] font-semibold text-white shadow-lg shadow-coral-500/30 transition hover:brightness-105"
        >
          Create my profile <ArrowRight className="size-4" />
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-[#e8e4ec]" />
        <span className="text-xs text-[#9b94a6]">or continue with</span>
        <span className="h-px flex-1 bg-[#e8e4ec]" />
      </div>

      <GoogleButton />

      <p className="mt-8 text-center text-sm text-[#8d8698]">
        Already have an account?{' '}
        <Link to="/signin" className="font-semibold text-coral-500 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}