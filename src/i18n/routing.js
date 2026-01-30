import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['sr', 'en'],

    // Used when no locale matches
    defaultLocale: 'sr',

    // Hide default locale prefix (sr)
    localePrefix: 'as-needed',

    pathnames: {
        '/': '/',
        '/svetozar-miletic': {
            en: '/svetozar-miletic',
            sr: '/svetozar-miletic'
        },
        '/jovan-jovanovic-zmaj': {
            en: '/jovan-jovanovic-zmaj',
            sr: '/jovan-jovanovic-zmaj'
        },
        '/jasa-tomic': {
            en: '/jasa-tomic',
            sr: '/jasa-tomic'
        },
        '/kej-zrtava-racije': {
            en: '/quay-of-the-raid-victims',
            sr: '/kej-zrtava-racije'
        },
        '/porodica': {
            en: '/family',
            sr: '/porodica'
        }
    }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
