"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";


export default function GovukInit() {
  const pathname = usePathname();

  useEffect(() => {
    console.log("[GovukInit] useEffect running on client, pathname:", pathname);
    import("govuk-frontend").then(({ initAll }) => {
      console.log("[GovukInit] govuk-frontend loaded, calling initAll()");
      initAll();
    });
    
    // Initialize One Login service header
    import("@govuk-one-login/service-header/dist/scripts/service-header.js").then(() => {
      console.log("[GovukInit] service-header loaded, initializing");
      // The service header script will auto-initialize with data-module="one-login-header"
    }).catch((err) => {
      console.log("[GovukInit] service-header script not loaded:", err);
    });
  }, [pathname]);

  return null;
}