import React from 'react';
import { ProjectList } from '../components/ProjectList';
import { dashboardsData } from '../data/projects';

export function DashboardsPage() {
  return <ProjectList section="dashboards" projects={dashboardsData} isVerticalScroll />;
}
