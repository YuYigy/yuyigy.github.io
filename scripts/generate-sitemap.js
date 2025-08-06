const fs = require('fs');
const path = require('path');
const { getAllPosts } = require('../src/lib/mdx');

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yuyigy.github.io';

function generateSitemap() {
  const posts = getAllPosts();
  
  const staticPages = [
    '',
    '/about',
    '/categories',
    '/resources',
  ];

  const dynamicPages = posts.map(post => `/posts/${post.slug}`);
  
  const allPages = [...staticPages, ...dynamicPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(page => {
    const url = `${SITE_URL}${page}`;
    const lastmod = page.startsWith('/posts/') 
      ? posts.find(post => `/posts/${post.slug}` === page)?.date 
      : new Date().toISOString().split('T')[0];
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page === '' ? 'weekly' : page.startsWith('/posts/') ? 'monthly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : page.startsWith('/posts/') ? '0.8' : '0.6'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
}

if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };
