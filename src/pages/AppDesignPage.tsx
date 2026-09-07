import React from 'react';
import { ProjectList } from '../components/ProjectList';
import { appDesignData } from '../data/projects';

export function AppDesignPage() {
  return <ProjectList section="appdesign" projects={appDesignData} />;
}
