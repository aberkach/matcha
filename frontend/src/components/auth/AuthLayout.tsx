import type { ReactNode } from 'react'
import BrandPanel from './BrandPanel'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-svh bg-white font-sans">
      <BrandPanel />
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          {/* mobile-only logo */}
          <div className="mb-8 flex items-center gap-2.5 lg:hidden">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-coral-400 to-coral-600">
              <svg viewBox="0 0 24 24" fill="white" className="size-4">
                <path d="M12 2c.6 4.8 3.2 7.4 8 8-4.8.6-7.4 3.2-8 8-.6-4.8-3.2-7.4-8-8 4.8-.6 7.4-3.2 8-8Z" />
              </svg>
            </span>
            <span className="font-display text-xl font-semibold text-[#17111f]">matcha</span>
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
