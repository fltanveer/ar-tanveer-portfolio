import React from 'react';
import { ProjectList } from '../components/ProjectList';
import { projectsData } from '../data/projects';

export function SaaSPage() {
  return <ProjectList section="saas" projects={projectsData} />;
}
