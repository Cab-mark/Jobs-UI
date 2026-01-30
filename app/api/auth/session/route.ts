import { NextResponse, type NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

interface IdTokenPayload {
  exp?: number;
  sub?: string;
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("govuk_id_token")?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const payload = jwtDecode<IdTokenPayload>(token);
    const now = Math.floor(Date.now() / 1000);
    const expired = payload.exp ? payload.exp < now : false;

    return NextResponse.json({
      authenticated: !expired,
      expiresAt: payload.exp ?? null,
      subject: payload.sub ?? null,
    });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}
