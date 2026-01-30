"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";


export default function GovukInit() {
  const pathname = usePathname();
  const serviceHeaderInitialized = useRef(false);

  useEffect(() => {
    console.log("[GovukInit] useEffect running on client, pathname:", pathname);
    import("govuk-frontend").then(({ initAll }) => {
      console.log("[GovukInit] govuk-frontend loaded, calling initAll()");
      initAll();
    });
    
    // Initialize One Login service header only once
    if (!serviceHeaderInitialized.current) {
      import("@govuk-one-login/service-header/dist/scripts/service-header.js").then(() => {
        console.log("[GovukInit] service-header loaded, initializing");
        serviceHeaderInitialized.current = true;
        // The service header script will auto-initialize with data-module="one-login-header"
      }).catch((err) => {
        console.log("[GovukInit] service-header script not loaded:", err);
      });
    }
  }, [pathname]);

  return null;
}