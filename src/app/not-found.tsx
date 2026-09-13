import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-wide px-5 sm:px-8">
      <div className="max-w-reading py-28">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-3 font-serif text-[2rem] font-semibold tracking-[-0.02em]">
          Nothing at this address.
        </h1>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
          The page may have been renamed or may never have existed.
        </p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <Link href="/" className="text-ink underline decoration-accent/50 underline-offset-4">Home</Link>
          <Link href="/writing" className="text-muted hover:text-ink">Writing</Link>
          <Link href="/projects" className="text-muted hover:text-ink">Projects</Link>
        </div>
      </div>
    </div>
  );
}
