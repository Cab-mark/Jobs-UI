import Link from 'next/link';
import { Job } from '../lib/mockJobs';

export default function JobResult({ 
  jobs}: { jobs: Job[] }) {
  return (
    <>
      <ol className="govuk-list govuk-list--spaced">
        {jobs.map((job) => (
          <li key={job.id} className="govuk-!-margin-bottom-6">
            <h2 className="govuk-heading-m">
                <Link className="govuk-link govuk-link--no-visited-state" href={`/job/${job.id}`}>
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
                        if (loc.formattedAddress) {
                          return loc.formattedAddress;
                        }
                        const address = [
                          loc.saoText,
                          loc.paoText,
                          loc.streetDescription,
                          loc.locality,
                          loc.postTown,
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
                <strong>Salary:</strong> {job.salary}
              </p>
            )}
            {/* Closing date */}
            {job.closingDate && (
              <p className="govuk-hint govuk-!-margin-bottom-2">
                Closing date: {job.closingDate}
              </p>
            )}
          </li>
        ))}
        </ol>
    </>
  );
}