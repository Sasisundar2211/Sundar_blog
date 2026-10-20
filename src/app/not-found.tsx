import Link from 'next/link';
import { Page, PageHead } from '@/components/Ledger';

export default function NotFound() {
  return (
    <Page>
      <PageHead
        title="Nothing at this address."
        margin={<p>Error 404</p>}
        intro={
          <>
            <p>The page may have been renamed or may never have existed.</p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 font-sans text-[1rem]">
              <Link href="/" className="action">Home</Link>
              <Link href="/writing" className="ln">Writing</Link>
              <Link href="/projects" className="ln">Projects</Link>
            </div>
          </>
        }
      />
    </Page>
  );
}
