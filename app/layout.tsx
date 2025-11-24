import type { Metadata } from "next";
import "./globals.scss";
import GovukInit from "./GovukInit";
import Skip from "./components/Skip";
import GovukHeader from "./components/GovukHeader";
import ServiceNavigation from "./components/ServiceNavigation";
import GovukFooter from "./components/GovukFooter";
import PhaseBanner from "./components/PhaseBanner";


export const metadata: Metadata = {
  title: {
    default: "Civil Service Jobs",
    template: "%s | Civil Service Jobs",
  },
  description: "A job search platform for the UK Civil Service.",
};

const navLinks = [
  { href: '/', text: 'Home', active: true },
  { href: '/jobs', text: 'View all jobs', active: false },
];

// Define the links you want in the footer
const footerLinks = [
  { href: '/cookies', text: 'Cookies' },
  { href: '/accessibility', text: 'Accessibility' },
  { href: '/privacy', text: 'Privacy policy' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="govuk-template govuk-template--rebranded">
      <head>
        <link rel="icon" sizes="48x48" href="/assets/rebrand/images/favicon.ico" />
        <link rel="icon" sizes="any" href="/assets/rebrand/images/favicon.svg" type="image/svg+xml" />
        <link rel="mask-icon" href="/assets/rebrand/images/govuk-icon-mask.svg" color="#1d70b8" />
        <link rel="apple-touch-icon" href="/assets/rebrand/images/govuk-icon-180.png" />
      </head>
      <body className="govuk-template__body govuk-frontend-supported">
        <GovukInit />
        <Skip />
        <GovukHeader />

        <ServiceNavigation links={navLinks} />
        
        <PhaseBanner />

            <main className="govuk-main-wrapper" id="main-content" role="main">
                {children}      
            </main>

        <GovukFooter 
          links={footerLinks}
        />

      </body>
    </html>
  );
}
