import Link from "next/link";

type SearchParams = {
  reason?: string;
  detail?: string;
};

const reasonCopy: Record<string, { title: string; body: string }> = {
  login_failed: {
    title: "Login wasn’t completed",
    body: "The identity provider returned an error while signing you in.",
  },
  invalid_response: {
    title: "Login could not be verified",
    body: "We couldn’t validate the response from the identity provider.",
  },
  configuration_error: {
    title: "Login is not configured",
    body: "This service is missing required configuration for GOV.UK One Login.",
  },
  token_exchange_failed: {
    title: "Login failed",
    body: "We couldn’t exchange your login code for a token.",
  },
  unexpected_error: {
    title: "Something went wrong",
    body: "We hit an unexpected error while processing your login.",
  },
};

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const reason = searchParams?.reason ?? "login_failed";
  const detail = searchParams?.detail;
  const copy = reasonCopy[reason] ?? reasonCopy.login_failed;

  return (
    <main className="govuk-width-container govuk-main-wrapper">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="govuk-heading-l">{copy.title}</h1>
          <p className="govuk-body">{copy.body}</p>
          {detail ? (
            <p className="govuk-body">
              <strong>Details:</strong> {detail}
            </p>
          ) : null}
          <p className="govuk-body">
            <Link className="govuk-link" href="/api/auth/login">
              Try signing in again
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
