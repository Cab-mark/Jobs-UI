import { NextResponse, type NextRequest } from "next/server";
import { getEnv } from "@/app/lib/env";

export async function GET(request: NextRequest) {
  const logoutUrl = getEnv("GOVUK_ONELOGIN_LOGOUT_URL");
  const postLogoutRedirect = getEnv("GOVUK_ONELOGIN_POST_LOGOUT_REDIRECT") ?? "/";
  
  // Clear the authentication cookie
  const response = NextResponse.redirect(new URL(postLogoutRedirect, request.url));
  response.cookies.delete("govuk_id_token");
  
  // If GOV.UK One Login logout URL is configured, redirect there
  // Otherwise, just redirect to the post-logout page
  if (logoutUrl) {
    const forwardedHost = request.headers.get("x-forwarded-host");
    const forwardedProto = request.headers.get("x-forwarded-proto");
    const baseUrl = forwardedHost
      ? `${forwardedProto ?? request.nextUrl.protocol}://${forwardedHost}`
      : request.nextUrl.origin;
    
    const postLogoutRedirectUri = new URL(postLogoutRedirect, baseUrl).toString();
    const fullLogoutUrl = `${logoutUrl}?post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;
    
    return NextResponse.redirect(fullLogoutUrl);
  }
  
  return response;
}
