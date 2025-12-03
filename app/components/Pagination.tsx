import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

/**
 * GOV.UK compliant pagination component
 * Follows the GOV.UK Design System pagination pattern
 */
export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const getPageUrl = (page: number) => {
    return `${baseUrl}?page=${page}`;
  };

  // Generate page numbers to display with ellipsis for many pages
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis');
      }
      
      // Show pages around current page (excluding first and last)
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }
      
      // Always show last page (if not already added in the loop)
      if (end < totalPages) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <nav className="govuk-pagination" aria-label="Pagination">
      {hasPrevious && (
        <div className="govuk-pagination__prev">
          <Link
            className="govuk-link govuk-pagination__link"
            href={getPageUrl(currentPage - 1)}
            rel="prev"
          >
            <svg
              className="govuk-pagination__icon govuk-pagination__icon--prev"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 15 13"
            >
              <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
            </svg>
            <span className="govuk-pagination__link-title">
              Previous<span className="govuk-visually-hidden"> page</span>
            </span>
          </Link>
        </div>
      )}

      <ul className="govuk-pagination__list">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <li
                key={`ellipsis-${index}`}
                className="govuk-pagination__item govuk-pagination__item--ellipsis"
              >
                &ctdot;
              </li>
            );
          }

          const isCurrent = page === currentPage;

          return (
            <li
              key={page}
              className={`govuk-pagination__item${
                isCurrent ? ' govuk-pagination__item--current' : ''
              }`}
            >
              <Link
                className="govuk-link govuk-pagination__link"
                href={getPageUrl(page)}
                aria-label={`Page ${page}`}
                {...(isCurrent && { 'aria-current': 'page' })}
              >
                {page}
              </Link>
            </li>
          );
        })}
      </ul>

      {hasNext && (
        <div className="govuk-pagination__next">
          <Link
            className="govuk-link govuk-pagination__link"
            href={getPageUrl(currentPage + 1)}
            rel="next"
          >
            <span className="govuk-pagination__link-title">
              Next<span className="govuk-visually-hidden"> page</span>
            </span>
            <svg
              className="govuk-pagination__icon govuk-pagination__icon--next"
              xmlns="http://www.w3.org/2000/svg"
              height="13"
              width="15"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 15 13"
            >
              <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
            </svg>
          </Link>
        </div>
      )}
    </nav>
  );
}
