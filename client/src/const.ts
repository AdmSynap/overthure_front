export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

const env = (import.meta as any).env;

export const APP_TITLE = env.VITE_APP_TITLE || "App";

export const APP_LOGO =
  env.VITE_APP_LOGO ||
  "https://placehold.co/128x128/E1E7EF/1F2937?text=App";

export const getLoginUrl = () => {
  const oauthPortalUrl = env.VITE_OAUTH_PORTAL_URL;
  const appId = env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};