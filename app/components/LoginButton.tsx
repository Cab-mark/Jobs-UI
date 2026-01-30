'use client';

export default function LoginButton() {
  return (
    <div className="govuk-button-group">
      <a href="/api/auth/login" className="govuk-button" data-module="govuk-button">
        Sign in with GOV.UK One Login
      </a>
    </div>
  );
}
