import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    metadataBase: new URL('http://localhost:3000'), // Updated to localhost as requested
    title: {
      template: '%s | Novi Sad Spomenici',
      default: 'Novi Sad Spomenici',
    },
    description: 'Dobrodošli na digitalni prikaz najvažnijih spomenika Novog Sada. Istražite istoriju Svetozara Miletića, Jovana Jovanovića Zmaja i drugih velikana.',
    openGraph: {
      type: 'website',
      locale: locale,
      url: `https://novisadspomenici.com/${locale}`,
      siteName: 'Novi Sad Spomenici',
      images: [
        {
          url: '/Assets/slika1.jpg',
          width: 1200,
          height: 630,
          alt: 'Novi Sad Spomenici',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Novi Sad Spomenici',
      description: 'Istražite istoriju i spomenike Novog Sada.',
    },
    alternates: {
      canonical: './',
      languages: {
        'sr': '/sr',
        'en': '/en',
      },
    },
  };
}


export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* JSON-LD for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Novi Sad Spomenici",
              "url": "https://novisadspomenici.com",
              "logo": "https://novisadspomenici.com/Assets/logocentra.jpeg",
              "sameAs": [
                "https://www.instagram.com/omladinskicentarsrbije"
              ]
            })
          }}
        />
      </head>
      <body className={`${montserrat.variable} ${cormorant.variable}`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
