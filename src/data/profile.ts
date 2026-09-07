/**
 * Profile data, lifted out of ProfileDrawer so there is one place to edit it.
 *
 * The experience list is transcribed verbatim from the LinkedIn profile the owner
 * supplied. Descriptions are his words, not edited or summarised — this is a
 * factual record of someone's career, so nothing here is paraphrased, inferred or
 * filled in to look complete. Where LinkedIn showed nothing, this shows nothing.
 */

export type Role = {
  role: string;
  company: string;
  /** Full-time · Part-time · Contract · Seasonal. Omitted where LinkedIn shows none. */
  employment?: string;
  period: string;
  location: string;
  /** Remote · Hybrid. */
  arrangement?: string;
  description?: string;
};

export const identity = {
  name: 'Md Ashrafur Rahman Tanveer',
  shortName: 'AR Tanveer',
  title: 'Sr. Product Designer',
  location: 'Dhaka, Bangladesh',
  linkedin: 'https://www.linkedin.com/in/artanveer/',
  github: 'https://github.com/fltanveer',
  upwork: 'https://www.upwork.com/freelancers/~01e721b548af79f7c9?mp_source=share',
  avatar: '/up.webp',
};

export const about =
  'I help founders, startups, and growing companies turn ideas and outdated systems ' +
  'into polished, high-performing digital products. From SaaS platforms to mobile ' +
  'apps and landing pages. I bridge the gap between design and real product thinking.';

export const experience: Role[] = [
  {
    role: 'Co-Founder',
    company: 'Ambitionix',
    period: 'Mar 2025 - Present',
    location: 'Bangladesh',
    description:
      'Co-Founder at Ambitionix, a self-funded technology company focused on building purposeful digital products that solve real-world problems.\n\n' +
      'Our goal is to transform promising ideas into practical, user-centred applications that make everyday tasks simpler, smarter, and more accessible. Study Found is one of our initiatives, created to simplify the study-abroad journey for aspiring students.',
  },
  {
    role: 'User Experience Consultant',
    company: 'Nasir Syntax Solution Limited',
    employment: 'Part-time',
    period: 'Aug 2024 - Present',
    location: 'Dhaka, Bangladesh',
    arrangement: 'Hybrid',
    description:
      'Driven by a passion for UI innovation and architectural ideation, I lead teams to design intuitive, scalable digital solutions. With a focus on collaborative ideation and strategic frameworks, I transform creative concepts into seamless, engaging user experiences that align with business goals and future growth.',
  },
  {
    role: 'Senior Product Designer',
    company: 'budgetnow',
    employment: 'Full-time',
    period: 'Dec 2023 - Jan 2026',
    location: 'Florida, United States',
    arrangement: 'Remote',
  },
  {
    role: 'Product Designer',
    company: 'Thrive Alternatives',
    employment: 'Contract',
    period: 'Dec 2022 - Nov 2023',
    location: 'Singapore',
    arrangement: 'Remote',
    description:
      "Thrive Alternative is an Asian-headquartered GP advisory and placement firm powered by proprietary technology that helps people navigate the complexities and opportunities of today's global private capital markets with a strong edge in Asia.\n\n" +
      'My responsibilities during the journey:\n\n' +
      'Develop and Execute Design Strategies:\n' +
      '- Align design vision with the product vision and business goals.\n' +
      '- Ensure the design strategies contribute to a positive user experience.\n\n' +
      'User-Centric Research:\n' +
      '- Conduct user-centric research to inform and guide the design process.\n' +
      '- Utilize research findings to create products that meet user needs.\n\n' +
      'Wireframes, Prototypes, and Mockups:\n' +
      '- Craft user-friendly wireframes, prototypes, and mockups.\n' +
      '- Prioritize the creation of design artifacts that facilitate seamless interactions.\n\n' +
      'Collaboration with Cross-Functional Teams:\n' +
      '- Collaborate with cross-functional teams to ensure designs are feasible and aligned with project goals.\n' +
      '- Foster effective communication and cooperation among team members.\n\n' +
      'Adaptation to Changing Needs:\n' +
      '- Adapt design approach based on evolving user and market needs.\n' +
      '- Stay current with industry trends and integrate insights into design strategies.\n\n' +
      'Design System Leadership:\n' +
      '- Lead the development of a design system for consistent visuals and interactions.\n' +
      '- Ensure the design system is effectively implemented across projects.',
  },
  {
    role: 'UX/UI and Web Designer',
    company: 'Workspace Infotech Limited',
    employment: 'Full-time',
    period: 'Jun 2012 - Nov 2022',
    location: 'Bangladesh',
    description:
      'Workspace Infotech Ltd. is a Dhaka-based software company with wide range of international clients.\n' +
      '- Researched and Identified problems through stakeholder talks and user research on demand to make sure what exactly user needs\n' +
      // NOTE: "0% time saving" is transcribed exactly as it reads on LinkedIn. It
      // looks like a typo for a real figure — worth correcting at the source.
      '- Maintained design system that ensured smooth work processes for designers and developers, and that resulted in a 0% time saving\n' +
      '- Co-ordinated with marketing team to increase conversion rate by 25%\n' +
      '- Managed 4 member design team to plan and implement product roadmap that helped more than 10 MVP product owners',
  },
  {
    role: 'UX Consultant',
    company: 'Galaxy Bangladesh',
    employment: 'Contract',
    period: 'May 2022 - Sep 2022',
    location: 'Dhaka, Bangladesh',
    description:
      'Galaxy Group is a high value company with decades of experience in aviation and transportation related services.\n' +
      '- Worked on BlueSky, a B2B portal that is intended for more than 100 travel agencies nationwide\n' +
      '- The product was scaled to transition at any point to a B2C offering\n' +
      '- Proposed a fresh concept for preparing data so agents can provide it to customers in a ready-to-use state and improve customer service by 20%',
  },
  {
    role: 'UX Consultant',
    company: 'Bitspeck Solutions',
    employment: 'Seasonal',
    period: 'Aug 2021 - Jan 2022',
    location: 'Bangladesh',
    description:
      'BitSpeck is a startup company with vision for creating template for theme forest and template monster.\n' +
      '- Brainstormed with 5 Talented designers and crafted multiple web and PSD Templates\n' +
      '- Generated UI ideas with proper market research and increased ideation rate by 30%\n' +
      '- Introduced scalable web design with SCSS which helped them to create templates 2x faster.',
  },
  {
    role: 'Instructor',
    company: 'ICT Division',
    employment: 'Contract',
    period: 'Sep 2019 - Jan 2020',
    location: 'Bangladesh',
    description:
      'Worked as a UX & UI Design trainer for Advanced Game and App Development training program. Trained a group of people and Collaborate with the dev team and create two apps with proper UX Strategy.',
  },
];

/**
 * Derived from the earliest role in the list above rather than typed, so it can
 * never quietly go stale. Jun 2012, Workspace Infotech.
 *
 * Worth knowing: the owner's own written bio still says "12+ years". That was
 * true when he wrote it. The data says otherwise now, and the data wins.
 */
const firstYear = Math.min(
  ...experience.map((r) => Number(/(\d{4})/.exec(r.period)?.[1] ?? '9999')),
);
export const yearsDesigning = new Date().getFullYear() - firstYear;

/**
 * His figure, career-wide, and not derivable from anything in this repo — this
 * portfolio shows a curated subset. Kept separate from the portfolio count for
 * exactly that reason: one is a claim, the other is evidence.
 */
export const careerProjects = '120+';

export const education = [
  {
    school: 'Interaction Design Foundation',
    detail: 'UX Research · UI Design · Web Design',
    period: '2021 - Present',
  },
  // The public profile shows an earlier entry dated 2008–2012 with the institution
  // hidden. Left out entirely rather than shown as an unnamed school.
];

/** Dates read from the public certifications section. */
export const certifications = [
  { name: 'Design for the 21st Century with Don Norman', issuer: 'IDF', date: 'Jan 2022' },
  { name: 'Visual Design: The Ultimate Guide', issuer: 'IDF', date: 'Jan 2022' },
  { name: 'Google UX Design Process', issuer: 'Google', date: '2021' },
  { name: 'IDF Membership (ID: 116587)', issuer: 'IDF', date: 'Sep 2021' },
];

export const skills = [
  'Product Design',
  'SaaS Design',
  'Design Systems',
  'App Design',
  'Landing Pages',
  'Dashboards',
  'HTML',
  'CSS',
  'Canvas API',
  'Vibe Coding',
  'Figma',
  'Prototyping',
  'UX Research',
];

export const stats = [
  { figure: '2K+', label: 'Followers' },
  { figure: '500+', label: 'Connections' },
  { figure: '14', label: 'Recommendations' },
];
