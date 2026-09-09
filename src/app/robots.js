export default function robots(){const base=process.env.NEXT_PUBLIC_SITE_URL||'https://affiliate.galiver.shop';return {rules:{userAgent:'*',allow:'/'},sitemap:`${base}/sitemap.xml`}}
