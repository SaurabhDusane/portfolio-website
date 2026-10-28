// Set NEXT_PUBLIC_SITE_URL in the deploy environment once the custom domain is
// live so canonical, sitemap and Open Graph URLs resolve to the production host.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://saurabhdusane.com").replace(/\/+$/, "");
