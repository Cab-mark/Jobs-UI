/**
 * Mock Jobs Module
 * 
 * This module provides mock job data and utility functions for the jobs application.
 * 
 * Structure:
 * - types.ts: TypeScript interfaces for Job, Location, Attachment types
 * - services.ts: Utility functions (getJobs, getJobById, getPaginatedJobs)
 * - data/: Job data (can be extended with categorized files as needed)
 */

// Re-export all types
export type {
  Job,
  JobAttachment,
  JobSearchResponse,
  fixedLocations,
  overseasLocations
} from './types';

// Re-export all service functions
export {
  getJobs,
  getJobById,
  getJobSearchResponse,
  getPaginatedJobs
} from './services';

// Re-export job data for direct access if needed
export { jobs } from './data';
