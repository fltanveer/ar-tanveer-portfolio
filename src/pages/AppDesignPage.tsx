import React from 'react';
import { useParams } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { appDesignData } from '../data/projects';

const toSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export function AppDesignPage() {
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
