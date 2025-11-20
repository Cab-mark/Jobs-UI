import type { Metadata } from "next";
import "./govuk.scss";
import GovukInit from "./GovukInit";
import Skip from "./components/Skip";
import GovukHeader from "./components/GovukHeader";
import ServiceNavigation from "./components/ServiceNavigation";
import GovukFooter from "./components/GovukFooter";


export const metadata: Metadata = {
  title: "Civil Service Jobs",
  description: "next.js prototype for Civil Service Jobs.",
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
      <body className="govuk-template__body">
        <Skip />
        <GovukHeader />

        <ServiceNavigation links={navLinks} />

            <main className="govuk-main-wrapper" id="main-content" role="main">
                <GovukInit>{children}</GovukInit>         
            </main>

        <GovukFooter 
          links={footerLinks}
        />

      </body>
    </html>
  );
}
