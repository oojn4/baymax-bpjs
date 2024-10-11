import { kv } from '@vercel/kv';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

const RATE_LIMIT = 60; // Max requests allowed
const TIME_WINDOW = 60 * 1000; // 1 minute in milliseconds

// Function to get IP from the request headers
function getIP() {
  return headers().get('x-real-ip') ?? 'unknown';
}

/**
 * Rate limiting function to track and limit requests based on IP.
 * Stores request timestamps in Vercel KV and checks whether the user has
 * exceeded the rate limit.
 */
export async function rateLimit() {
  const ip = getIP(); // Get the client's IP address
  const key = `ratelimit_${ip}`; // Unique key for storing request timestamps in KV store
  const now = Date.now(); // Current timestamp

  // Get the existing request timestamps for this IP from Vercel KV
  let timestamps = await kv.get<number[]>(key);

  // Initialize the timestamps array if no record exists for this IP
  if (!timestamps) {
    timestamps = [];
  }

  // Remove timestamps older than the rate-limiting window (1 minute)
  timestamps = timestamps.filter((timestamp) => now - timestamp <= TIME_WINDOW);

  // If the user has exceeded the rate limit, redirect them to the waiting room
  if (timestamps.length >= RATE_LIMIT) {
    redirect('/waiting-room');
    return;
  }

  // Add the current timestamp to the list
  timestamps.push(now);

  // Save the updated list back to Vercel KV with expiration set to TIME_WINDOW
  await kv.set(key, timestamps, { ex: TIME_WINDOW / 1000 });

  // Proceed if the user hasn't exceeded the rate limit
}

/**
 * Example usage of the rateLimit function in a route handler or API endpoint
 */
export async function handleRequest() {
  await rateLimit(); // Apply rate limiting

  // If not rate-limited, proceed with the actual request handling logic
  return {
    status: 200,
    body: 'Request successful!',
  };
}
