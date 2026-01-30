'use client';

import { useAuth } from '../contexts/AuthContext';

export default function LoginButton() {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (authenticated) {
    return (
      <div className="govuk-button-group">
        <a href="/api/auth/logout" className="govuk-button" data-module="govuk-button">
          Sign out
        </a>
      </div>
    );
  }

  return (
    <div className="govuk-button-group">
      <a href="/api/auth/login" className="govuk-button" data-module="govuk-button">
        Sign in with GOV.UK One Login
      </a>
    </div>
  );
}

