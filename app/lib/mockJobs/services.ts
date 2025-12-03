import { Job, JobSearchResponse } from './types';
import { jobs } from './data';

/**
 * Get all jobs
 */
export function getJobs(): Job[] {
  return jobs;
}

/**
 * Get job search response with all jobs
 */
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

/**
 * Get a specific job by its ID
 */
export function getJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}

/**
 * Get paginated jobs
 */
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
