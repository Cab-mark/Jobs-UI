'use client';

import Link from "next/link";

export default function LoginButton() {
  return (
    <div className="govuk-button-group">
      <Link href="/api/auth/login" className="govuk-button" data-module="govuk-button">
        Sign in with GOV.UK One Login
      </Link>
    </div>
  );
}
