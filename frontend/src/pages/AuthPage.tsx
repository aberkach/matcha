import { useState, type FormEvent } from 'react'
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Fingerprint,
  Leaf,
  LockKeyhole,
  LogIn,
  Mail,
  Shield,
  UserRoundPlus,
} from 'lucide-react'
import { Link } from 'react-router-dom'

type AuthPageProps = {
  mode: 'signin' | 'signup'
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getPasswordStrength(password: string) {
  if (!password) return { score: 0, label: 'Awaiting input' }

  const score =
    Number(password.length >= 6) +
    Number(password.length >= 10) +
    Number(/[A-Z]/.test(password) && /[0-9]/.test(password)) +
    Number(/[^A-Za-z0-9]/.test(password))
  const labels = ['', 'Fragile resonance', 'Steadying aura', 'Harmonious key', 'Transcendent lock']

  return { score, label: labels[score] }
}

export default function AuthPage({ mode }: AuthPageProps) {
  const isSignUp = mode === 'signup'
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    password: '',
    rememberMe: true,
    terms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [authMessage, setAuthMessage] = useState('')
  const passwordStrength = getPasswordStrength(form.password)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors: Record<string, string> = {}

    if (isSignUp && !form.firstName.trim()) {
      nextErrors.firstName = 'Please tell us your first name.'
    }
    if (!emailPattern.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.'
    }
    if (isSignUp && !form.terms) {
      nextErrors.terms = 'You need to accept the terms to continue.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      console.log(isSignUp ? 'sign up' : 'sign in', form)
    }
  }

  const setField = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const showUnavailableMessage = (provider: string) => {
    setAuthMessage(`${provider} sign-in is not configured yet.`)
  }

  return (
    <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#fcf5fb] px-4 py-6 font-sans text-[#2e1a28] selection:bg-[#ffd6ee] selection:text-[#a02070]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-28 -top-24 size-80 rounded-full bg-[#f8d8f0]/80 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-24 size-96 rounded-full bg-[#e6e1ff]/70 blur-3xl"
      />

      <div className="relative z-10 w-full max-w-[360px]">
        <section className="rounded-[20px] border border-[#eaddec] bg-white px-6 py-6 shadow-[0_12px_24px_rgba(68,35,64,0.12)] sm:px-7">
          <header className="flex flex-col items-center text-center">
            <div className="relative mb-3 grid size-12 place-items-center rounded-2xl border border-[#ead4e8] bg-gradient-to-br from-[#ffd6ee] via-[#f8eef8] to-[#eedcff] text-[#e040a0] shadow-sm">
              <Leaf aria-hidden="true" className="size-6" strokeWidth={1.8} />
              <span className="absolute -bottom-1 -right-1 grid size-3.5 place-items-center rounded-full bg-[#e040a0] ring-2 ring-white">
                <span className="size-1.5 rounded-full bg-white" />
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-[22px] font-bold tracking-tight">Matcha</h1>
              <span className="rounded-full border border-[#e040a0]/20 bg-[#ffd6ee] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-[#c52886]">
                Sanctuary
              </span>
            </div>
            <p className="mt-1 text-[11px] text-[#604868]">
              Ground your romantic journey in calm clarity.
            </p>
          </header>

          <nav
            aria-label="Authentication"
            className="mt-4 grid grid-cols-2 rounded-full border border-[#e7d4e9] bg-[#f8eef8] p-1"
          >
            <Link
              to="/signin"
              aria-current={!isSignUp ? 'page' : undefined}
              className={`flex items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-[11px] font-bold transition-all duration-200 ${
                !isSignUp
                  ? 'bg-white text-[#e040a0] shadow-[0_2px_6px_rgba(68,35,64,0.16)]'
                  : 'text-[#604868] hover:text-[#2e1a28]'
              }`}
            >
              <LogIn aria-hidden="true" className="size-3.5" />
              Sign In
            </Link>
            <Link
              to="/signup"
              aria-current={isSignUp ? 'page' : undefined}
              className={`flex items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-[11px] font-bold transition-all duration-200 ${
                isSignUp
                  ? 'bg-white text-[#e040a0] shadow-[0_2px_6px_rgba(68,35,64,0.16)]'
                  : 'text-[#604868] hover:text-[#2e1a28]'
              }`}
            >
              <UserRoundPlus aria-hidden="true" className="size-3.5" />
              Create Membership
            </Link>
          </nav>

          <form onSubmit={handleSubmit} noValidate className="mt-3 space-y-2.5">
            {isSignUp && (
              <div>
                <label
                  htmlFor="first-name"
                  className="mb-1 block pl-1 text-[9px] font-bold uppercase tracking-wide text-[#604868]"
                >
                  Curated Identity
                </label>
                <div className="relative">
                  <UserRoundPlus
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#907898]"
                  />
                  <input
                    id="first-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="Your first name"
                    value={form.firstName}
                    onChange={(event) => setField('firstName', event.target.value)}
                    aria-invalid={Boolean(errors.firstName)}
                    aria-describedby={errors.firstName ? 'first-name-error' : undefined}
                    className={`w-full rounded-full border bg-[#fbf2fb] py-2 pl-10 pr-4 text-[11px] outline-none transition placeholder:text-[#907898]/70 focus:border-[#e040a0] focus:bg-white focus:ring-2 focus:ring-[#e040a0]/15 ${
                      errors.firstName ? 'border-red-400' : 'border-[#e7d4e9]'
                    }`}
                  />
                </div>
                {errors.firstName && (
                  <p id="first-name-error" className="mt-1 pl-1 text-[10px] text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-1 block pl-1 text-[9px] font-bold uppercase tracking-wide text-[#604868]"
              >
                Verified Email
              </label>
              <div className="relative">
                <Mail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#907898]"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="aura@mindfulsoul.io"
                  value={form.email}
                  onChange={(event) => setField('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full rounded-full border bg-[#fbf2fb] py-2 pl-10 pr-10 text-[11px] outline-none transition placeholder:text-[#907898]/70 focus:border-[#e040a0] focus:bg-white focus:ring-2 focus:ring-[#e040a0]/15 ${
                    errors.email ? 'border-red-400' : 'border-[#e7d4e9]'
                  }`}
                />
                {emailPattern.test(form.email) && (
                  <Check
                    aria-label="Valid email"
                    className="absolute right-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#e040a0]"
                  />
                )}
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 pl-1 text-[10px] text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between pl-1">
                <label
                  htmlFor="password"
                  className="text-[9px] font-bold uppercase tracking-wide text-[#604868]"
                >
                  Keyphrase / Aura Key
                </label>
                {!isSignUp && (
                  <button
                    type="button"
                    onClick={() => showUnavailableMessage('Password recovery')}
                    className="text-[9px] font-semibold text-[#e040a0] transition hover:text-[#a02070]"
                  >
                    Forgot key?
                  </button>
                )}
              </div>
              <div className="relative">
                <LockKeyhole
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 size-3.5 -translate-y-1/2 text-[#907898]"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={(event) => setField('password', event.target.value)}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={`w-full rounded-full border bg-[#fbf2fb] py-2.5 pl-10 pr-10 text-[11px] outline-none transition placeholder:text-[#907898]/70 focus:border-[#e040a0] focus:bg-white focus:ring-2 focus:ring-[#e040a0]/15 ${
                    errors.password ? 'border-red-400' : 'border-[#e7d4e9]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#907898] transition hover:text-[#604868]"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="size-3.5" />
                  ) : (
                    <Eye aria-hidden="true" className="size-3.5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 pl-1 text-[10px] text-red-600">
                  {errors.password}
                </p>
              )}

              <div className="mt-1.5 space-y-1 px-1">
                <div className="flex items-center justify-between text-[9px]">
                  <span className="text-[#604868]">Entropy Harmony</span>
                  <span className="font-bold text-[#e040a0]">{passwordStrength.label}</span>
                </div>
                <div
                  className="grid h-1 grid-cols-4 gap-1"
                  role="meter"
                  aria-label="Password strength"
                  aria-valuemin={0}
                  aria-valuemax={4}
                  aria-valuenow={passwordStrength.score}
                >
                  {[0, 1, 2, 3].map((bar) => (
                    <span
                      key={bar}
                      className={`rounded-full transition-colors ${
                        bar < passwordStrength.score ? 'bg-[#e040a0]' : 'bg-[#ece2ec]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {isSignUp ? (
              <div className="px-1 pt-0.5">
                <label className="flex items-start gap-2 text-[10px] leading-relaxed text-[#604868]">
                  <input
                    type="checkbox"
                    checked={form.terms}
                    onChange={(event) => setField('terms', event.target.checked)}
                    className="mt-0.5 size-3.5 rounded border-[#dcc8e0] accent-[#e040a0] focus:ring-[#e040a0]/30"
                  />
                  <span>
                    I agree to the <a href="#" className="underline underline-offset-2">Terms</a>
                    {' '}and <a href="#" className="underline underline-offset-2">Privacy Policy</a>.
                  </span>
                </label>
                {errors.terms && (
                  <p className="mt-1 pl-5 text-[10px] text-red-600">{errors.terms}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between px-1 pt-0.5">
                <label className="flex cursor-pointer items-center gap-2 text-[10px] text-[#604868]">
                  <input
                    type="checkbox"
                    checked={form.rememberMe}
                    onChange={(event) => setField('rememberMe', event.target.checked)}
                    className="size-3.5 rounded border-[#dcc8e0] accent-[#e040a0] focus:ring-[#e040a0]/30"
                  />
                  Keep me authenticated
                </label>
                <span className="flex items-center gap-1 text-[9px] font-semibold text-[#604868]">
                  <Shield aria-hidden="true" className="size-3 text-[#e040a0]" />
                  256-bit GCM
                </span>
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e040a0] to-[#7c52aa] px-5 py-2.5 text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(224,64,160,0.24)] transition duration-200 hover:scale-[1.01] hover:shadow-[0_6px_16px_rgba(224,64,160,0.3)] active:scale-[0.99]"
            >
              {isSignUp ? 'Begin Intentional Onboarding' : 'Enter the Sanctuary'}
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </button>
          </form>

          <div className="my-3 flex items-center gap-2 text-center">
            <span className="h-px flex-1 bg-[#e7d4e9]" />
            <span className="whitespace-nowrap text-[8px] font-bold uppercase tracking-wide text-[#604868]">
              Or connect with verified ID
            </span>
            <span className="h-px flex-1 bg-[#e7d4e9]" />
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => showUnavailableMessage('Apple')}
              className="flex items-center justify-center gap-1 rounded-full border border-[#e7d4e9] bg-[#fbf2fb] px-2 py-1.5 text-[9px] font-bold transition hover:border-[#e040a0]/40 hover:bg-[#f8eef8]"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.05-1.81.93-2.87-1 .04-2.18.67-2.88 1.48-.56.64-1.05 1.7-1 2.74 1.12.09 2.32-.59 2.95-1.35Z" />
              </svg>
              Apple
            </button>
            <button
              type="button"
              onClick={() => showUnavailableMessage('Google')}
              className="flex items-center justify-center gap-1 rounded-full border border-[#e7d4e9] bg-[#fbf2fb] px-2 py-1.5 text-[9px] font-bold transition hover:border-[#e040a0]/40 hover:bg-[#f8eef8]"
            >
              <span aria-hidden="true" className="text-[11px] font-bold text-[#4285f4]">G</span>
              Google
            </button>
            <button
              type="button"
              onClick={() => showUnavailableMessage('Passkey')}
              className="flex items-center justify-center gap-1 rounded-full border border-[#e7d4e9] bg-[#fbf2fb] px-2 py-1.5 text-[9px] font-bold transition hover:border-[#e040a0]/40 hover:bg-[#f8eef8]"
            >
              <Fingerprint aria-hidden="true" className="size-3 text-[#e040a0]" />
              Passkey
            </button>
          </div>

          {authMessage && (
            <p role="status" className="mt-2 text-center text-[10px] text-[#604868]">
              {authMessage}
            </p>
          )}

          <aside className="mt-3 flex items-start gap-2.5 rounded-xl border border-[#e7d4e9] bg-gradient-to-r from-[#f8eef8] to-[#fbf2fb] p-2.5">
            <span aria-hidden="true" className="mt-0.5 text-sm">🌸</span>
            <div className="text-[9px] leading-relaxed">
              <p className="font-bold text-[#e040a0]">Slow Dating Protocol</p>
              <p className="mt-0.5 text-[#604868]">
                Zero ghosting incentives, curated daily batches, and verified human authenticity.
                No endless roulette wheels.
              </p>
            </div>
          </aside>
        </section>

        <footer className="mt-0.5 rounded-[20px] border border-[#eaddec] bg-white px-6 py-4 text-[11px] shadow-[0_12px_24px_rgba(68,35,64,0.12)] sm:px-7">
          <p className="flex items-center gap-1.5 text-[#604868]">
            <span className="size-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
            Atmosphere: Serene &amp; Online
          </p>
          <p className="mt-1 text-[#2e1a28]">
            Manifesto <span className="mx-1">·</span> Privacy Seal <span className="mx-1">·</span>{' '}
            Concierge
          </p>
        </footer>
      </div>
    </main>
  )
}
