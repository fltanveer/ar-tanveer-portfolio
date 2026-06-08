import React from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layers, Smartphone, BarChart2, Layout as LayoutIcon, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollNav } from './components/ScrollNav';
import { ScrollToTop } from './components/ScrollToTop';
import { SaaSPage } from './pages/SaaSPage';
import { AppDesignPage } from './pages/AppDesignPage';
import { LandingPage } from './pages/LandingPage';
import { DashboardsPage } from './pages/DashboardsPage';
import { VibeCodePage } from './pages/VibeCodePage';

// ─── Main Layout ──────────────────────────────────────────────────────────────
function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const section = location.pathname.split('/')[1] || 'saas';
  
  const pageTitle = section === 'saas' ? 'SaaS Projects' : section === 'landing' ? 'Landing Pages' : section === 'dashboards' ? 'Dashboards' : section === 'vibecode' ? 'Vibe Code' : 'App Design';

  const navItems = [
    { label: 'SaaS', path: '/saas', active: section === 'saas', icon: <Layers className="w-4 h-4" /> },
    { label: 'App Design', path: '/appdesign', active: section === 'appdesign', icon: <Smartphone className="w-4 h-4" /> },
    { label: 'Dashboards', path: '/dashboards', active: section === 'dashboards', icon: <BarChart2 className="w-4 h-4" /> },
    { label: 'Landing Pages', path: '/landing', active: section === 'landing', icon: <LayoutIcon className="w-4 h-4" /> },
    { label: 'Vibe Code', path: '/vibecode', active: section === 'vibecode', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950 flex flex-col items-center selection:bg-zinc-900 selection:text-white">
      {/* ── Top Navigation ── */}
      <ScrollNav
        navItems={navItems}
        navigate={navigate}
      />

      {/* ── Scroll To Top ── */}
      <ScrollToTop />

      {/* ── Page Content ── */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-10 flex flex-col items-center">
        {/* Page title */}
        <motion.div 
          key={pageTitle}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl mb-10"
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full flex justify-center"
          >
          <Routes location={location}>
              <Route path="/" element={<SaaSPage />} />
              <Route path="/saas" element={<SaaSPage />} />
              <Route path="/saas/:slug" element={<SaaSPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/landing/:slug" element={<LandingPage />} />
              <Route path="/appdesign" element={<AppDesignPage />} />
              <Route path="/appdesign/:slug" element={<AppDesignPage />} />
              <Route path="/dashboards" element={<DashboardsPage />} />
              <Route path="/dashboards/:slug" element={<DashboardsPage />} />
              <Route path="/vibecode" element={<VibeCodePage />} />
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
