import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getJobByExternalId, Job } from "../../lib/jobs";
import JobDetails from "../../components/JobDetails";
import JobAdvert from "@/app/components/JobAdvert";

interface JobAdvertProps {
  params: { externalId: string };
}

export async function generateMetadata({ params }: JobAdvertProps): Promise<Metadata> {
  const { externalId } = await params;
  const job = getJobByExternalId(externalId);
  return {
    title: job ? job.title : "Job not found",
    description: job ? job.description : "No job found for this ID.",
  };
}

export default async function JobAdvertPage({ params }: JobAdvertProps) {
  const { externalId } = await params;
  const job = getJobByExternalId(externalId);
  if (!job) return notFound();

  return (
    <div className="govuk-width-container govuk-!-margin-top-6">
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <JobDetails job={job as Job} />
      </div>
      <div className="govuk-grid-column-one-quarter">
        <h3 className="govuk-heading-s">Contents</h3>
        <a href="#about-the-job" className="govuk-link govuk-body">About the job</a><br />
        <a href="#what-we-are-looking-for" className="govuk-link govuk-body">What we are looking for</a><br />
        <a href="#contacts" className="govuk-link govuk-body">Contact us</a><br />
        <a href="#before-you-apply" className="govuk-link govuk-body">Before you apply</a>
        {job.attachments && job.attachments.length > 0 && (
          <>
            <h3 className="govuk-heading-s govuk-!-margin-top-4">Attachments</h3>
            <ul className="govuk-list">
              {job.attachments.map((att) => (
                <li key={att.href}>
                  <a href={att.href} className="govuk-link" target="_blank" rel="noopener noreferrer">
                    {att.docName || 'Attachment'}
                  </a>
                  {att.docFormat && (
                    <span className="govuk-body govuk-!-margin-left-1">({att.docFormat.toUpperCase()}{att.fileSize ? `, ${att.fileSize}` : ''})</span>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="govuk-grid-column-three-quarters">
        <JobAdvert job={job as Job} />
      </div>
    </div>
    </div>
  );
}
