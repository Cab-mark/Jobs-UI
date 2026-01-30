import { NextResponse, type NextRequest } from "next/server";
import { getEnv } from "@/app/lib/env";

export async function GET(request: NextRequest) {
  const logoutUrl = getEnv("GOVUK_ONELOGIN_LOGOUT_URL");
  const postLogoutRedirect = getEnv("GOVUK_ONELOGIN_POST_LOGOUT_REDIRECT") ?? "/";
  
  // Validate post-logout redirect to prevent open redirect vulnerabilities
  if (!postLogoutRedirect.startsWith("/")) {
    console.error("Invalid post-logout redirect URL:", postLogoutRedirect);
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const baseUrl = forwardedHost
    ? `${forwardedProto ?? request.nextUrl.protocol}://${forwardedHost}`
    : request.nextUrl.origin;
  
  let finalRedirectUrl: string;
  
  // If GOV.UK One Login logout URL is configured, redirect there
  if (logoutUrl) {
    const postLogoutRedirectUri = new URL(postLogoutRedirect, baseUrl).toString();
    finalRedirectUrl = `${logoutUrl}?post_logout_redirect_uri=${encodeURIComponent(postLogoutRedirectUri)}`;
  } else {
    // Otherwise, just redirect to the post-logout page
    finalRedirectUrl = new URL(postLogoutRedirect, baseUrl).toString();
  }
  
  // Clear the authentication cookie and redirect
  const response = NextResponse.redirect(finalRedirectUrl);
  response.cookies.delete("govuk_id_token");
  
  return response;
}
