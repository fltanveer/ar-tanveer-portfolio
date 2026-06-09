import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectCard } from '../components/ProjectCard';
import { landingPagesData } from '../data/projects';

const toSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export function LandingPage() {
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
    <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 items-start">
      {/* Vertical floating tab list */}
      <div className="w-full md:w-52 shrink-0 md:sticky md:top-24 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 custom-scrollbar">
        {landingPagesData.map(page => (
          <motion.button
            key={page.id}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleTabClick(page)}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm whitespace-nowrap md:whitespace-normal md:text-left w-max md:w-full transition-all duration-200 shrink-0 ${
              active.id === page.id
                ? 'bg-zinc-900 text-white shadow-md'
                : 'bg-white text-zinc-500 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
          >
            {active.id === page.id && (
              <motion.span
                layoutId="active-indicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-full opacity-40 hidden md:block"
              />
            )}
            {page.title}
          </motion.button>
        ))}
      </div>

      {/* Active project */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <ProjectCard
              project={active}
              shareUrl={shareUrl}
              isLandingStyle
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
