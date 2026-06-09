import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layers, Smartphone, Monitor, Layout as LayoutIcon, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollNav } from './components/ScrollNav';
import { ScrollToTop } from './components/ScrollToTop';
import { SaaSPage } from './pages/SaaSPage';
import { AppDesignPage } from './pages/AppDesignPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardsPage } from './pages/DashboardsPage';
import { VibeCodePage } from './pages/VibeCodePage';

// ─── Section background config ────────────────────────────────────────────────
const sectionBg: Record<string, { gradient: string; iconColor: string; Icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }> }> = {
  saas:       { gradient: 'rgba(191,219,254,0.55)', iconColor: '#93c5fd', Icon: Layers },
  appdesign:  { gradient: 'rgba(221,214,254,0.55)', iconColor: '#c4b5fd', Icon: Smartphone },
  dashboards: { gradient: 'rgba(167,243,208,0.55)', iconColor: '#6ee7b7', Icon: Monitor },
  landing:    { gradient: 'rgba(253,230,138,0.50)', iconColor: '#fbbf24', Icon: LayoutIcon },
  vibecode:   { gradient: 'rgba(165,243,252,0.55)', iconColor: '#22d3ee', Icon: Zap },
};

const iconPositions = [
  { left: '7%',  top: 12,  size: 54, floatY: 10, floatDur: 4.2, rotateDeg: 8  },
  { left: '26%', top: 68,  size: 32, floatY: 7,  floatDur: 5.6, rotateDeg: -6 },
  { left: '50%', top: 6,   size: 50, floatY: 12, floatDur: 3.8, rotateDeg: 5  },
  { left: '62%', top: 54,  size: 80, floatY: 8,  floatDur: 6.1, rotateDeg: -4 },
  { left: '76%', top: 10,  size: 44, floatY: 10, floatDur: 4.7, rotateDeg: 7  },
  { left: '91%', top: 34,  size: 30, floatY: 6,  floatDur: 5.2, rotateDeg: -9 },
  { left: '38%', top: 108, size: 22, floatY: 8,  floatDur: 4.4, rotateDeg: 6  },
];

const bottomIconPositions = [
  { left: '9%',  bottom: 14,  size: 48, floatY: 9,  floatDur: 4.5, rotateDeg: -7 },
  { left: '28%', bottom: 60,  size: 30, floatY: 7,  floatDur: 5.8, rotateDeg: 6  },
  { left: '51%', bottom: 8,   size: 46, floatY: 11, floatDur: 3.9, rotateDeg: -5 },
  { left: '63%', bottom: 50,  size: 74, floatY: 8,  floatDur: 6.3, rotateDeg: 4  },
  { left: '77%', bottom: 12,  size: 40, floatY: 10, floatDur: 4.8, rotateDeg: -8 },
  { left: '90%', bottom: 36,  size: 28, floatY: 6,  floatDur: 5.4, rotateDeg: 9  },
];

// ─── Main Layout ──────────────────────────────────────────────────────────────
function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const section = location.pathname.split('/')[1] || 'saas';
  const bg = sectionBg[section] ?? sectionBg.saas;

  const pageTitle = section === 'saas' ? 'SaaS Projects' : section === 'landing' ? 'Landing Pages' : section === 'dashboards' ? 'Dashboards' : section === 'vibecode' ? 'Vibe Code' : 'App Design';

  const navItems = [
    { label: 'SaaS',          path: '/saas',       active: section === 'saas',       icon: <Layers    className="w-4 h-4" /> },
    { label: 'App Design',    path: '/appdesign',  active: section === 'appdesign',  icon: <Smartphone className="w-4 h-4" /> },
    { label: 'Dashboards',    path: '/dashboards', active: section === 'dashboards', icon: <Monitor  className="w-4 h-4" /> },
    { label: 'Landing Pages', path: '/landing',    active: section === 'landing',    icon: <LayoutIcon className="w-4 h-4" /> },
    { label: 'Vibe Code',     path: '/vibecode',   active: section === 'vibecode',   icon: <Zap        className="w-4 h-4" /> },
  ];

  return (
    <div className="relative min-h-screen bg-white font-sans text-zinc-950 flex flex-col items-center selection:bg-zinc-900 selection:text-white">

      {/* ── Bottom gradient mirror (scroll-triggered) ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="fixed bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: '450px', zIndex: 0 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={section + '-bottom'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${bg.gradient}, transparent)` }}
              >
                {bottomIconPositions.map((pos, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -pos.floatY, 0],
                      rotate: [0, pos.rotateDeg, 0],
                    }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{
                      opacity: { duration: 0.5, delay: i * 0.04 },
                      scale:   { duration: 0.5, delay: i * 0.04 },
                      y:       { duration: pos.floatDur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                      rotate:  { duration: pos.floatDur * 1.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
                    }}
                    className="absolute"
                    style={{ left: pos.left, bottom: pos.bottom }}
                  >
                    <bg.Icon size={pos.size} color={bg.iconColor} strokeWidth={1.2} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Animated section background ── */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: '450px', zIndex: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, ${bg.gradient}, transparent)` }}
          >
            {iconPositions.map((pos, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -pos.floatY, 0],
                  rotate: [0, pos.rotateDeg, 0],
                }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{
                  opacity: { duration: 0.5, delay: i * 0.04 },
                  scale:   { duration: 0.5, delay: i * 0.04 },
                  y:       { duration: pos.floatDur, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 },
                  rotate:  { duration: pos.floatDur * 1.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 },
                }}
                className="absolute"
                style={{ left: pos.left, top: pos.top }}
              >
                <bg.Icon size={pos.size} color={bg.iconColor} strokeWidth={1.2} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Top Navigation ── */}
      <ScrollNav navItems={navItems} navigate={navigate} />

      {/* ── Scroll To Top ── */}
      <ScrollToTop />

      {/* ── Page Content ── */}
      <div className="relative w-full px-4 sm:px-6 md:px-12 lg:px-20 py-6 md:py-10 flex flex-col items-center" style={{ zIndex: 1 }}>
        {/* Page title */}
        <motion.div
          key={pageTitle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl mb-6 md:mb-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{pageTitle}</h1>
        </motion.div>

        {/* Routes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname.split('/')[1]}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full flex justify-center"
          >
            <Routes location={location}>
              <Route path="/"                element={<SaaSPage />} />
              <Route path="/saas"            element={<SaaSPage />} />
              <Route path="/saas/:slug"      element={<SaaSPage />} />
              <Route path="/landing"         element={<LandingPage />} />
              <Route path="/landing/:slug"   element={<LandingPage />} />
              <Route path="/appdesign"       element={<AppDesignPage />} />
              <Route path="/appdesign/:slug" element={<AppDesignPage />} />
              <Route path="/dashboards"      element={<DashboardsPage />} />
              <Route path="/dashboards/:slug" element={<DashboardsPage />} />
              <Route path="/vibecode"        element={<VibeCodePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}
