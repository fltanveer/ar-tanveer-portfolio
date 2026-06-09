import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Figma, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CopyLinkButton } from './CopyLinkButton';
import { Project } from '../data/projects';

export function ProjectCard({
  project,
  shareUrl,
  highlighted = false,
  isLandingStyle = false,
  isVerticalScroll = false,
  key,
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
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ y: -4, shadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      className={`bg-white rounded-[1.5rem] border p-6 md:p-8 lg:p-10 transition-all duration-500 ${
        highlighted
          ? 'border-zinc-900 shadow-[0_0_0_2px_rgba(24,24,27,1),0_10px_40px_rgba(0,0,0,0.08)] -translate-y-1 group'
          : 'border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] hover:border-zinc-300 hover:-translate-y-1 group'
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6">{project.title}</h2>
          <div className="flex flex-wrap gap-8 md:gap-16">
            <div>
              <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest mb-1.5">Project Timeline</p>
              <p className="text-base font-semibold text-zinc-900">{project.timeline}</p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest mb-1.5">Design System</p>
              <p className="text-base font-semibold text-zinc-900">{project.designSystem}</p>
            </div>
          </div>
        </motion.div>
        <div className="flex items-center gap-3 flex-wrap">
          <CopyLinkButton url={shareUrl} />
          {project.figmaLink && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={project.figmaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 border border-transparent transition-all font-medium text-sm shadow-md"
            >
              <Figma className="w-4 h-4" />
              View in Figma
            </motion.a>
          )}
        </div>
      </div>

      {isVerticalScroll ? (
        <div className="flex flex-col gap-6">
          {project.images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="w-full bg-zinc-100 rounded-[1.5rem] overflow-hidden border border-zinc-200/80 shadow-sm"
            >
              <img
                src={img}
                alt={`${project.title} detail ${idx + 1}`}
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className={`relative w-full bg-zinc-100 rounded-[1.5rem] overflow-hidden group/image border border-zinc-200/80 shadow-inner ${isLandingStyle ? '' : 'aspect-[16/10]'}`}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImgIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              src={project.images[currentImgIndex]}
              alt={`${project.title} preview ${currentImgIndex + 1}`}
              className={`w-full transition-opacity duration-500 ${isLandingStyle ? 'h-auto object-contain' : 'h-full object-cover'}`}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {project.images.length > 1 && (
            <>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrev} 
                className="absolute left-6 top-1/2 -translate-y-1/2 p-2 shadow-sm flex items-center justify-center z-10" 
                style={{borderRadius:'20px', background:'#ffffffc4', border:'1px solid #fff'}} 
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={2.5} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext} 
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 shadow-sm flex items-center justify-center z-10" 
                style={{borderRadius:'20px', background:'#ffffffc4', border:'1px solid #fff'}} 
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-black" strokeWidth={2.5} />
              </motion.button>
            </>
          )}

          <AnimatePresence>
            {openContext && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]" 
                  onClick={() => setOpenContext(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="absolute bottom-[4.5rem] right-4 md:bottom-[5rem] md:right-6 w-[85%] sm:w-[50%] md:w-[45%] lg:w-[35%] max-h-[80%] bg-zinc-900/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] z-50 p-6 md:p-8 pr-4 md:pr-6 overflow-y-auto custom-scrollbar border border-zinc-700 text-zinc-50"
                >
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2 pr-4"><Lightbulb className="w-5 h-5 text-yellow-400" />About this Project</h3>
                  <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{project.context}</div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenContext(prev => !prev)}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all z-50 border border-zinc-800 hover:scale-105"
          >
            <Lightbulb className="w-4 h-4" />Project Context
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
