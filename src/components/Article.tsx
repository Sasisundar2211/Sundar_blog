'use client';

import { useEffect, useRef, useState } from 'react';
import type { Heading } from '@/lib/format';
import { copyText } from '@/lib/copy';

export function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-accent transition-[width] duration-150"
      style={{ width: `${pct}%` }}
    />
  );
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((e): e is HTMLElement => Boolean(e));
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-72px 0px -70% 0px', threshold: 0 },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-labelledby="toc-heading" className="sticky top-24">
      <h2 id="toc-heading" className="text-[.7rem] font-semibold uppercase tracking-[.14em] text-faint">
        Contents
      </h2>
      <ul className="mt-3 space-y-1.5 border-l border-rule">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.depth === 3 ? '1.5rem' : '.75rem' }}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? 'location' : undefined}
              className={`block border-l-2 -ml-[calc(.75rem+1px)] pl-3 text-[.8rem] leading-snug transition-colors ${
                active === h.id
                  ? 'border-accent text-ink'
                  : 'border-transparent text-muted hover:text-ink'
              }`}
              style={h.depth === 3 ? { marginLeft: 'calc(-1.5rem - 1px)', paddingLeft: '1.5rem' } : undefined}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function CopyCodeButtons() {
  useEffect(() => {
    const pres = document.querySelectorAll<HTMLPreElement>('.prose-editorial pre');
    const timers: ReturnType<typeof setTimeout>[] = [];
    pres.forEach((pre) => {
      pre.style.position = 'relative';
      pre.classList.add('group');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');
      btn.setAttribute('aria-live', 'polite');
      btn.className =
        'absolute right-2 top-2 min-h-11 min-w-11 rounded border border-rule bg-paper/95 px-2 py-1 text-[.7rem] text-muted opacity-100 transition-opacity hover:text-ink sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100';
      btn.addEventListener('click', async () => {
        btn.disabled = true;
        btn.textContent = 'Copying';
        const copied = await copyText(pre.innerText.replace(/^Copy(?:ing|ied| failed)?\n/, ''));
        btn.textContent = copied ? 'Copied' : 'Copy failed';
        btn.disabled = false;
        timers.push(setTimeout(() => (btn.textContent = 'Copy'), 1600));
      });
      pre.appendChild(btn);
    });
    return () => {
      timers.forEach(clearTimeout);
      pres.forEach((pre) => {
        pre.querySelector<HTMLButtonElement>('button[aria-label="Copy code to clipboard"]')?.remove();
        pre.classList.remove('group');
      });
    };
  }, []);
  return null;
}

export function ShareRow({ title, url }: { title: string; url: string }) {
  const [copyState, setCopyState] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const copyLink = async () => {
    setCopyState('copying');
    setCopyState((await copyText(url)) ? 'copied' : 'failed');
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState('idle'), 1600);
  };

  const copyLabel = {
    idle: 'Copy link',
    copying: 'Copying',
    copied: 'Link copied',
    failed: 'Copy failed',
  }[copyState];

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <span className="text-faint">Share</span>
      <a
        href={`https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        className="text-muted underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-accent"
      >
        X
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
        className="text-muted underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-accent"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={copyLink}
        disabled={copyState === 'copying'}
        aria-live="polite"
        className="text-muted underline decoration-rule underline-offset-4 hover:text-ink hover:decoration-accent"
      >
        {copyLabel}
      </button>
    </div>
  );
}
