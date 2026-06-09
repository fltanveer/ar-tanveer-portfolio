import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { projectsData } from '../data/projects';

const toSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export function SaaSPage() {
  const { slug } = useParams<{ slug?: string }>();
  return (
    <div className="w-full max-w-6xl flex flex-col gap-8 md:gap-16">
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
