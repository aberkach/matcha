const AVATARS = [
  'https://i.pravatar.cc/80?img=47',
  'https://i.pravatar.cc/80?img=12',
  'https://i.pravatar.cc/80?img=32',
]

export default function BrandPanel() {
  return (
    <aside className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-[linear-gradient(155deg,#6d2149_0%,#4a1330_50%,#340d21_100%)] p-12 text-white lg:flex xl:p-16">
      {/* decorative glow + rings */}
      <div className="pointer-events-none absolute -right-40 top-1/3 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(224,99,118,0.35)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute -right-24 top-1/4 size-[420px] rounded-full border border-white/10" />
      <div className="pointer-events-none absolute right-10 top-1/2 size-[300px] rounded-full border border-white/10" />

      {/* logo */}
      <div className="relative flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-coral-400 to-coral-600 shadow-lg shadow-coral-600/30">
          <svg viewBox="0 0 24 24" fill="white" className="size-5">
            <path d="M12 2c.6 4.8 3.2 7.4 8 8-4.8.6-7.4 3.2-8 8-.6-4.8-3.2-7.4-8-8 4.8-.6 7.4-3.2 8-8Z" />
          </svg>
        </span>
        <span className="font-display text-2xl font-semibold tracking-tight">matcha</span>
      </div>

      {/* hero copy */}
      <div className="relative max-w-lg">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-coral-300">
          Made for real connection
        </p>
        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight xl:text-6xl">
          More curiosity.
          <br />
          Less swiping.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
          Meet people who share your pace, your interests, and your idea of a good conversation.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <div className="flex -space-x-3">
            {AVATARS.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="size-11 rounded-full border-2 border-plum-800 object-cover"
              />
            ))}
          </div>
          <div>
            <p className="font-semibold">12,000+</p>
            <p className="text-sm text-white/60">thoughtful connections this month</p>
          </div>
        </div>
      </div>

      <p className="relative text-sm text-white/50">Matcha · Safe, intentional dating.</p>
    </aside>
  )
}