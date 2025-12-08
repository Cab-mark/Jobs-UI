export type { Job } from "./jobTypes";
export type { JobResultItem } from "./jobTypes";
import type { Job, JobSearchResponse } from "./jobTypes";
let jobs: Job[];
if (process.env.NODE_ENV === "development") {
  jobs = require("./jobs.local").jobsData;
} else {
  jobs = [];
  // TODO: Replace with production jobs data source or API
}

export function getJobs(): Job[] {
  return jobs;
}

export function getJobSearchResponse(): JobSearchResponse {
  return {
    results: jobs,
    total: jobs.length,
    page: 1,
    pageSize: 10,
    totalPages: Math.ceil(jobs.length / 10),
    query: null,
    appliedFilters: null
  };
}

export function getJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}

export function getJobByExternalId(externalId: string): Job | undefined {
  return jobs.find((job) => job.externalId === externalId);
}

export function getPaginatedJobs(page: number = 1, pageSize: number = 10): JobSearchResponse {
  const validPage = Math.max(1, page);
  const totalPages = Math.ceil(jobs.length / pageSize);
  const clampedPage = Math.min(validPage, Math.max(1, totalPages));
  
  const startIndex = (clampedPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedResults = jobs.slice(startIndex, endIndex);
  
  return {
    results: paginatedResults,
    total: jobs.length,
    page: clampedPage,
    pageSize,
    totalPages,
    query: null,
    appliedFilters: null
  };
}
