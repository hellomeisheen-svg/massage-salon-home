import { createFileRoute } from '@tanstack/react-router';

const BASE_URL = 'https://7heavenmassage.ru';
const PAGES = [
  '',
  '/girudoterapiya',
  '/ketgut',
  '/klassicheskii-massazh',
  '/limfaticheskii-massazh',
  '/banki',
  '/vektornyi-massazh',
  '/privacy-policy'
];

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: async () => {
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${PAGES.map(page => `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200'
          }
        });
      }
    }
  }
});
