"use client";

export default function HeroSearch() {
  return (
    <div className="govuk-hero govuk-hero--blue">
      <div className="govuk-width-container">
        <h1 className="govuk-heading-xl">Find your next job</h1>

        <form action="/search" method="get" className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="q">
                Keyword (optional)
                </label>
                <input
                className="govuk-input govuk-!-width-one-half"
                id="q"
                name="q"
                type="text"
                />
            </div>
            <div className="govuk-form-group">
                <label className="govuk-label" htmlFor="l">
                Location (optional)
                </label>
                <input
                className="govuk-input govuk-!-width-one-half"
                id="l"
                name="l"
                type="text"
                />
            </div>
            <button
              className="govuk-button govuk-button--inverse"
              data-module="govuk-button"
              type="submit"
            >
              Search
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}