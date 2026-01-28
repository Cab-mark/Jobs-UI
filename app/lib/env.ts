const NODE_ENV = process.env.NODE_ENV ?? "development";
const ENV_SUFFIX = NODE_ENV.toUpperCase();

export function getEnv(key: string) {
  return process.env[`${key}_${ENV_SUFFIX}`] ?? process.env[key];
}

export const isDevelopment = NODE_ENV === "development";
export const DEFAULT_COOKIE_MAX_AGE = 10 * 60; // 10 minutes
