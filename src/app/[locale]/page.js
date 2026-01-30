import Pocetna from '../../components/Pocetna/Pocetna';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('title'),
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
      images: ['/Assets/slika1.jpg'], // Fallback image for now
    },
  };
}

export default function Home() {
  return <Pocetna />;
}