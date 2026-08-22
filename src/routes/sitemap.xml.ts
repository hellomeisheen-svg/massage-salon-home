import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sitemap/xml')({
  server: {
    handlers: {
      GET: async () => {
        const pages = [
          '',
          '/girudoterapiya',
          '/ketgut',
          '/vakuumnyi-massazh',
          '/klassicheskii-massazh',
          '/vektornyi-massazh',
          '/limfaticheskii-massazh',
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>https://7heavenmassage.ru${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

        return new Response(sitemap, {
          headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=86400',
          },
        });
      },
    },
  },
});
