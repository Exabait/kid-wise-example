'use server';

import { NextRequest } from 'next/server';

/**
 * Extracts the real client IP address from a Next.js request
 * Handles various proxy headers and deployment environments (Vercel, Cloudflare, etc.)
 */
export function getClientIP(req: NextRequest): string {
  // Try different headers in order of preference
  const headers = [
    'x-forwarded-for', // Standard proxy header
    'x-real-ip', // Nginx proxy header
    'x-client-ip', // Apache proxy header
    'cf-connecting-ip', // Cloudflare header
    'x-forwarded', // Generic forwarded header
    'forwarded-for', // RFC 7239 header
    'forwarded', // RFC 7239 header
    'x-cluster-client-ip', // Cluster environments
    'x-original-forwarded-for', // Original forwarded header
  ];

  for (const header of headers) {
    const value = req.headers.get(header);
    if (value) {
      // Handle comma-separated IPs (x-forwarded-for can contain multiple IPs)
      const ips = value.split(',').map(ip => ip.trim());

      // Get the first valid IP (leftmost is the original client)
      for (const ip of ips) {
        if (isValidIP(ip)) {
          return ip;
        }
      }
    }
  }

  // Note: Vercel's geo object doesn't include IP in current type definitions
  // It only includes city, country, region, latitude, longitude

  // Fallback to connection remote address
  const remoteAddress = req.ip;
  if (remoteAddress && isValidIP(remoteAddress)) {
    return remoteAddress;
  }

  // Last resort fallback - indicates localhost/development
  return '127.0.0.1';
}

/**
 * Validates if a string is a valid IP address (IPv4 or IPv6)
 */
function isValidIP(ip: string): boolean {
  // Remove any surrounding brackets for IPv6
  const cleanIP = ip.replace(/^\[|\]$/g, '');

  // Skip private/internal IPs for better accuracy
  if (isPrivateIP(cleanIP)) {
    return false;
  }

  // IPv4 regex
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // IPv6 regex (simplified)
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/;

  return ipv4Regex.test(cleanIP) || ipv6Regex.test(cleanIP);
}

/**
 * Checks if an IP address is private/internal
 */
function isPrivateIP(ip: string): boolean {
  // Private IPv4 ranges
  const privateRanges = [
    /^10\./, // 10.0.0.0/8
    /^172\.(1[6-9]|2[0-9]|3[01])\./, // 172.16.0.0/12
    /^192\.168\./, // 192.168.0.0/16
    /^127\./, // Loopback
    /^169\.254\./, // Link-local
    /^::1$/, // IPv6 loopback
    /^fc00:/, // IPv6 private
    /^fe80:/, // IPv6 link-local
  ];

  return privateRanges.some(range => range.test(ip));
}

/**
 * Gets geographic information about an IP
 * Useful for debugging or logging
 */
export function getIPInfo(req: NextRequest) {
  const ip = getClientIP(req);
  const geo = req.geo;

  return {
    ip,
    country: geo?.country,
    region: geo?.region,
    city: geo?.city,
    latitude: geo?.latitude,
    longitude: geo?.longitude,
    // Add headers for debugging
    headers: {
      'x-forwarded-for': req.headers.get('x-forwarded-for'),
      'x-real-ip': req.headers.get('x-real-ip'),
      'cf-connecting-ip': req.headers.get('cf-connecting-ip'),
    },
  };
}
