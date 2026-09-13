import React from 'react';
import { useParams } from 'react-router-dom';
import { PageHeader } from './PageHeader';
import { ProjectCard } from './ProjectCard';
import { Project } from '../data/projects';
import { menuNumber, sections } from '../data/sections';
import { shareUrlFor, toSlug } from '../lib/slug';

/** Shared shape for the stacked gallery sections (SaaS, App Design, Dashboards). */
export function ProjectList({
  section,
  projects,
  isVerticalScroll = false,
}: {
  section: string;
  projects: Project[];
  isVerticalScroll?: boolean;
}) {
  const { slug } = useParams<{ slug?: string }>();
  const meta = sections.find((s) => s.section === section);
  const index = menuNumber(section);

  return (
    <div className="px-5 py-14 sm:px-8 md:py-20 lg:px-16">
      <PageHeader
        index={index}
        title={meta?.label ?? section}
        blurb={meta?.blurb ?? ''}
        count={projects.length}
      />
      <div className="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            shareUrl={shareUrlFor(section, project.title)}
            highlighted={slug === toSlug(project.title)}
            isVerticalScroll={isVerticalScroll}
          />
        ))}
      </div>
    </div>
  );
}
