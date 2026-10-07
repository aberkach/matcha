export default function GoogleButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#e6e1ea] bg-white py-3.5 text-[15px] font-semibold text-[#1d1626] transition hover:bg-[#faf9fb]"
    >
      <svg viewBox="0 0 24 24" className="size-5">
        <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.86c2.26-2.09 3.58-5.17 3.58-8.81Z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.86-3c-1.07.72-2.45 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.97H1.26v3.1A12 12 0 0 0 12 24Z" />
        <path fill="#FBBC05" d="M5.25 14.27A7.2 7.2 0 0 1 4.87 12c0-.79.14-1.56.38-2.27v-3.1H1.26a12 12 0 0 0 0 10.74l3.99-3.1Z" />
        <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.43-3.43A11.98 11.98 0 0 0 12 0a12 12 0 0 0-10.74 6.63l3.99 3.1C6.2 6.9 8.86 4.77 12 4.77Z" />
      </svg>
      Google
    </button>
  )
}