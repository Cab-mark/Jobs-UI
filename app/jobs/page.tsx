import Filter from "../components/Filter";
import HeroHorizontal from "../components/HeroHorizontal";
import JobResult from "../components/JobResult";

const JobLinks = [
    { location: '3 Glass Wharf, Bristol, BS2 OEL', organisation: 'Ministry of Defence', id: '1567', href: '/job/1578', text: 'Policy Advisor', salary: '£45,000', closingDate: '20 December 2025'  },
    { location: '2 Horse Guards, Whitehall, London, SW1A 2AX', organisation: 'College of Policing', id: '9488', href: '/job/9488', text: 'Police Service - Volunteer Curator', closingDate: '20 December 2025' },
    { location: '2 Horse Guards, Whitehall, London, SW1A 2AX', organisation: 'Home Office', id: '9487', href: '/job/9487', text: 'Project Manager', salary: '£39,000 to £46,200', closingDate: '20 December 2025' },
    { location: 'Benton Park Road, Newcastle upon Tyne, NE7 7LX', organisation: 'HM Revenue and Customs', id: '9489', href: '/job/9489', text: 'Dentist', closingDate: '5 January 2026', salary: '£99,000' },
]

export const metadata = {
  title: 'Search results',
  description: 'Browse and apply for jobs in the UK Civil Service.',
};

export default function Jobs() {
  return (
    <>
        <HeroHorizontal />
          <div className="govuk-width-container govuk-!-margin-top-6">
            <div className="govuk-grid-row">
              <Filter />
              <JobResult jobs={JobLinks} />
            </div>
          </div>
    </>
  );
}