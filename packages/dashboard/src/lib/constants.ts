export const API_URI = process.env.NEXT_PUBLIC_API_URI ?? "http://localhost:4000";
export const AWS_REGION = process.env.NEXT_PUBLIC_AWS_REGION;
export const DEFAULT_DOMAIN = process.env.NEXT_PUBLIC_DEFAULT_DOMAIN;

export const NO_AUTH_ROUTES = ['/auth/signup', '/auth/login', '/auth/reset', '/unsubscribe/[id]', '/subscribe/[id]'];
