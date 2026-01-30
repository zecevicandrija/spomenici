import { getTranslations } from 'next-intl/server';

export default async function manifest() {
    const locale = 'sr'; // Default locale for manifest
    const t = await getTranslations({ locale, namespace: 'Manifest' });

    return {
        name: 'Novi Sad Spomenici',
        short_name: 'NS Spomenici',
        description: 'Digitalni prikaz najvažnijih spomenika Novog Sada.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}
