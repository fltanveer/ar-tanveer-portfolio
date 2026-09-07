import React, { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { PageAura } from './components/PageAura';
import { ProfileDrawer } from './components/ProfileDrawer';
import { ScrollToTop } from './components/ScrollToTop';
import { SideRail } from './components/SideRail';
import { sections, utilityNav } from './data/sections';
import { AppDesignPage } from './pages/AppDesignPage';
import { DashboardsPage } from './pages/DashboardsPage';
import { HandoffPage } from './pages/HandoffPage';
import { HomePage } from './pages/HomePage';
import { LandingPage } from './pages/LandingPage';
import { SaaSPage } from './pages/SaaSPage';
import { VibeCodePage } from './pages/VibeCodePage';

/** Route changes start at the top; deep-linked cards scroll themselves after. */
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.split('/').filter(Boolean).length > 1) return; // deep link owns the scroll
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function Footer() {
  return (
    // Same padding rhythm as every section above it. The centred max-width
    // wrapper this used to have pushed the footer out of line with the
    // left-biased column the whole page is built on.
    <footer className="border-t border-line px-5 py-10 sm:px-8 lg:px-16">
      <p className="t-body text-xs text-ink-soft">
        Designed and built by Md Ashrafur Rahman Tanveer in Dhaka, Bangladesh.
      </p>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        <a
          href="https://www.linkedin.com/in/artanveer/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[24px] items-center text-xs text-link transition-opacity duration-200 hover:opacity-80"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

function Layout() {
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-dvh bg-page">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <SideRail
        items={sections}
        utility={utilityNav}
        onOpenProfile={() => setProfileOpen(true)}
      />
      <ProfileDrawer open={profileOpen} onClose={() => setProfileOpen(false)} />
      <ScrollToTop />
      <ScrollReset />

      <div className="lg:pl-60">
        {/* Home is excluded: its top-right already carries the portrait, and a
            second focal point in the same corner would fight it. */}
        <main id="main" className="relative isolate">
          {!isHome && <PageAura />}
          <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname.split('/')[1] || 'home'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'linear' }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/saas" element={<SaaSPage />} />
              <Route path="/saas/:slug" element={<SaaSPage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/landing/:slug" element={<LandingPage />} />
              <Route path="/appdesign" element={<AppDesignPage />} />
              <Route path="/appdesign/:slug" element={<AppDesignPage />} />
              <Route path="/dashboards" element={<DashboardsPage />} />
              <Route path="/dashboards/:slug" element={<DashboardsPage />} />
              <Route path="/vibecode" element={<VibeCodePage />} />
              <Route path="/handoff" element={<HandoffPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    // reducedMotion="user" makes every motion component below respect
    // prefers-reduced-motion automatically — animating only opacity and colour,
    // never transform. The global CSS override cannot reach these, because
    // JS-driven animations don't read transition-duration.
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <Layout />
      </HashRouter>
    </MotionConfig>
  );
}
