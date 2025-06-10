import { withSentryConfig } from '@sentry/nextjs';

const nextConfig = {
  // Existing Next.js configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.SUPABASE_URL.split('://')[1].split(':')[0],
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  org: 'id-wise',
  project: 'javascript-nextjs',
  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,
  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
});
