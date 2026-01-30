// components/ServiceNavigation.tsx

'use client'; // This hook must be used in a client component

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Hook to get the current route

// --- TypeScript Interfaces ---

interface NavLink {
  href: string;
  text: string;
}

interface ServiceNavigationProps {
  links: NavLink[];
}

// --- Component ---

/**
 * GOV.UK Service Navigation Component
 * * Renders a service navigation bar and automatically highlights the active link 
 * based on the current Next.js route path.
 */
export default function ServiceNavigation({ links }: ServiceNavigationProps) {
  const currentPath = usePathname();

  if (!links || links.length === 0) {
    return null;
  }
  
  // Map links to dynamically calculate the active state
  const activeLinks = links.map(link => ({
    ...link,
    // Determine if the link is active by comparing its href with the current path
    active: currentPath === link.href,
  }));


  return (
    <div className="govuk-service-navigation" data-module="govuk-service-navigation">
      <div className="govuk-width-container">
        <div className="govuk-service-navigation__container">
          <nav aria-label="Menu" className="govuk-service-navigation__wrapper">
            <button type="button" className="govuk-service-navigation__toggle govuk-js-service-navigation-toggle" aria-controls="navigation" hidden>
              Menu
            </button>
            <ul className="govuk-service-navigation__list" id="navigation">
              {activeLinks.map((link, index) => (
                <li 
                  key={index} 
                  className={`govuk-service-navigation__item${link.active ? ' govuk-service-navigation__item--active' : ''}`}
                >
                  <Link 
                    href={link.href} 
                    className="govuk-service-navigation__link"
                    aria-current={link.active ? 'page' : undefined}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
