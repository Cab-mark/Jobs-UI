"use client";

import { useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { initAll } from "govuk-frontend";

type Props = {
  children: ReactNode;
};

export default function GovukInit({ children }: Props) {
  const pathname = usePathname();

  // Run once: add body classes for progressive enhancement
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.add("js-enabled");

      // From GOV.UK page template guidance: mark browsers
      // that support <script type="module">
      if ("noModule" in HTMLScriptElement.prototype) {
        document.body.classList.add("govuk-frontend-supported");
      }
    }
  }, []);

  // Run on first load + every route change: init GOV.UK components
  useEffect(() => {
    // Will look for [data-module="govuk-xxx"] etc and enhance them
    initAll();
  }, [pathname]);

  return <>{children}</>;
}