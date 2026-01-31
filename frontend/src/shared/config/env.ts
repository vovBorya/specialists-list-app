/**
 * Typed environment configuration
 */

const getEnvVar = (key: string, fallback?: string): string => {
  const value = import.meta.env[key] as string | undefined;
  if (!value && fallback === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value ?? fallback ?? '';
};

export const ENV = {
  API_URL: getEnvVar('VITE_API_URL', 'http://localhost:3000'),
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;
