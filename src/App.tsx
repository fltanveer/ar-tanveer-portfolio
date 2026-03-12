/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Figma, Menu } from 'lucide-react';

const projectsData = [
  {
    id: 1,
    title: "DRIVE",
    timeline: "11 Month",
    designSystem: "Material UI",
    category: "SaaS",
    figmaLink: "#",
    images: [
      "/drive-dashboard.png",
      "https://picsum.photos/seed/drive2/1600/900",
      "https://picsum.photos/seed/drive3/1600/900",
    ]
  }
];

export default function App() {
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<number, number>>({});

  const handleNextImage = (projectId: number, numImages: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % numImages
    }));
  };

  const handlePrevImage = (projectId: number, numImages: number) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) - 1 + numImages) % numImages
    }));
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-gray-900 p-6 md:p-12 lg:p-20 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">SaaS Projects</h1>
        <button className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Projects List */}
      <div className="w-full max-w-6xl flex flex-col gap-16">
        {projectsData.map(project => {
          const currentImgIndex = currentImageIndices[project.id] || 0;
          
          return (
            <div key={project.id} className="rounded-[1.5rem] border border-gray-400/60 p-6 md:p-8 lg:p-10">
              
              {/* Project Header */}
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
                
                <a 
                  href={project.figmaLink}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-400/60 hover:bg-gray-200/50 transition-all font-medium text-sm"
                >
                  <Figma className="w-4 h-4" />
                  Figma Link
                </a>
              </div>

              {/* Image Carousel */}
              <div className="relative w-full aspect-[16/10] bg-[#dcdcdc] rounded-2xl overflow-hidden group">
                <img 
                  src={project.images[currentImgIndex]} 
                  alt={`${project.title} preview ${currentImgIndex + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Navigation Arrows */}
                <button 
                  onClick={() => handlePrevImage(project.id, project.images.length)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 p-2 text-black hover:scale-110 transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
                </button>
                
                <button 
                  onClick={() => handleNextImage(project.id, project.images.length)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-black hover:scale-110 transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-10 h-10 md:w-12 md:h-12" strokeWidth={3} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
