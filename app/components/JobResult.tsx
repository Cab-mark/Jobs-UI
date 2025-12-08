import Link from 'next/link';
import { JobResultItem } from '../lib/jobs';

export default function JobResult({ jobs }: { jobs: JobResultItem[] }) {
  if (!jobs || jobs.length === 0) {
    return (
      <div className="govuk-!-margin-bottom-6">
        <h2 className="govuk-heading-m">No jobs found</h2>
        <p className="govuk-body">We couldn't find any jobs matching your search criteria.</p>
        <ul className="govuk-list govuk-list--bullet">
          <li>Try broadening your search terms</li>
          <li>Check for spelling errors</li>
          <li>Remove or change filters</li>
          <li>Browse all jobs to see what's available</li>
        </ul>
        <p className="govuk-body">
          <Link className="govuk-link" href="/jobs">Browse all jobs</Link>
        </p>
      </div>
    );
  }
  return (
    <>
      <ol className="govuk-list govuk-list--spaced">
        {jobs.map((job) => (
          <li key={job.id} className="govuk-!-margin-bottom-6">
            <h2 className="govuk-heading-m">
                <Link className="govuk-link govuk-link--no-visited-state" href={`/job/${job.externalId}`}>
                    {job.title}
                </Link>
            </h2>
            <p className="govuk-body-s govuk-!-margin-bottom-1">
              {job.organisation}
              {/* DEBUG: Show JSON of location for troubleshooting */}
              {/* <pre style={{fontSize:'10px'}}>{JSON.stringify(job.location, null, 2)}</pre> */}
              {Array.isArray(job.location) && job.location.length > 0 && (
                <> · {
                  job.location
                    .map(loc => {
                      if (!loc) return '';
                      // Check for overseasLocations type
                      if ('countryName' in loc) {
                        // overseasLocations
                        return loc.locationDisplay || loc.countryName;
                      } else {
                        // fixedLocations
                        const address = [
                          loc.paoText,
                          loc.saoText,
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
                }</>
              )}
            </p>
            {job.assignmentType && (
              <p className="govuk-body-s govuk-!-margin-bottom-1">
                <strong>Contract type:</strong> {job.assignmentType}
              </p>
            )}
               {job.salary && (
  <p className="govuk-body-s govuk-!-margin-bottom-1">
    <strong>Salary:</strong> {
      (() => {
        const s = job.salary;
        let symbol = s.currencySymbol || '';
        let range = s.minimum ? (symbol ? symbol : '') + s.minimum.toLocaleString() : '';
        if (s.maximum) {
          range += ' - ' + (symbol ? symbol : '') + s.maximum.toLocaleString();
        }
        // Only show currency ISO if no symbol
        let currency = !symbol && s.currency ? ` ${s.currency}` : '';
        return `${range}${currency}`;
      })()
    }
  </p>
)}
            {/* Closing date */}
            {job.closingDate && (
              <p className="govuk-hint govuk-!-margin-bottom-2">
                Closing date: {
                  job.closingDate instanceof Date
                    ? job.closingDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
                    : (() => {
                        // Try to parse string to Date
                        const d = new Date(job.closingDate);
                        return isNaN(d.getTime())
                          ? job.closingDate
                          : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
                      })()
                }
              </p>
            )}
          </li>
        ))}
        </ol>
    </>
  );
}