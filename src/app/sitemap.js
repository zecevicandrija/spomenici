export default function sitemap() {
    const baseUrl = 'https://spomenicinovogsada.com';

    // Serbian routes (default locale, no prefix)
    const srRoutes = [
        '',
        '/svetozar-miletic',
        '/jovan-jovanovic-zmaj',
        '/jasa-tomic',
        '/kej-zrtava-racije',
        '/porodica'
    ];

    // English routes (with /en prefix)
    const enRoutes = [
        '',
        '/svetozar-miletic',
        '/jovan-jovanovic-zmaj',
        '/jasa-tomic',
        '/quay-of-the-raid-victims', // English pathname
        '/family' // English pathname
    ];

    const sitemapEntries = [];

    // Add Serbian routes without locale prefix (default)
    srRoutes.forEach(route => {
        sitemapEntries.push({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: route === '' ? 1 : 0.8,
        });
    });

    // Add English routes with /en prefix
    enRoutes.forEach(route => {
        sitemapEntries.push({
            url: `${baseUrl}/en${route}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: route === '' ? 0.8 : 0.7, // Lower priority for English
        });
    });

    return sitemapEntries;
}
