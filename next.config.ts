import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers(){
    return [
      {
        source: "/api/payment/notification/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*"}, //replace this your actual origin
          {
            key: "Access-Control-Allow-Methode",
            value: "GET,POST",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-CSRF-TOKEN, X-Request-With, Accept, Accept-Version, Cntent-Length, content-MD5, Content-Type, Date, x-Api-Version",
          }
        ]
      }
    ]
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "zvphmjnelcwcgw05.public.blob.vercel-storage.com"
      }
    ],
  },
};

export default nextConfig;
