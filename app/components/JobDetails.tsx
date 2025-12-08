import { Job } from '../lib/jobs';

export default function JobDetails({ job }: { job: Job }) {
  return (
    <>
      <span className="govuk-caption-xl">{job.organisation}</span>
      <h1 className="govuk-heading-xl">{job.title}</h1>
      <dl className="govuk-summary-list">
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Job reference</dt>
          <dd className="govuk-summary-list__value">{job.externalId}</dd>
        </div>
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Location</dt>
          <dd className="govuk-summary-list__value">
            {Array.isArray(job.location) && job.location.length > 0
              ? job.location
                  .map(loc => {
                    if (!loc) return '';
                    // Check for overseasLocations type
                    if ('countryName' in loc) {
                      // overseasLocations
                      return loc.locationDisplay || loc.countryName;
                    } else {
                      const address = [
                        loc.saoText,
                        loc.paoText,
                        loc.streetDescription,
                        loc.townName,
                        loc.postcode
                      ]
                        .filter(Boolean)
                        .join(', ');
                      return address || Object.values(loc).join(' ').trim();
                    }
                  })
                  .filter(Boolean)
                  .join(' | ')
              : typeof job.location === 'string'
                ? job.location
                : ''}
          </dd>
        </div>
        {job.salary && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Salary</dt>
            <dd className="govuk-summary-list__value">
                {(() => {
                  const s = job.salary;
                  const symbol = s.currencySymbol || '';
                  let range = s.minimum ? (symbol ? symbol : '') + s.minimum.toLocaleString() : '';
                  if (s.maximum) {
                    range += ' - ' + (symbol ? symbol : '') + s.maximum.toLocaleString();
                  }
                  // Only show currency ISO if no symbol
                  let currency = !symbol && s.currency ? ` ${s.currency}` : '';
                  return `${range}${currency}`;
                })()}
            </dd>
          </div>
        )}
          {job.salary && job.salary.salaryDetails && (
            <div className="govuk-summary-list__row">
              <dt className="govuk-summary-list__key govuk-visually-hidden">Salary details</dt>
              <dd className="govuk-summary-list__value">
                {job.salary.salaryDetails.split(/\r?\n/).map((line, i, arr) => (
                  <span key={i}>
                    {line}
                    {i < arr.length - 1 ? <br /> : null}
                  </span>
                ))}
              </dd>
            </div>
          )}
                {job.grade && (
                  <div className="govuk-summary-list__row">
                    <dt className="govuk-summary-list__key">Grade</dt>
                    <dd className="govuk-summary-list__value">{job.grade}</dd>
                  </div>
                )}
        <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Contract type</dt>
            <dd className="govuk-summary-list__value">{job.assignmentType}</dd>
          </div>
        {job.jobNumbers && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Number of jobs</dt>
            <dd className="govuk-summary-list__value">{job.jobNumbers}</dd>
          </div>
        )}
        {job.profession && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Profession</dt>
            <dd className="govuk-summary-list__value">{job.profession}</dd>
          </div>
        )}
        {job.closingDate && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Closing date</dt>
            <dd className="govuk-summary-list__value">
              {
                job.closingDate instanceof Date
                  ? job.closingDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                  : (() => {
                      const d = new Date(job.closingDate);
                      return isNaN(d.getTime())
                        ? job.closingDate
                        : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                    })()
              }
            </dd>
          </div>
        )}
      </dl>
      {job.applyUrl && (
        <a
          href={job.applyUrl.toString()}
          className="govuk-button"
          target="_blank"
          role="button"
          rel="noopener noreferrer"
        >
          Apply on advertiser's site
        </a>
      )}
    </>
  );
}