import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["placehold.co", "picsum.photos", "dummyimage.com"], // сюда добавляем все домены с которых грузим картинки
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval';
              style-src 'self' 'unsafe-inline';
              img-src 'self' data:;
              connect-src 'self' http://o-complex.com:1337;
              font-src 'self';
              frame-src 'none';
              object-src 'none';
            `
              .replace(/\s{2,}/g, " ")
              .trim(),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
