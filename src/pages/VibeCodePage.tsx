import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const vibeSites = [
  {
    id: 1,
    name: 'The Café',
    url: 'https://the-cafe-mu.vercel.app/',
    image: '/vibe/the cafe.png',
  },
  {
    id: 2,
    name: 'Argos Legal Group',
    url: 'https://argos-legal-group.vercel.app/',
    image: '/vibe/argos.png',
  },
  {
    id: 3,
    name: 'Sentekse',
    url: 'https://sentekse.vercel.app/index.html',
    image: '/vibe/senteske.png',
  },
  {
    id: 4,
    name: 'HopOn BD',
    url: 'https://hoponbd.com/',
    image: '/vibe/hopon.png',
  },
  {
    id: 5,
    name: 'HopOn Food',
    url: 'https://hopon-food.vercel.app/',
    image: '/vibe/hopon-food.png',
  },
  {
    id: 6,
    name: 'MLJ Digital',
    url: 'https://mljdigital.dk/',
    image: '/vibe/mlj.png',
  },
  {
    id: 7,
    name: 'Noma',
    url: 'https://noma-iota.vercel.app/',
    image: '/vibe/noma.png',
  },
  {
    id: 8,
    name: 'CaseActive',
    url: 'https://caseactive-sandbox.vercel.app/',
    image: '/vibe/caseactive.png',
  },
  {
    id: 9,
    name: 'Edge Surgical',
    url: 'https://edgesurgical.vercel.app/',
    image: '/vibe/Edge.png',
  },
  {
    id: 10,
    name: 'Figma Token Sandbox',
    url: 'https://figma-token-sandbox.vercel.app/',
    image: '/vibe/Figma-token.png',
  },
  {
    id: 11,
    name: 'FacilityFlow',
    url: 'https://facilityflow.dk/',
    image: '/vibe/facilityscreen.png',
  },
];

export function VibeCodePage() {
  return (
    <div className="w-full max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full bg-zinc-900 text-white rounded-2xl px-8 py-7 mb-10 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="shrink-0 text-3xl select-none">⚡</div>
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
          I'm a designer first, with a deep foundation in HTML, CSS, and Canvas. That combination means I don't just generate code;{' '}
          <span className="text-white font-semibold">I direct it.</span>{' '}
          I know exactly how an interface should feel, behave, and scale in a real product.{' '}
          <span className="text-white font-semibold">Vibe coding didn't replace my craft. It amplified it.</span>
        </p>
      </motion.div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vibeSites.map((site, i) => (
          <motion.a
            key={site.id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5% 0px' }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
            whileHover={{ y: -6 }}
            className="group bg-white rounded-2xl border border-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:border-zinc-300 overflow-hidden transition-all duration-300 flex flex-col"
          >
            {/* Screenshot */}
            <div className="p-3 pb-0">
            <div className="w-full aspect-[16/10] bg-zinc-100 overflow-hidden relative rounded-xl">
              {site.image ? (
                <img
                  src={site.image}
                  alt={`${site.name} screenshot`}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-zinc-300 text-4xl font-bold tracking-tight select-none">
                    {site.name[0]}
                  </span>
                </div>
              )}
              {/* Visit overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-zinc-900 text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                  <ExternalLink className="w-4 h-4" />
                  Visit Site
                </span>
              </div>
            </div>
            </div>

            {/* Info */}
            <div className="px-5 py-4 flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-zinc-900 text-sm leading-tight">{site.name}</p>
                <p className="text-zinc-400 text-xs mt-0.5 truncate max-w-[180px]">
                  {site.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-zinc-300 group-hover:text-zinc-600 transition-colors shrink-0" />
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
