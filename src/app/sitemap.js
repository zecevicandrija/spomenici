export default function sitemap() {
    const baseUrl = 'https://novisadspomenici.com';
    const locales = ['sr', 'en'];

    // List of static routes (excluding locale) since dynamic generation would need a CMS or list
    const routes = [
        '',
        '/svetozar-miletic',
        '/jovan-jovanovic-zmaj',
        '/jasa-tomic',
        '/kej-zrtava-racije',
        '/porodica'
    ];

    const sitemapEntries = [];

    routes.forEach(route => {
        locales.forEach(locale => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
