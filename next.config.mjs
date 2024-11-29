/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/:path*', // Path on your frontend
          destination: 'https://image-generation-api-745834326512.us-central1.run.app/:path*', // Your backend API
        },
      ];
    },
  };
  
  export default nextConfig;
  