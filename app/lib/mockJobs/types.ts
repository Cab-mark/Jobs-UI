export interface JobAttachment {
  href: string;
  docName: string;
  docFormat: string;
  fileSize?: string;
}

export interface fixedLocations {
  
  // --- applying Bs7666 standard as mandated by Nova --- 
  
  // --- Identifiers ---
  uprn?: string;                // Unique Property Reference Number

  // --- Addressable Objects (combined for display) ---
  saoText?: string;             // Secondary Addressable Object (e.g. Flat)
  paoText?: string;             // Primary Addressable Object (e.g. Building name/number)

  // --- Street ---
  streetDescription?: string;   // Street name (BS7666)
  locality?: string;            // Locality / village
  townName?: string;            // Town or settlement
  postTown?: string;            // Royal Mail post town (normally same as townName)

  // --- Postcode ---
  postcode?: string;

  // --- Geo (for OpenSearch) ---
  latitude?: number;            // WGS84 (used for distance queries)
  longitude?: number;           // WGS84

  // --- Search helpers (optional but very useful) ---
  formattedAddress?: string;    // Combined printable address for job advert
  fullAddressSearch?: string;   // Keyword-searchable combined field
}

export interface overseasLocations {
  countryName: string;
  countryCode: string;
  locationDisplay?: string;
}

export interface Job {
  readonly id: string;
  title: string;
  description: string;
  organisation: string;
  location: fixedLocations [] | overseasLocations [];
  grade: string;
  assignmentType: string;
  personalSpec: string;
  applyDetail: string;
  nationalityRequirement?: string;
  summary?: string;
  applyUrl?: string;
  benefits?: string;
  profession?: string;
  salary?: string;
  closingDate?: string;
  jobNumbers?: number;
  successProfileDetails?: string;
  diversityStatement?: string;
  disabilityConfident?: string;
  redeploymentScheme?: string;
  prisonScheme?: string;
  veteranScheme?: string;
  contacts: boolean;
  contactName?: string;
  criminalRecordCheck?: string;
  complaintsInfo?: string;
  workingForTheCivilService?: string;
  eligibilityCheck?: string;
  contactEmail?: string;
  contactPhone?: string;
  recruitmentEmail: string;
  attachments?: JobAttachment[];
}

export interface JobSearchResponse {
  results: Job[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  query: string | null;
  appliedFilters: string | null;
}
