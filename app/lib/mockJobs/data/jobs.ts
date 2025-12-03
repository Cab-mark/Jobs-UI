import { Job } from '../types';

/**
 * Mock Job Data
 * 
 * This file contains all mock job listings organized into a single array.
 * The data includes:
 * - UK-based government positions
 * - Overseas/embassy positions
 * - Featured listings with comprehensive details
 */

const jobs: Job[] = [ 
{ personalSpec: 'Some personal specification text', 
  contacts: false,
  applyDetail: 'Some application detail text',
  recruitmentEmail: 'recruitment@civilservice.gov.uk',
  assignmentType: 'Fixed Term Appointment (FTA)', 
  grade: 'Grade 7', 
  jobNumbers: 1, 
  description: 'This is a fantastic job for a ...', 
  location: [{
    saoText: undefined,
    paoText: '3 Glass Wharf',
    streetDescription: undefined,
    locality: undefined,
    townName: 'Bristol',
    postTown: 'Bristol',
    postcode: 'BS2 0EL',
    latitude: 51.4552,
    longitude: -2.5833,
    formattedAddress: '3 Glass Wharf, Bristol, BS2 0EL'
  }],
  organisation: 'Ministry of Defence', 
  id: '1567', title: 'Policy Advisor', 
  salary: '£45,000', 
  closingDate: '20 December 2025'  
},
{ applyUrl: 'https://jobs.justice.gov.uk/careers/JobDetail/7334?entityId=7334', 
  contacts: true,
  contactName: 'Matthew Murray', 
  contactEmail: 'Matthew.murray@dft.gov.uk',
  recruitmentEmail: 'dftrecruitment.grs@cabinetoffice.gov.uk',
  personalSpec: 'Required experience:\nTo be successful in this role you will need to have the following experience:\n\n* Experience in developing and delivering complex policy, ensuring alignment with departmental objectives and contributing to effective outcomes.\n* Experience working in a fast-paced, high-profile environment and managing competing priorities.\n* Experience in building and maintaining effective relationships with industry and cross-government stakeholders, fostering collaboration and driving shared goals.\n* Experience in supporting the development and scrutiny of legislation, including drafting briefing materials. Additional Information\n\nFor more information about the GBR licence role, please email Matthew Murray - matthew.murray@dft.gov.uk\nFor more information about the Bill-facing role please email Will Blunden - william.blunden@dft.gov.uk\n\nAll staff, including fixed term appointees, who have successfully completed their probation period are eligible to apply.\n\nIn alignment with internal Civil Service Wide opportunities, staff will not be eligible to apply if they have a current formal written warning for performance, conduct or attendance. This will include individuals who are in a ‘sustained period’ following an attendance warning. Staff who receive a formal warning subsequent to their application will also be withdrawn from the process.\n\nWorking Hours, Locations and Travel\n\nPlease note these roles include a parliamentary facing element and will require you to be available to meet demanding deadlines during Bill passage. You may be required to work unsociable hours, schedule leave around Parliamentary sittings and frequently travel to London.\n\nThese roles are suitable for hybrid working, which is a non-contractual arrangement where a combination of workplace and home-based working can be accommodated subject to business requirements.\n\nThe expectation at present is a minimum of 60% of your working time a month will be spent at either your designated workplace (one of the locations cited in the advert) or, when required for business reasons, in another office/work location/visiting stakeholders. Your designated workplace will be your contractual place of work. There may be occasions where you are required to attend above the minimum expectation.\n\nIf you have a question about hybrid working, part time/job share hours, flexible working, travelling for work, or require a reasonable adjustment, please contact the Vacancy Holder during the recruitment process to avoid possible disappointment later in the process should your working arrangements not be compatible with the requirements of the role (see below for contact details).\n\nVisa Sponsorship\n\nPlease note that we do not hold a UK Visa & Immigration (UKVI) Skilled Worker Licence sponsor and are unable to sponsor any individuals for Skilled Worker Sponsorship. Candidates must ensure they have the appropriate rights to work in the UK before application.',
  applyDetail: "How to apply:\n\nOur selection process ensures a comprehensive assessment of each applicant's qualifications, skills, and potential fit within our organisation.\n\nThe selection process for this role will be:\nStage 1: Sift of CV and personal statement\nStage 2: Interview\n\nStage 1: Sift\n\nAt sift, you will be assessed against the following Success Profile elements:\n\n* Experience – you will be asked to provide a CV (unlimited wordcount) and personal statement (750-word count). Further details around what this will entail are listed on the application form. Please provide evidence of your Experience of the following:\n* Experience in developing and delivering complex policy, ensuring alignment with departmental objectives and contributing to effective outcomes.\n* Experience working in a fast-paced, high-profile environment and managing competing priorities.\n* Experience in building and maintaining effective relationships with industry and cross-government stakeholders, fostering collaboration and driving shared goals.\n* Experience in supporting the development and scrutiny of legislation, including drafting briefing materials.\n\nThe sift will take place on 8th & 9th December 2025.\n\nStage 2: Interview\n\nAt interview stage, you will be assessed against the following Success Profile elements:\n* Behaviours – Communicating & Influencing, Delivering at Pace, Making Effective Decisions and Working Together.\n* Strengths\n\nThe interviews will take place week commencing 12th January 2026.\nThis interview will be conducted online via Microsoft Teams. Further details will be provided to you should you be selected for interview.\n\nYou can find out more about our hiring process, how to apply, and application and interview guidance on our careers site (opens in a new window).\nPlease note that we will try to meet the dates set out in the advert. There may be occasions when these dates will change.\n\nFurther information on the selection process\n\nWe will also hold a 12-month reserve list for this role, which may lead to potential opportunities beyond the role you applied for. You can read more about our reserve lists here.\n\nDuring your application, you should indicate which location(s) you wish to be considered for and, if successful, you will be placed on an individual list of candidates for each location. Candidates will be held on that list and drawn from it in merit order. We advise you to carefully consider which locations you wish to be considered for. If you decline an offer for a location you have expressed a preference in or have expressed an interest in more than one location and accept an offer, you will be withdrawn from any lists you may be held on. We may also offer candidates a location that they have not expressed a preference for where we have the requirement to do so but this will again be done on the basis of your place in the overall merit order and, in this event, you will not be removed from the list if you decline.\n\nAI Tools and Platforms\n\nArtificial Intelligence can be a useful tool to support your application, however, all examples and statements provided must be truthful, factually accurate and taken directly from your own experience. Where plagiarism has been identified (presenting the ideas and experiences of others, or generated by artificial intelligence, as your own) applications may be withdrawn and internal candidates may be subject to disciplinary action. Please see our candidate guidance for more information on appropriate and inappropriate use - Artificial intelligence and recruitment , Civil Service Careers\n\nReasonable Adjustments\n\nAs a Disability Confident Leader employer, we are committed to ensuring that the recruitment process is fair, accessible and allows all candidates to perform at their best. If a person with a visible or non-visible disability is substantially disadvantaged, we have a duty to make reasonable changes to our processes.\n\nComplete the “Assistance required” section in the “Additional requirements” page of your application form to tell us what changes or help you might need during the recruitment process. For instance, you may need wheelchair access at an interview, or if you’re deaf, a Language Service Professional.\n\nIf you need a reasonable adjustment so that you can complete your application, you should contact Government Recruitment Service via dftrecruitment.grs@cabinetoffice.gov.uk as soon as possible before the closing date to discuss your needs.\n\nDocument Accessibility\n\nIf you are experiencing accessibility problems with any attachments on this advert, please contact the email address in the 'Contact point for applicants' section.\nThis job advert contains links to the DfT Careers website. Our website provides useful guidance and information that can support you during the application process. If you cannot access the information on our website for any reason, please email DRGComms@dft.gov.uk for assistance.\n\nFurther Information\n\nFor more information about how we hire, and for useful tips on submitting your application for this role, visit the How We Hire page of our DfT Careers website. You can find detailed information about the recruitment process and what to expect when applying for a role.\n\nPre-employment Checking\n\nApplicants who are successful at interview will be, as part of pre-employment screening, subject to a check on the Internal Fraud Database (IFD). This check will provide information about employees who have been dismissed for fraud or dishonesty offences. This check also applies to employees who resign or otherwise leave before being dismissed for fraud or dishonesty had their employment continued. Any applicant’s details held on the IFD will be refused employment.\nA candidate is not eligible to apply for a role within the Civil Service if the application is made within a 5-year period following a dismissal for carrying out internal fraud against government.\n\nFeedback\n\nFeedback will only be provided if you attend an interview or assessment.",
  profession: 'Policy',
  assignmentType: 'Permanent',
  eligibilityCheck: 'People working with government assets must complete baseline personnel security standard (opens in new window) checks.',
  grade: 'Senior Executive Officer',
  workingForTheCivilService: "The Civil Service Code (opens in a new window) sets out the standards of behaviour expected of civil servants.\n\nWe recruit by merit on the basis of fair and open competition, as outlined in the Civil Service Commission's recruitment principles (opens in a new window).",
  disabilityConfident: "The Civil Service embraces diversity and promotes equal opportunities. As such, we run a Disability Confident Scheme (DCS) for candidates with disabilities who meet the minimum selection criteria.",
  diversityStatement: "The Civil Service is committed to attract, retain and invest in talent wherever it is found. To learn more please see the Civil Service People Plan (opens in a new window) and the Civil Service Diversity and Inclusion Strategy (opens in a new window).",
  jobNumbers: 4,
  summary: "Can you work in a fast-paced, high-profile environment?\nDo you have the ability to build trusting relationships with stakeholders across government and industry?\nHave you got experience in supporting the development and scrutiny of legislation, including drafting briefing materials?\n\nIf so, we’d love to hear from you!\n\nTransforming Britain’s railways is the centrepiece of the government’s transport agenda. We’re committed to putting passengers at the heart of the service by bringing passenger services into public ownership and establishing Great British Railways (GBR), a new body that will focus on reliable, affordable, high-quality, and efficient services; along with ensuring safety and accessibility.\n\nIt is an exciting time to join the Rail Reform Directorate, as we deliver the most significant transformation of the railways in decades and help shape the future of the UK’s transport network. With momentum building ahead of the introduction of primary legislation, and strong interest from industry and political stakeholders, this role is ideal for a proactive self-starter who thrives in fast paced, dynamic environments. You will have the opportunity to build effective partnerships across the sector and play a key role in delivering major reforms that will define the next era of rail travel.\n\nJoining our department comes with many benefits, including:\n\n* Employer pension contribution of 28.97% of your salary. Read more about Civil Service Pensions here\n* 25 days annual leave, increasing by 1 day each year of service (up to a maximum of 30 days annual leave), plus 8 bank holidays a privilege day for the King’s birthday\n* Flexible working options where we encourage a great work-life balance.\n\nRead more in the Benefits section below!\nFind out more about what it's like working at Department for Transport Central - Department for Transport Careers",
  description: "We are looking for two Senior Policy Advisors to join the Rail Sector Accountability Division. The roles offer an opportunity to be a key part of delivering the biggest reform in rail in a generation.\n\nThese roles will drive the development and implementation of the GBR licence and establish reformed rail sector accountabilities in legislation. You will be at the heart of shaping the GBR licence, influencing how GBR is governed and held to account and supporting Ministers in the passage of the Railways Bill. The roles will be crosscutting in nature and will require the successful candidates to be able to work strategically across interconnected issues. This will include policy development of the licence as well as the wider regulatory strategy, and the ORR’s overarching institutional role in the reformed system.\n\nThe successful candidates will also require strong relationship-building skills to be able to work effectively with colleagues, leveraging the expertise of others to develop coherent and deliverable policy solutions that ensure GBR is able to deliver on its objectives, within a clear accountability framework.\n\nThe responsibilities of the role will include:\n\n* On the GBR licence: Driving forward policy development of the GBR licence, a central pillar of rail reform, ensuring that its contents reflects and supports the wider transformation agenda.\n* Translating complex policy into a clear, authoritative GBR licence document, working with stakeholders across and beyond government to ensure it is coherent and ready for a public consultation.\n* Building trusted relationships with industry, to inform policy and ensure that the GBR licence is developed and implemented in time for GBR’s creation.\n* On the broader statutory accountabilities: Ownership of wider legislative provisions in the Railways Bill relating to rail sector accountabilities, including GBR’s statutory functions, duties, GBR’s licence, directions and guidance and the role of the ORR.\n* Supporting Ministers through the passage of the Bill including drafting high-quality materials, coordinating responses, and advising ministers on policy matters at pace.\n* Building trusted relationships with stakeholders across government and industry to support policy development and the passage of the Bill in line with the Government’s vision for rail reform.\n\nFor further information on the role, please read the role profile. Please note that the role profile is for information purposes only - whilst all elements are relevant to the role, they may not all be assessed during the recruitment process. This job advert will detail exactly what will be assessed during the recruitment process.",
  location: [
    {
      paoText: undefined,
      saoText: undefined,
      streetDescription: undefined,
      locality: undefined,
      townName: 'Birmingham',
      postTown: 'Birmingham',
      postcode: 'B1 1AA',
      latitude: 52.4862,
      longitude: -1.8904,
      formattedAddress: 'Birmingham, B1 1AA'
    },
    {
      paoText: undefined,
      saoText: undefined,
      streetDescription: undefined,
      locality: undefined,
      townName: 'Leeds',
      postTown: 'Leeds',
      postcode: 'LS1 1UR',
      latitude: 53.7997,
      longitude: -1.5492,
      formattedAddress: 'Leeds, LS1 1UR'
    },
    {
      paoText: undefined,
      saoText: undefined,
      streetDescription: undefined,
      locality: undefined,
      townName: 'London',
      postTown: 'London',
      postcode: 'SW1A 2AA',
      latitude: 51.5074,
      longitude: -0.1278,
      formattedAddress: 'London, SW1A 2AA'
    }
  ],
  veteranScheme: 'This vacancy is part of the Great Place to Work for Veterans (opens in a new window) initiative.',
  prisonScheme: 'The Civil Service welcomes applications from people who have recently left prison or have an unspent conviction. Read more about prison leaver recruitment (opens in new window).',
  redeploymentScheme: 'The Civil Service also offers a Redeployment Interview Scheme to civil servants who are at risk of redundancy, and who meet the minimum requirements for the advertised vacancy.',
  nationalityRequirement: 'This job is broadly open to the following groups:\n\n* UK nationals\n* nationals of the Republic of Ireland\n* nationals of Commonwealth countries who have the right to work in the UK\n* nationals of the EU, Switzerland, Norway, Iceland or Liechtenstein and family members of those nationalities with settled or pre-settled status under the European Union Settlement Scheme (EUSS) (https://www.gov.uk/settled-status-eu-citizens-families)\n* nationals of the EU, Switzerland, Norway, Iceland or Liechtenstein and family members of those nationalities who have made a valid application for settled or pre-settled status under the European Union Settlement Scheme (EUSS)\n* individuals with limited leave to remain or indefinite leave to remain who were eligible to apply for EUSS on or before 31 December 2020\n* Turkish nationals, and certain family members of Turkish nationals, who have accrued the right to work in the Civil Service\n\nFurther information on nationality requirements (https://www.gov.uk/government/publications/nationality-rules)',
  organisation: 'Department for Transport', 
  id: 'vx-438276', title: 'Senior Policy Advisors Rail Licensing and Accountabilities', 
  salary: '£44,241', 
  complaintsInfo: 'If you feel your application has not been treated in accordance with the Recruitment Principles and you wish to make a complaint, in the first instance, you should contact Government Recruitment Services via email: dftrecruitment.grs@cabinetoffice.gov.uk \n\nIf you are not satisfied with the response you receive from the Department, you can contact the Civil Service Commission: Visit the Civil Service Commission website Here',
  criminalRecordCheck: 'Successful candidates must undergo a criminal record check.',
  closingDate: '11:55 pm on Sunday 7th December 2025', 
  benefits: 'Alongside your salary of £44,241, Department for Transport contributes £12,816 towards you being a member of the Civil Service Defined Benefit Pension scheme. Find out what benefits a Civil Service Pension provides.\n\nBeing part of our brilliant Civil Service means you will have access to a wide range of fantastic benefits:\n\n* Employer pension contribution of 28.97% of your salary. Read more about Civil Service Pensions here\n* 25 days annual leave, increasing by 1 day each year of service (up to a maximum of 30 days annual leave).\n* 8 Bank Holidays plus an additional Privilege Day to mark the King’s birthday.\n* Access to the staff discount portal.\n* Excellent career development opportunities and the potential to undertake professional qualifications relevant to your role paid for by the department, such as CIPD, Prince2, apprenticeships, etc.\n* Joining a diverse and inclusive workforce with a range of staff communities to support all our colleagues.\n* 24-hour Employee Assistance Programme providing free confidential help and advice for staff.\n* Flexible working options where we encourage a great work-life balance.\n\nFind out more about the benefits of working at DfT and its agencies (opens in a new window).',
  attachments: [
    {
      href: 'https://files.civilservicejobs.service.gov.uk/admin/fairs/apptrack/download.cgi?SID=b3duZXI9NTA3MDAwMCZvd25lcnR5cGU9ZmFpciZkb2NfdHlwZT12YWMmZG9jX2lkPTEyNzMyODQmdmVyaWZ5PWZiZGMyMjkyYmY3Yjk2YWIxZTYxYzNiOWM4NGUwOWVmJnJlcXNpZz0xNzY0NTg0MzA5LTdlYjI0ODhkMTk0YmZhZjQ5MjZlOGQwOTMyOTI5ZjcxOGQ5MjFkNDM=',
      docName: 'Role Profile',
      docFormat: 'pdf',
      fileSize: '170 kb'
    }
  ]
},

{ personalSpec: 'Some personal specification text',
  contacts: false,
  applyDetail: 'Some application detail text',
  recruitmentEmail: 'recruitment@civilservice.gov.uk',
  assignmentType: 'Permanent', 
  grade: 'Grade 6', 
  description: 'This is a fantastic job for a ...', 
  location: [{
    saoText: undefined,
    paoText: '2 Horse Guards',
    streetDescription: 'Whitehall',
    locality: undefined,
    townName: 'London',
    postTown: 'London',
    postcode: 'SW1A 2AX',
    latitude: 51.5045,
    longitude: -0.1276,
    formattedAddress: '2 Horse Guards, Whitehall, London, SW1A 2AX'
  }],
  organisation: 'College of Policing', 
  id: '9488', 
  title: 'Police Service - Volunteer Curator', 
  closingDate: '20 December 2025' },
{ personalSpec: 'Some personal specification text',
  contacts: false,
  applyDetail: 'Some application detail text',
  recruitmentEmail: 'recruitment@civilservice.gov.uk',
  assignmentType: 'Fixed Term Appointment (FTA)',
  grade: 'Senior Executive Office', 
  description: 'This is a fantastic job for a ...', 
  location: [{
    saoText: undefined,
    paoText: '2 Horse Guards',
    streetDescription: 'Whitehall',
    locality: undefined,
    townName: 'London',
    postTown: 'London',
    postcode: 'SW1A 2AX',
    latitude: 51.5045,
    longitude: -0.1276,
    formattedAddress: '2 Horse Guards, Whitehall, London, SW1A 2AX'
  }],
  organisation: 'Home Office', id: '9487', 
  title: 'Project Manager', 
  salary: '£39,000 to £46,200', 
  closingDate: '20 December 2025' 
},
{ personalSpec: 'Some personal specification text',
  contacts: false,
  applyDetail: 'Some application detail text',
  recruitmentEmail: 'recruitment@civilservice.gov.uk',
  assignmentType: 'Apprenticeship', 
  grade: 'Higher Executive Office', 
  description: 'This is a fantastic job for a ...', 
  location: [{
    saoText: undefined,
    paoText: undefined,
    streetDescription: 'Benton Park Road',
    locality: undefined,
    townName: 'Newcastle upon Tyne',
    postTown: 'Newcastle upon Tyne',
    postcode: 'NE7 7LX',
    latitude: 54.9981,
    longitude: -1.5945,
    formattedAddress: 'Benton Park Road, Newcastle upon Tyne, NE7 7LX'
  }],
  organisation: 'HM Revenue and Customs', 
  id: '9489', title: 'Dentist', 
  closingDate: '5 January 2026', 
  salary: '£99,000' 
},
{
  personalSpec: 'Experience in international project management and cross-cultural communication required.',
  contacts: true,
  contactName: 'Maria Gomez',
  contactEmail: 'maria.gomez@fco.gov.uk',
  recruitmentEmail: 'recruitment@fco.gov.uk',
  assignmentType: 'Permanent',
  grade: 'Grade 7',
  jobNumbers: 1,
  description: 'Lead diplomatic initiatives and manage embassy operations in Madrid.',
  location: [
    {
      countryName: 'Spain',
      countryCode: 'ES',
      locationDisplay: 'British Embassy, Madrid'
    }
  ],
  organisation: 'Foreign, Commonwealth & Development Office',
  id: 'es-emb-001',
  title: 'Embassy Operations Manager',
  salary: '€60,000',
  closingDate: '31 January 2026',
  applyDetail: 'Apply via the FCDO careers portal. Interviews will be held virtually.',
  summary: 'An exciting opportunity to manage embassy operations and support UK interests in Spain.',
  benefits: 'Competitive salary, relocation support, and diplomatic status.',
  diversityStatement: 'We welcome applications from all backgrounds and nationalities.',
  disabilityConfident: 'We are a Disability Confident employer.',
  attachments: [
    {
      href: 'https://example.com/job-profile-embassy-ops.pdf',
      docName: 'Job Profile',
      docFormat: 'pdf',
      fileSize: '120 kb'
    }
  ]
},
{
  personalSpec: 'Strong analytical skills required.',
  contacts: false,
  applyDetail: 'Apply online.',
  recruitmentEmail: 'recruitment@hmrc.gov.uk',
  assignmentType: 'Permanent',
  grade: 'Grade 6',
  jobNumbers: 2,
  description: 'Work on tax policy analysis.',
  location: [{
    paoText: '100 Parliament Street',
    townName: 'London',
    postTown: 'London',
    postcode: 'SW1A 2BQ',
    formattedAddress: '100 Parliament Street, London, SW1A 2BQ'
  }],
  organisation: 'HM Revenue & Customs',
  id: 'hmrc-100',
  title: 'Tax Policy Analyst',
  salary: '£52,000',
  closingDate: '10 January 2026'
},
{
  personalSpec: 'Experience in digital transformation.',
  contacts: true,
  contactName: 'John Smith',
  contactEmail: 'john.smith@cabinetoffice.gov.uk',
  recruitmentEmail: 'jobs@cabinetoffice.gov.uk',
  assignmentType: 'Fixed Term',
  grade: 'Grade 7',
  jobNumbers: 1,
  description: 'Lead digital projects for government.',
  location: [{
    paoText: '70 Whitehall',
    townName: 'London',
    postTown: 'London',
    postcode: 'SW1A 2AS',
    formattedAddress: '70 Whitehall, London, SW1A 2AS'
  }],
  organisation: 'Cabinet Office',
  id: 'cab-70',
  title: 'Digital Transformation Lead',
  salary: '£60,000',
  closingDate: '15 January 2026',
  applyDetail: ""
},
{
  personalSpec: 'Excellent communication skills.',
  contacts: false,
  applyDetail: 'Submit CV and cover letter.',
  recruitmentEmail: 'recruitment@mod.gov.uk',
  assignmentType: 'Permanent',
  grade: 'Grade 7',
  jobNumbers: 1,
  description: 'Support defence communications.',
  location: [{
    paoText: 'MOD Main Building',
    townName: 'London',
    postTown: 'London',
    postcode: 'SW1A 2HB',
    formattedAddress: 'MOD Main Building, London, SW1A 2HB'
  }],
  organisation: 'Ministry of Defence',
  id: 'mod-001',
  title: 'Communications Officer',
  salary: '£48,000',
  closingDate: '20 January 2026'
},
{
  personalSpec: 'Project management experience.',
  contacts: true,
  contactName: 'Sarah Lee',
  contactEmail: 'sarah.lee@homeoffice.gov.uk',
  recruitmentEmail: 'jobs@homeoffice.gov.uk',
  assignmentType: 'Permanent',
  grade: 'SEO',
  jobNumbers: 1,
  description: 'Manage security projects.',
  location: [{
    paoText: '2 Marsham Street',
    townName: 'London',
    postTown: 'London',
    postcode: 'SW1P 4DF',
    formattedAddress: '2 Marsham Street, London, SW1P 4DF'
  }],
  organisation: 'Home Office',
  id: 'ho-002',
  title: 'Security Project Manager',
  salary: '£55,000',
  closingDate: '25 January 2026',
  applyDetail: ""
},
{
  personalSpec: 'Experience in international relations.',
  contacts: true,
  contactName: 'Pierre Dubois',
  contactEmail: 'pierre.dubois@fco.gov.uk',
  recruitmentEmail: 'recruitment@fco.gov.uk',
  assignmentType: 'Permanent',
  grade: 'Grade 7',
  jobNumbers: 1,
  description: 'Support diplomatic missions in Paris.',
  location: [{
    countryName: 'France',
    countryCode: 'FR',
    locationDisplay: 'British Embassy, Paris'
  }],
  organisation: 'Foreign, Commonwealth & Development Office',
  id: 'fco-paris',
  title: 'Diplomatic Support Officer',
  salary: '€58,000',
  closingDate: '30 January 2026',
  applyDetail: ""
},
{
  personalSpec: 'Legal background preferred.',
  contacts: false,
  applyDetail: 'Apply via portal.',
  recruitmentEmail: 'recruitment@justice.gov.uk',
  assignmentType: 'Permanent',
  grade: 'Grade 6',
  jobNumbers: 1,
  description: 'Advise on legal matters.',
  location: [{
    paoText: '102 Petty France',
    townName: 'London',
    postTown: 'London',
    postcode: 'SW1H 9AJ',
    formattedAddress: '102 Petty France, London, SW1H 9AJ'
  }],
  organisation: 'Ministry of Justice',
  id: 'moj-102',
  title: 'Legal Advisor',
  salary: '£58,000',
  closingDate: '5 February 2026'
},
{
  personalSpec: 'Experience in education policy.',
  contacts: true,
  contactName: 'Emily Clark',
  contactEmail: 'emily.clark@education.gov.uk',
  recruitmentEmail: 'jobs@education.gov.uk',
  assignmentType: 'Fixed Term',
  grade: 'Grade 7',
  jobNumbers: 1,
  description: 'Develop education policy.',
  location: [{
    paoText: 'Sanctuary Buildings',
    townName: 'London',
    postTown: 'London',
    postcode: 'SW1P 3BT',
    formattedAddress: 'Sanctuary Buildings, London, SW1P 3BT'
  }],
  organisation: 'Department for Education',
  id: 'dfe-001',
  title: 'Education Policy Advisor',
  salary: '£50,000',
  closingDate: '10 February 2026',
  applyDetail: ""
},
{
  personalSpec: 'Experience in healthcare management.',
  contacts: false,
  applyDetail: 'Apply online.',
  recruitmentEmail: 'jobs@nhs.uk',
  assignmentType: 'Permanent',
  grade: 'Band 8a',
  jobNumbers: 1,
  description: 'Manage hospital operations.',
  location: [{
    paoText: 'St Thomas Hospital',
    townName: 'London',
    postTown: 'London',
    postcode: 'SE1 7EH',
    formattedAddress: 'St Thomas Hospital, London, SE1 7EH'
  }],
  organisation: 'NHS England',
  id: 'nhs-001',
  title: 'Hospital Operations Manager',
  salary: '£62,000',
  closingDate: '15 February 2026'
},
{
  personalSpec: 'Experience in transport planning.',
  contacts: true,
  contactName: 'Tom Evans',
  contactEmail: 'tom.evans@dft.gov.uk',
  recruitmentEmail: 'jobs@dft.gov.uk',
  assignmentType: 'Permanent',
  grade: 'SEO',
  jobNumbers: 1,
  description: 'Plan transport infrastructure.',
  location: [{
    paoText: 'Great Minster House',
    townName: 'London',
    postTown: 'London',
    postcode: 'SW1P 4DR',
    formattedAddress: 'Great Minster House, London, SW1P 4DR'
  }],
  organisation: 'Department for Transport',
  id: 'dft-002',
  title: 'Transport Planner',
  salary: '£54,000',
  closingDate: '20 February 2026',
  applyDetail: ""
},
{
  personalSpec: 'Experience in overseas development.',
  contacts: true,
  contactName: 'Aisha Khan',
  contactEmail: 'aisha.khan@fco.gov.uk',
  recruitmentEmail: 'recruitment@fco.gov.uk',
  assignmentType: 'Permanent',
  grade: 'Grade 7',
  jobNumbers: 1,
  description: 'Support development projects in Kenya.',
  location: [{
    countryName: 'Kenya',
    countryCode: 'KE',
    locationDisplay: 'British High Commission, Nairobi'
  }],
  organisation: 'Foreign, Commonwealth & Development Office',
  id: 'fco-kenya',
  title: 'Development Project Officer',
  salary: 'KES 3,000,000',
  closingDate: '28 February 2026',
  applyDetail: ""
}
]

export { jobs };
