import {
  appDesignData,
  dashboardsData,
  landingPagesData,
  projectsData,
} from './projects';
import {
  Boxes,
  Code2,
  GitCompareArrows,
  LayoutDashboard,
  Mail,
  Rocket,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { vibeSites } from './vibeSites';

export interface SectionMeta {
  section: string;
  label: string;
  path: string;
  blurb: string;
  count: number;
  preview: string[];
  icon: LucideIcon;
}

/**
 * Counts are derived from the data itself, never typed by hand — so a figure on
 * the home page can't drift out of sync with what's actually in the portfolio.
 */
export const sections: SectionMeta[] = [
  {
    section: 'saas',
    icon: Boxes,
    label: 'SaaS',
    path: '/saas',
    blurb:
      'Long-run platform work: project management, research tooling, operations. Where design systems earn their keep.',
    count: projectsData.length,
    preview: ['/drive1.webp', '/revexia1.webp', '/Flowcite-1.webp'],
  },
  {
    section: 'appdesign',
    icon: Smartphone,
    label: 'App Design',
    path: '/appdesign',
    blurb:
      'Mobile and tablet products built for real conditions, from a factory floor to a gym to a clinic intake desk.',
    count: appDesignData.length,
    preview: ['/TMS-1.webp', '/mindcare1.png', '/Studylity1.webp'],
  },
  {
    section: 'dashboards',
    icon: LayoutDashboard,
    label: 'Dashboards',
    path: '/dashboards',
    blurb:
      'High information density without visual noise. Monochrome foundation, colour reserved for anomalies.',
    count: dashboardsData.length,
    preview: ['/dashboard1.webp', '/dashboard2.webp', '/dashboard3.webp'],
  },
  {
    section: 'landing',
    icon: Rocket,
    label: 'Landing Pages',
    path: '/landing',
    blurb:
      'Single-purpose pages that have to earn a decision. Crypto, fintech, retail, fashion, personal brand.',
    count: landingPagesData.length,
    preview: ['/CapitalCoin.png', '/Prospera.webp', '/SilkRoute.webp'],
  },
  {
    section: 'vibecode',
    icon: Code2,
    label: 'Vibe Code',
    path: '/vibecode',
    blurb:
      'Shipped and live. A designer directing code rather than generating it, in HTML, CSS and Canvas.',
    count: vibeSites.length,
    preview: ['/vibe/noma.png', '/vibe/argos.png', '/vibe/Edge.png'],
  },
];

/**
 * Email Templates are concepts, not portfolio projects, so they stay out of
 * `sections` and out of the project totals. They are still numbered in the
 * menu, directly before Vibe Code.
 */
const emailTemplatesNav = {
  section: 'email-templates',
  icon: Mail,
  label: 'Email Templates',
  path: '/email-templates',
};

const vibeCodeAt = sections.findIndex((s) => s.section === 'vibecode');

/** The numbered menu, in display order. */
export const menuItems = [
  ...sections.slice(0, vibeCodeAt),
  emailTemplatesNav,
  ...sections.slice(vibeCodeAt),
];

/** A page's number in the menu (1-based), so page eyebrows match the rail. */
export const menuNumber = (section: string) =>
  menuItems.findIndex((item) => item.section === section) + 1;

/**
 * Process pages, deliberately NOT in `sections` or the numbered menu. Putting
 * one there would fold a process page into the project figure and quietly make
 * that number a lie.
 */
export const utilityNav = [
  {
    section: 'handoff',
    icon: GitCompareArrows,
    label: 'Design → Dev',
    path: '/handoff',
  },
];

export const totals = {
  projects: sections.reduce((sum, s) => sum + s.count, 0),
  areas: sections.length,
};
