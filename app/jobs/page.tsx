import Filter from "../components/Filter";
import HeroHorizontal from "../components/HeroHorizontal";
import JobResult from "../components/JobResult";
import Pagination from "../components/Pagination";
import { getPaginatedJobs } from "../lib/mockJobs";

export const metadata = {
  title: 'Search results',
  description: 'Browse and apply for jobs in the UK Civil Service.',
};

interface JobsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function Jobs({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10) || 1;
  
  const { results, page, totalPages } = getPaginatedJobs(currentPage);
  
  return (
    <>
      <HeroHorizontal />
      <div className="govuk-width-container govuk-!-margin-top-6">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <Filter />
          </div>
          <div className="govuk-grid-column-two-thirds">
            <JobResult jobs={results} />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl="/jobs"
            />
          </div>
        </div>
      </div>
    </>
  );
}