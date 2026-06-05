/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return {
      // Serve the static Jana Post landing (public/janapost/) at /janapost.
      // beforeFiles runs ahead of the dynamic app/[lang] route, so /janapost
      // is not interpreted as a language. Sub-assets (/janapost/src, /poster)
      // are served directly from public/ and are unaffected.
      beforeFiles: [
        { source: '/janapost', destination: '/janapost/index.html' },
        { source: '/janapost/', destination: '/janapost/index.html' },
      ],
    };
  },
};

export default nextConfig;
