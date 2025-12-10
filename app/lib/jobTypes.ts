// Subset type for JobResult component
export interface JobResultItem {
  readonly id: string;
  readonly externalId: string;
  title: string;
  organisation: string;
  location: fixedLocations[] | overseasLocations[];
  workingPattern: WorkingPattern[];
  workLocation: WorkLocation[];
  assignmentType: Assignments;
  salary?: Salary;
  grade: Grade | string;
  dateClosing: Date;
  profession: Profession;
  approach: Approach;
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

// Type definitions for job board

export interface Job {
  readonly id: string;
  readonly externalId: string;
  approach: Approach;
  title: string;
  description: string;
  organisation: string;
  location: fixedLocations[] | overseasLocations[];
  grade: Grade | string;
  assignmentType: Assignments;
  workLocation: WorkLocation[];
  workingPattern: WorkingPattern[];
  personalSpec: string;
  applyDetail: string;
  datePosted: Date;
  dateClosing: Date;
  profession: Profession;  
  recruitmentEmail: string;
  contacts?: Contacts[];
  nationalityRequirement?: string;
  summary?: string;
  applyUrl?: URL;
  benefits?: string;
  salary?: Salary;
  jobNumbers?: number;
  successProfileDetails?: string;
  diversityStatement?: string;
  disabilityConfident?: string;
  dcStatus?: DCStatus;
  redeploymentScheme?: string;
  prisonScheme?: string;
  veteranScheme?: string;
  criminalRecordCheck?: string;
  complaintsInfo?: string;
  workingForTheCivilService?: string;
  eligibilityCheck?: string;
  attachments?: JobAttachment[];
}

export interface JobAttachment {
  href: string;
  docName: string;
  docFormat: string;
  fileSize?: string;
}

// aligns with BS7666 standard (adopted by Nova)
export interface fixedLocations {
  uprn?: string;
  paoText?: string;
  saoText?: string;
  streetDescription?: string;
  townName: string;
  region: string;
  postcode?: string;
  latitude: number;
  longitude: number;
}

export interface overseasLocations {
  countryName: string;
  countryCode: string;
  locationDisplay?: string;
}

export enum Approach {
  Internal = "Internal",
  AcrossGovernment = "Across Government",
  External = "External"
}

export enum Assignments {
  Apprentice = "Apprentice",
  FixedTermAppointment = "Fixed Term Appointment (FTA)",
  Loan = "Loan",
  Secondment = "Secondment",
  Permanent = "Permanent"
}

// Maps to Nova data standard working pattern
export enum WorkingPattern {
  FullTime = "Full-time",
  PartTime = "Part-time"
}

export enum WorkLocation {
  Home = "Home based",
  Office = "Office based"
}

// Nova data standard compliant
export enum Grade {
  scs4 = "Senior Civil Service - Permanent Secretary",
  scs3 = "Senior Civil Service - Director General (PB3)",
  scs2 = "Senior Civil Service - Director (PB2)",
  scs1 = "Senior Civil Service - Deputy Director (PB1/1A)",
  grade6 = "Grade 6",
  grade7 = "Grade 7",
  seo = "Senior Executive Officer (SEO)",
  heo = "Higher Executive Officer (HEO)",
  eo = "Executive Officer (EO)",
  ao = "Administrative Officer (AO)",
  aa = "Administrative Assistant (AA)"
}

// Nova data standard compliant
export enum Profession {
  Actuary = "Actuary",
  Commercial = "Commercial",
  Communications = "Communications",
  CorporateFinance = "Corporate Finance",
  CounterFraud = "Counter Fraud",
  DigitalAndData =  "Digital and Data",
  Economics = "Economics",
  Finance = "Finance",
  Geography = "Geography",
  HumanResources = "Human Resources",
  IntelligenceAnalysis = "Intelligence Analysis",
  InternalAudit = "Internal Audit",
  InternationalTrade = "International Trade",
  KnowledgeAndInformationManagement = "Knowledge and Information Management",
  Legal = "Legal",
  Clinical = "Clinical",
  OccupationalPsychology = "Occupational Psychology",
  OperationalDelivery = "Operational Delivery",
  OperationalResearch = "Operational Research",
  Planning = "Planning",
  PlanningInspection = "Planning Inspection",
  Policy = "Policy",
  ProjectDelivery = "Project Delivery",
  Property = "Property",
  RiskManagement = "Risk Management",
  ScienceAndEngineering = "Science and Engineering",
  Security = "Security",
  SocialResearch = "Social Research",
  Statistics = "Statistics",
  Tax = "Tax",
  Veterinary = "Veterinary", 
}

export enum DCStatus {
  Committed = "Committed",
  Employer = "Disability Confident Employer",
  Leader = "Disability Confident Leader"
}

export interface Salary {
  minimum: number;
  maximum?: number;
  currency: string;
  currencySymbol?: string;
  salaryDetails?: string;
}

export interface Contacts {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
}