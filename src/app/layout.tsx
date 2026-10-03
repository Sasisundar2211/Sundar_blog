import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { site } from '@/lib/site';
import './globals.css';

const sans = Geist({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const mono = Geist_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: '/', types: { 'application/rss+xml': '/rss.xml' } },
  openGraph: {
    type: 'website', locale: 'en_GB', url: site.url,
    siteName: site.name, title: site.title, description: site.description,
  },
  twitter: { card: 'summary_large_image', title: site.title, description: site.description },
  robots: { index: true, follow: true },
};

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.url,
  email: site.email,
  sameAs: [site.github, site.linkedin, site.x],
  alternateName: site.fullName,
  jobTitle: 'Software Engineer, AI Systems',
  description: site.description,
  knowsAbout: [
    'AI engineering', 'Model evaluation', 'AI verification', 'Backend engineering',
    'Developer tools', 'MLOps', 'Python', 'FastAPI', 'Next.js', 'Payments integration',
  ],
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Potti Sreeramulu Engineering College' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
