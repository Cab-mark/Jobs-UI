// Type definitions for job board

export interface JobAttachment {
  href: string;
  docName: string;
  docFormat: string;
  fileSize?: string;
}

export interface fixedLocations {
  uprn?: string;
  saoText?: string;
  paoText?: string;
  streetDescription?: string;
  locality?: string;
  townName?: string;
  postTown?: string;
  postcode?: string;
  latitude?: number;
  longitude?: number;
  formattedAddress?: string;
  fullAddressSearch?: string;
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
  location: fixedLocations[] | overseasLocations[];
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
