/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Figma, Lightbulb, Link, Check, ChevronDown } from 'lucide-react';

// ─── Slug helper ────────────────────────────────────────────────────────────
const toSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// ─── Data ────────────────────────────────────────────────────────────────────
const projectsData = [
  {
    id: 1,
    title: "DRIVE",
    timeline: "11 Month",
    designSystem: "Material UI",
    category: "SaaS",
    figmaLink: "https://www.figma.com/design/lW8MjBDPIlM0IIEroyqKEN/Drive?node-id=0-11401&t=hRsUI3xTL3iUGU8p-1",
    images: ["/drive1.webp", "/drive2.webp", "/drive3.webp", "/drive4.webp", "/drive5.webp"],
    context: "DRIVE is a comprehensive project management dashboard tailored specifically for high-growth SaaS platforms. It centralizes task tracking, timeline visualization, and team resource allocation into one unified workspace.\n\nKey problems solved include fragmented communication channels, lack of high-level overview for C-Suite executives, and inefficient deadline tracking. The Material UI foundation allowed us to build an interface that feels instantly familiar while supporting complex data-heavy tables and rich interactive elements.\n\nThroughout the 11-month timeline, we specifically focused on ensuring the platform remained performant even when dealing with thousands of active project nodes simultaneously. We implemented virtualized lists and aggressive caching strategies to maintain sub-second interaction times."
  },
  {
    id: 4,
    title: "Revexia",
    timeline: "5 Month",
    designSystem: "Custom UI",
    category: "SaaS",
    figmaLink: "https://www.figma.com/design/b84FCZ0uBhk3BoyD8XxEUY/Revexia?node-id=0-1&t=bMJKzmEbeS0aYqao-1",
    images: ["/revexia1.webp", "/revexia2.webp", "/revexia3.webp", "/revexia4.webp"],
    context: "Revexia is a next-generation SaaS platform engineered to revolutionize how modern businesses manage, monitor, and scale their digital operations.\n\nThe primary challenge was designing a system capable of surfacing critical insights from massive data streams without overwhelming users. We crafted a bespoke UI system built around clarity and speed — every component was purpose-built to reduce decision fatigue and accelerate action.\n\nAcross 5 months, we shaped Revexia into a platform that feels both powerful and instinctive — from its intelligent dashboard to its deep customization layers — positioning it as a tool that grows smarter with every team that uses it."
  },
  {
    id: 2,
    title: "Flowcite",
    timeline: "5 Month",
    designSystem: "Custom UI",
    category: "SaaS / Productivity",
    figmaLink: "https://www.figma.com/design/ldwZE4FOlFGQ0fHpgpVoYE/Flowcite?node-id=0-1&t=mULJgITe43DVxDxe-1",
    images: ["/Flowcite-1.webp", "/Flowcite-2.webp", "/Flowcite-3.webp", "/Flowcite-4.webp"],
    context: "Flowcite is a cutting-edge SaaS productivity platform designed to streamline research workflows, citation management, and collaborative content creation for academic and professional teams.\n\nThe core challenge was synthesizing complex research pipelines into a clean, intuitive interface that doesn't overwhelm users with information. We built a fully custom design system to handle rich document previews, smart citation tagging, and real-time collaborative editing seamlessly.\n\nOver 5 months, the focus was on crafting a fast, distraction-free writing environment that intelligently connects sources, automates citation formatting, and keeps research organized — transforming how teams move from discovery to publication."
  },
  {
    id: 3,
    title: "DOME",
    timeline: "6 Month",
    designSystem: "Custom UI",
    category: "SaaS",
    figmaLink: "https://www.figma.com/design/qaj06cNC6Kgo3QgJ5ygKyH/Dome-Prototype?node-id=0-1&t=RB5hqIFm8sVqiHtr-1",
    images: ["/Dome1.webp", "/Dome2.webp", "/Dome3.webp"],
    context: "DOME is a powerful SaaS platform built to centralize and simplify enterprise-level operations management under one unified interface.\n\nThe design challenge was creating a system that could handle an enormous complexity of data and workflows while remaining approachable for teams of all technical levels. We developed a fully custom UI with a strong emphasis on spatial hierarchy and contextual navigation, ensuring users always know where they are and what actions are available.\n\nOver 6 months, we focused on building scalable design patterns that could grow with the platform — from onboarding flows to advanced analytics dashboards — delivering a cohesive and premium experience across every touchpoint."
  },
];

const appDesignData = [
  {
    id: 201,
    title: "TMS",
    timeline: "4 Month",
    designSystem: "Custom UI",
    category: "Logistics / Operations",
    figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=18-8132&t=92Su7LDNN0qikFsP-1",
    images: ["/TMS-1.webp", "/TMS-2.webp", "/TMS-3.webp"],
    context: "TMS (Transport Management System) is a powerful logistics operations platform designed to streamline fleet management, route planning, and cargo tracking for enterprise logistics teams.\n\nThe interface was built from the ground up with a custom design system optimized for data density without sacrificing clarity. Real-time shipment tracking, driver assignment workflows, and compliance reporting were key pillars of the UX.\n\nOver 4 months, we focused heavily on making complex operational data readable at a glance and ensuring the platform performs flawlessly under intense, time-sensitive conditions."
  },
  {
    id: 202,
    title: "Auto Inspect",
    timeline: "6 Month",
    designSystem: "Custom UI",
    category: "SaaS",
    figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=20-19757&t=92Su7LDNN0qikFsP-1",
    images: ["/Autoinspect1.png", "/Autoinspect2.png", "/AutoInspect3.png"],
    context: "Auto Inspect was built to revolutionize how quality assurance teams conduct their daily visual inspections and automated metrics reporting.\n\nThe challenge was moving away from legacy, paper-based workflows that often resulted in data loss and compliance issues. By building a custom UI completely from scratch, we tailored the interface specifically for tablet devices often used on the manufacturing floor.\n\nThe application features real-time photo capturing, instant defect highlighting powered by computer vision models, and single-click compliance report generation. The dark overarching theme reduces eye strain during long shifts in brightly lit industrial environments."
  },
  {
    id: 203,
    title: "Mind Care",
    timeline: "3 Month",
    designSystem: "Tailwind UI",
    category: "Healthcare",
    figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=8-5987&t=92Su7LDNN0qikFsP-1",
    images: ["/mindcare1.png", "/mindcare2.png", "/mindcare3.png", "/mindacare4.png"],
    context: "Mind Care provides a comprehensive, secure, and HIPAA-compliant suite of tele-health tools designed for modern psychiatric and therapeutic practitioners.\n\nWe utilized Tailwind UI to rapidly prototype and build a calming, accessible, and inclusive design system that prioritizes user comfort and trust. Features include secure end-to-end encrypted video conferencing, integrated digital prescribing, and robust patient mood tracking.\n\nOne of our primary focuses was reducing the cognitive load for both patients booking appointments and doctors managing their schedules. We simplified the intake process down from an average of 15 minutes completely analog to just under 3 minutes digitally."
  },
  {
    id: 204,
    title: "Muscle Locker",
    timeline: "4 Month",
    designSystem: "Tailwind CSS",
    category: "Fitness & Health",
    figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=80-12958&t=92Su7LDNN0qikFsP-1",
    images: ["/Muscle-locker1.png", "/Muscle-locker2.png", "/Muscle-locker3.png"],
    context: "Muscle Locker is a specialized fitness companion and progress tracking app designed for gym enthusiasts and professional trainers.\n\nThe core problem it tackles is the fragmented nature of workout logging and diet tracking. By combining both into a unified, high-octane visual interface, we made the act of logging daily fitness goals quick and engaging rather than a tedious chore.\n\nDuring development, we heavily focused on creating intuitive, touch-friendly interactions for logging sets between rests. The dark mode default aesthetic is tailored for bright gym environments, making the data pop and easy to read mid-workout."
  },
  {
    id: 205,
    title: "LDMA",
    timeline: "5 Month",
    designSystem: "Custom UI",
    category: "Corporate / Data",
    figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=8-14520&t=92Su7LDNN0qikFsP-1",
    images: ["/ldma1.png", "/ldma2.png", "/ldma3.png"],
    context: "LDMA is a forward-thinking corporate project focused on delivering streamlined data analysis and robust management tools.\n\nThe primary focus of this project was to handle highly complex data sets and present them in a visually digestible format for corporate decision-makers. We built an entirely custom UI from the ground up to support the specialized charting and reporting requirements.\n\nOver the course of 5 months, we focused on bringing high performance and elegant interactions to what would otherwise be a dense and administrative interface, making the experience both powerful and highly engaging."
  },
  {
    id: 206,
    title: "StudyLity",
    timeline: "3 Month",
    designSystem: "Custom UI",
    category: "EdTech",
    figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=18-12438&t=92Su7LDNN0qikFsP-1",
    images: ["/Studylity1.webp", "/Studylity2.webp", "/Studylity3.webp"],
    context: "StudyLity is a modern EdTech application designed to help students manage their study schedules, track progress, and stay motivated throughout their academic journey.\n\nThe design focuses on reducing overwhelm by breaking study goals into digestible, gamified tasks. Clear visual progress indicators and a clean, distraction-free interface keep students engaged without adding cognitive load.\n\nOver 3 months, we crafted an experience that balances structure with flexibility — giving students the tools they need to study smarter, not harder."
  },
];

const landingPagesData = [
  {
    id: 101, title: "Capital Coin", timeline: "2 Month", designSystem: "Framer Motion & Tailwind",
    category: "Crypto / Web3", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/CapitalCoin.png"],
    context: "Capital Coin is a high-converting, premium landing page designed for a next-generation cryptocurrency exchange platform.\n\nThe primary objective of this landing page was to establish immediate trust and authority while explaining complex Web3 concepts simply. We used dark, sophisticated color palettes mixed with neon energetic accents to align with modern crypto aesthetics.\n\nTechnically, the page was heavily optimized for scroll performance, utilizing Framer Motion to create silky smooth reveal animations as users discover the platform's trading features and security guarantees."
  },
  {
    id: 102, title: "Budget Now", timeline: "3 Weeks", designSystem: "Custom UI",
    category: "FinTech", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/BudgetNow.webp"],
    context: "Budget Now is a clean and modern personal finance landing page built to help users take control of their money with intuitive budgeting tools.\n\nThe design focuses on clarity and trust — essential factors for a financial product. The layout guides users through key features with a logical flow, ending with a strong call-to-action."
  },
  {
    id: 103, title: "Jeff Sutherland", timeline: "2 Weeks", designSystem: "Custom UI",
    category: "Personal Brand", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/JeffLanding.webp", "/JeffSutherland.webp"],
    context: "A personal branding landing page for Jeff Sutherland — a speaker, author, and the co-creator of Scrum.\n\nThis page was designed to convey authority and credibility at a glance. Clean typography and strong imagery communicate the subject's expertise, while a compelling hero section drives visitors toward booking and speaking inquiries."
  },
  {
    id: 104, title: "Kina Becha", timeline: "1 Month", designSystem: "Minimalist UI",
    category: "E-Commerce", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/KinaBecha.webp"],
    context: "Kina Becha is a vibrant Bengali e-commerce landing page concept focused on local product discovery and online shopping.\n\nThe design blends local cultural identity with modern e-commerce best practices, creating a familiar yet polished experience for the target audience."
  },
  {
    id: 105, title: "MaxShelf Retail", timeline: "3 Weeks", designSystem: "Retail UI",
    category: "Retail / POS", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/MaxShelf-Retail.webp"],
    context: "MaxShelf is a retail management SaaS landing page designed to attract brick-and-mortar store owners looking to digitize their inventory and point-of-sale operations.\n\nThe design is clean and professional, emphasizing ROI and operational efficiency to speak directly to business-minded decision-makers."
  },
  {
    id: 107, title: "Polock Interior", timeline: "1 Month", designSystem: "Luxury UI",
    category: "Interior Design", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/PolockInterior.webp"],
    context: "Polock Interior is a sleek, high-end landing page for a premium interior design studio.\n\nThe page uses large, full-bleed imagery and refined typography to communicate luxury and expertise. Every section is arranged to build desire and guide high-net-worth clients toward scheduling a consultation."
  },
  {
    id: 108, title: "Prospera", timeline: "5 Weeks", designSystem: "Modern SaaS UI",
    category: "FinTech / SaaS", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/Prospera.webp"],
    context: "Prospera is a financial planning SaaS landing page designed to attract both individual users and enterprise clients looking for wealth management solutions.\n\nThe design strikes a balance between being approachable and professional, using a confident color palette and strong data visualizations to build trust."
  },
  {
    id: 109, title: "QProco", timeline: "3 Weeks", designSystem: "Tech UI",
    category: "SaaS / Productivity", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/QProco.webp"],
    context: "QProco is a productivity and workflow automation SaaS landing page designed to convert technical decision-makers.\n\nThe page leans into a clean, code-forward aesthetic that resonates with developer and ops audiences, while keeping feature explanations clear enough for non-technical stakeholders."
  },
  {
    id: 110, title: "Silk Route", timeline: "1 Month", designSystem: "Editorial UI",
    category: "E-Commerce / Fashion", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/SilkRoute.webp"],
    context: "Silk Route is a fashion e-commerce landing page inspired by the timeless elegance of South Asian textile traditions.\n\nThe editorial layout elevates the brand's craftsmanship story, using rich imagery and sophisticated typography to position the products as premium, culturally meaningful fashion."
  },
  {
    id: 111, title: "Revexia", timeline: "3 Weeks", designSystem: "Custom UI",
    category: "SaaS / Landing", figmaLink: "https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=82-20027&t=92Su7LDNN0qikFsP-1", images: ["/Revexialanding.webp"],
    context: "Revexia's landing page was crafted to capture the essence of the brand — a bold, high-converting entry point into the platform's ecosystem.\n\nThe design prioritizes immediate clarity and visual impact, using strong typographic hierarchy and purposeful motion to communicate the platform's power without overwhelming visitors.\n\nEvery section was engineered to guide users through the product story — from the problem statement to the solution reveal — culminating in a compelling call-to-action that drives sign-ups and demo requests."
  },
];

const dashboardsData = [
  {
    id: 301,
    title: "Dashboard Design",
    timeline: "3 Month",
    designSystem: "Custom UI",
    category: "Dashboard / SaaS",
    figmaLink: "",
    images: ["/dashboard1.webp", "/dashboard2.webp", "/dashboard3.webp"],
    context: "Clarity OS is a centralized operational dashboard designed to surface actionable insights from complex organizational data.\n\nUnlike traditional dashboards that hide information behind layers of navigation, Clarity OS uses a vertically-scrolling layout to tell a continuous data story. This approach ensures that executive teams can see the full picture — from high-level KPIs down to granular operation metrics — in one fluid movement.\n\nThe UI system was built with a focus on high information density without visual noise, using a monochrome foundation with purposeful color accents to highlight anomalies and critical trends."
  },
];

// ─── Copy Link Button ─────────────────────────────────────────────────────────
function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm shadow-sm transition-all border ${
        copied
          ? 'bg-green-500 text-white border-green-500'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200'
      }`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
      {copied ? 'Copied!' : 'Copy Link'}
    </button>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
type Project = {
  id: number;
  title: string;
  timeline: string;
  designSystem: string;
  category: string;
  figmaLink: string;
  images: string[];
  context: string;
};

function ProjectCard({
  project,
  shareUrl,
  highlighted = false,
  isLandingStyle = false,
  isVerticalScroll = false,
}: {
  project: Project;
  shareUrl: string;
  highlighted?: boolean;
  isLandingStyle?: boolean;
  isVerticalScroll?: boolean;
  key?: React.Key;
}) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [openContext, setOpenContext] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (highlighted && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [highlighted]);

  const handleNext = () => setCurrentImgIndex(i => (i + 1) % project.images.length);
  const handlePrev = () => setCurrentImgIndex(i => (i - 1 + project.images.length) % project.images.length);

  return (
    <div
      ref={cardRef}
      className={`bg-white rounded-[1.5rem] border p-6 md:p-8 lg:p-10 transition-all duration-500 ${
        highlighted
          ? 'border-black shadow-[0_0_0_3px_rgba(0,0,0,0.15),0_8px_40px_rgba(0,0,0,0.15)]'
          : 'border-gray-400/60'
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">{project.title}</h2>
          <div className="flex flex-wrap gap-12 md:gap-16">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Project Timeline</p>
              <p className="text-base font-semibold">{project.timeline}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Design System</p>
              <p className="text-base font-semibold">{project.designSystem}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <CopyLinkButton url={shareUrl} />
          {project.figmaLink && (
            <a
              href={project.figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 border border-transparent transition-all font-medium text-sm shadow-sm"
            >
              <Figma className="w-4 h-4" />
              View in Figma
            </a>
          )}
        </div>
      </div>

      {isVerticalScroll ? (
        <div className="flex flex-col gap-6">
          {project.images.map((img, idx) => (
            <div key={idx} className="w-full bg-[#dcdcdc] rounded-2xl overflow-hidden border border-[#cacaca]">
              <img
                src={img}
                alt={`${project.title} detail ${idx + 1}`}
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className={`relative w-full bg-[#dcdcdc] rounded-2xl overflow-hidden group border border-[#cacaca] ${isLandingStyle ? '' : 'aspect-[16/10]'}`}>
          <img
            src={project.images[currentImgIndex]}
            alt={`${project.title} preview ${currentImgIndex + 1}`}
            className={`w-full transition-opacity duration-500 ${isLandingStyle ? 'h-auto object-contain' : 'h-full object-cover'}`}
            referrerPolicy="no-referrer"
          />

          {project.images.length > 1 && (
            <>
              <button onClick={handlePrev} className="absolute left-6 top-1/2 -translate-y-1/2 p-2 transition-all shadow-sm flex items-center justify-center hover:scale-110" style={{borderRadius:'20px', background:'#ffffffc4', border:'1px solid #fff'}} onMouseEnter={e=>(e.currentTarget.style.background='#fff')} onMouseLeave={e=>(e.currentTarget.style.background='#ffffffc4')} aria-label="Previous image">
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={2.5} />
              </button>
              <button onClick={handleNext} className="absolute right-6 top-1/2 -translate-y-1/2 p-2 transition-all shadow-sm flex items-center justify-center hover:scale-110" style={{borderRadius:'20px', background:'#ffffffc4', border:'1px solid #fff'}} onMouseEnter={e=>(e.currentTarget.style.background='#fff')} onMouseLeave={e=>(e.currentTarget.style.background='#ffffffc4')} aria-label="Next image">
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={2.5} />
              </button>
            </>
          )}

          {openContext && <div className="fixed inset-0 z-40" onClick={() => setOpenContext(false)} />}
          {openContext && (
            <div className="absolute bottom-[4.5rem] right-4 md:bottom-[5rem] md:right-6 w-[85%] sm:w-[50%] md:w-[45%] lg:w-[35%] max-h-[80%] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl z-50 p-6 md:p-8 pr-4 md:pr-6 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-bottom-4 duration-200 border border-gray-100">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 pr-4"><Lightbulb className="w-5 h-5 text-yellow-500" />About this Project</h3>
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{project.context}</div>
            </div>
          )}
          <button
            onClick={() => setOpenContext(prev => !prev)}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-sm transition-colors z-50"
          >
            <Lightbulb className="w-4 h-4" />Project Context
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Scroll To Top ────────────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        background: '#111111',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
        transition: 'opacity 0.25s ease, transform 0.25s ease, background 0.15s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 200,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#333')}
      onMouseLeave={e => (e.currentTarget.style.background = '#111111')}
    >
      <ChevronDown style={{ width: '18px', height: '18px', transform: 'rotate(180deg)' }} />
    </button>
  );
}

function ScrollNav({ navItems, navigate }: {
  navItems: { label: string; path: string | null; active: boolean }[];
  navigate: ReturnType<typeof useNavigate>;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navContent = (
    <div
      className="flex items-center justify-between gap-4 transition-all duration-300"
      style={{ maxWidth: '72rem', margin: '0 auto', padding: scrolled ? '0 2rem' : '0 1.25rem', height: scrolled ? '60px' : '68px' }}
    >
      {/* Left: Avatar + Name */}
      <div className="flex items-center gap-3 shrink-0">
        <img
          src="/up.webp"
          alt="AR Tanveer"
          style={{
            borderRadius: '12px',
            width: scrolled ? '40px' : '44px',
            height: scrolled ? '40px' : '44px',
            transition: 'width 0.3s ease, height 0.3s ease',
            objectFit: 'cover',
            border: '2px solid #e5e7eb',
          }}
        />
        <div className="leading-tight">
          <p className="font-bold text-sm text-gray-900 tracking-tight">AR TANVEER</p>
          <p className="text-[11px] text-gray-400 font-medium">Sr. Product Designer</p>
        </div>
      </div>

      {/* Right: Nav pills */}
      <div className="flex items-center gap-1">
        {navItems.map(item => (
          <button
            key={item.label}
            onClick={() => item.path && navigate(item.path)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              item.active
                ? 'bg-black text-white shadow-sm'
                : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            {item.label}
          </button>
        ))}

      </div>
    </div>
  );

  return (
    <div
      className={`w-full sticky z-[100] transition-all duration-300 ease-in-out ${
        scrolled ? '' : 'px-6 md:px-12 lg:px-20'
      }`}
      style={{ top: scrolled ? '0px' : '16px' }}
    >
      <div
        className={`bg-white transition-all duration-300 ease-in-out w-full ${!scrolled ? 'max-w-6xl mx-auto' : ''}`}
        style={{
          borderRadius: scrolled ? '0px' : '16px',
          border: scrolled ? 'none' : '1px solid #e5e7eb',
          borderBottom: scrolled ? '1px solid #e5e7eb' : 'none',
          boxShadow: scrolled
            ? '0 2px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)'
            : '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        {navContent}
      </div>
    </div>
  );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────
function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const section = location.pathname.startsWith('/landing')
    ? 'landing'
    : location.pathname.startsWith('/appdesign')
    ? 'appdesign'
    : location.pathname.startsWith('/dashboards')
    ? 'dashboards'
    : 'saas';

  const pageTitle = section === 'saas' ? 'SaaS Projects' : section === 'landing' ? 'Landing Pages' : section === 'dashboards' ? 'Dashboards' : 'App Design';


  const navItems = [
    { label: 'SaaS', path: '/saas', active: section === 'saas' },
    { label: 'App Design', path: '/appdesign', active: section === 'appdesign' },
    { label: 'Dashboards', path: '/dashboards', active: section === 'dashboards' },
    { label: 'Landing Pages', path: '/landing', active: section === 'landing' },
  ];

  return (
    <div className="min-h-screen bg-[#ececec] font-sans text-gray-900 flex flex-col items-center">

      {/* ── Top Navigation ── */}
      <ScrollNav
        navItems={navItems}
        navigate={navigate}
      />

      {/* ── Scroll To Top ── */}
      <ScrollToTop />

      {/* ── Page Content ── */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-10 flex flex-col items-center">
        {/* Page title */}
        <div className="w-full max-w-6xl mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{pageTitle}</h1>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<SaaSPage />} />
          <Route path="/saas" element={<SaaSPage />} />
          <Route path="/saas/:slug" element={<SaaSPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/landing/:slug" element={<LandingPage />} />
          <Route path="/appdesign" element={<AppDesignPage />} />
          <Route path="/appdesign/:slug" element={<AppDesignPage />} />
          <Route path="/dashboards" element={<DashboardsPage />} />
          <Route path="/dashboards/:slug" element={<DashboardsPage />} />
        </Routes>
      </div>
    </div>
  );
}

// ─── SaaS Page ────────────────────────────────────────────────────────────────
function SaaSPage() {
  const { slug } = useParams<{ slug?: string }>();
  return (
    <div className="w-full max-w-6xl flex flex-col gap-16">
      {projectsData.map(project => {
        const projectSlug = toSlug(project.title);
        const shareUrl = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}#/saas/${projectSlug}`;
        return (
          <ProjectCard
            key={project.id}
            project={project}
            shareUrl={shareUrl}
            highlighted={slug === projectSlug}
          />
        );
      })}
    </div>
  );
}

// ─── App Design Page ──────────────────────────────────────────────────────────
function AppDesignPage() {
  const { slug } = useParams<{ slug?: string }>();
  return (
    <div className="w-full max-w-6xl flex flex-col gap-16">
      {appDesignData.map(project => {
        const projectSlug = toSlug(project.title);
        const shareUrl = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}#/appdesign/${projectSlug}`;
        return (
          <ProjectCard
            key={project.id}
            project={project}
            shareUrl={shareUrl}
            highlighted={slug === projectSlug}
          />
        );
      })}
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
function LandingPage() {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const defaultProject = slug
    ? landingPagesData.find(p => toSlug(p.title) === slug) ?? landingPagesData[0]
    : landingPagesData[0];

  const [active, setActive] = useState(defaultProject);

  useEffect(() => {
    if (slug) {
      const found = landingPagesData.find(p => toSlug(p.title) === slug);
      if (found) setActive(found);
    }
  }, [slug]);

  const handleTabClick = (project: typeof landingPagesData[0]) => {
    setActive(project);
    navigate(`/landing/${toSlug(project.title)}`);
  };

  const shareUrl = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}#/landing/${toSlug(active.title)}`;

  return (
    <div className="w-full max-w-6xl flex flex-col gap-0">
      {/* Tabs */}
      <div className="w-full mb-12 overflow-x-auto custom-scrollbar pb-4">
        <div className="flex items-center gap-3 w-max">
          {landingPagesData.map(page => (
            <button
              key={page.id}
              onClick={() => handleTabClick(page)}
              className={`px-6 py-3 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                active.id === page.id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:text-black hover:bg-gray-50'
              }`}
            >
              {page.title}
            </button>
          ))}
        </div>
      </div>

      {/* Active project */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
        <ProjectCard
          key={active.id}
          project={active}
          shareUrl={shareUrl}
          isLandingStyle
        />
      </div>
    </div>
  );
}


// ─── Dashboards Page ─────────────────────────────────────────────────────────
function DashboardsPage() {
  const { slug } = useParams<{ slug?: string }>();
  return (
    <div className="w-full max-w-6xl flex flex-col gap-16">
      {dashboardsData.map(project => {
        const projectSlug = toSlug(project.title);
        const shareUrl = `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}#/dashboards/${projectSlug}`;
        return (
          <ProjectCard
            key={project.id}
            project={project}
            shareUrl={shareUrl}
            highlighted={slug === projectSlug}
            isVerticalScroll
          />
        );
      })}
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}
