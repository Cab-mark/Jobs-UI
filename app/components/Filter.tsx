"use client";

export default function Filter() {
  return (
    <>
      <h2 className="govuk-heading-m">Filter</h2>
      {/* Mobile: GOV.UK Details component */}
      <details className="govuk-details filter-mobile" data-module="govuk-details">
        <summary className="govuk-details__summary">
          <span className="govuk-details__summary-text">Show filters</span>
        </summary>
        <div className="govuk-details__text">
          <div className="govuk-accordion" data-module="govuk-accordion" id="accordion-mobile">
            {/* Accordion sections (same as below) */}
            <div className="govuk-accordion__section">
              <div className="govuk-accordion__section-header">
                <h2 className="govuk-accordion__section-heading">
                  <span className="govuk-accordion__section-button" id="accordion-mobile-heading-1">
                    Location
                  </span>
                </h2>
              </div>
              <div id="accordion-mobile-content-1" className="govuk-accordion__section-content">
                <p className="govuk-body">To be added.</p>
              </div>
            </div>
            <div className="govuk-accordion__section">
              <div className="govuk-accordion__section-header">
                <h2 className="govuk-accordion__section-heading">
                  <span className="govuk-accordion__section-button" id="accordion-mobile-heading-2">
                    Department
                  </span>
                </h2>
              </div>
              <div id="accordion-mobile-content-2" className="govuk-accordion__section-content">
                <p className="govuk-body">To be added.</p>
              </div>
            </div>
            <div className="govuk-accordion__section">
              <div className="govuk-accordion__section-header">
                <h2 className="govuk-accordion__section-heading">
                  <span className="govuk-accordion__section-button" id="accordion-mobile-heading-3">
                    Salary
                  </span>
                </h2>
              </div>
              <div id="accordion-mobile-content-3" className="govuk-accordion__section-content">
                <p className="govuk-body">To be added.</p>
              </div>
            </div>
            <div className="govuk-accordion__section">
              <div className="govuk-accordion__section-header">
                <h2 className="govuk-accordion__section-heading">
                  <span className="govuk-accordion__section-button" id="accordion-mobile-heading-4">
                    Profession
                  </span>
                </h2>
              </div>
              <div id="accordion-mobile-content-4" className="govuk-accordion__section-content">
                <p className="govuk-body">To be added.</p>
              </div>
            </div>
          </div>
        </div>
      </details>
      {/* Desktop: GOV.UK Accordion always visible */}
      <div className="govuk-accordion filter-desktop" data-module="govuk-accordion" id="accordion-default">
        <div className="govuk-accordion__section">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
              <span className="govuk-accordion__section-button" id="accordion-default-heading-1">
                Location
              </span>
            </h2>
          </div>
          <div id="accordion-default-content-1" className="govuk-accordion__section-content">
            <p className="govuk-body">To be added.</p>
          </div>
        </div>
        <div className="govuk-accordion__section">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
              <span className="govuk-accordion__section-button" id="accordion-default-heading-2">
                Department
              </span>
            </h2>
          </div>
          <div id="accordion-default-content-2" className="govuk-accordion__section-content">
            <p className="govuk-body">To be added.</p>
          </div>
        </div>
        <div className="govuk-accordion__section">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
              <span className="govuk-accordion__section-button" id="accordion-default-heading-3">
                Salary
              </span>
            </h2>
          </div>
          <div id="accordion-default-content-3" className="govuk-accordion__section-content">
            <p className="govuk-body">To be added.</p>
          </div>
        </div>
        <div className="govuk-accordion__section">
          <div className="govuk-accordion__section-header">
            <h2 className="govuk-accordion__section-heading">
              <span className="govuk-accordion__section-button" id="accordion-default-heading-4">
                Profession
              </span>
            </h2>
          </div>
          <div id="accordion-default-content-4" className="govuk-accordion__section-content">
            <p className="govuk-body">To be added.</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 769px) {
          .filter-mobile { display: none; }
          .filter-desktop { display: block; }
        }
        @media (max-width: 768px) {
          .filter-mobile { display: block; }
          .filter-desktop { display: none; }
        }
      `}</style>
    </>
  );
}