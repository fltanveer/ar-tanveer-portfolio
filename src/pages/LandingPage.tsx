import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
