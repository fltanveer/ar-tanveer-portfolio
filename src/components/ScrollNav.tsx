import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  path: string | null;
  active: boolean;
  icon?: React.ReactNode;
}

export function ScrollNav({ navItems, navigate }: {
  navItems: NavItem[];
  navigate: ReturnType<typeof useNavigate>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [navItems]);

  const handleNav = (path: string | null) => {
    if (path) { navigate(path); setMobileOpen(false); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full sticky z-[100] transition-all duration-300 ease-in-out ${
        scrolled ? '' : 'px-4 sm:px-6 md:px-12 lg:px-20'
      }`}
      style={{ top: scrolled ? '0px' : '16px' }}
    >
      <div
        className={`transition-all duration-300 ease-in-out w-full ${
          !scrolled
            ? 'max-w-6xl mx-auto rounded-2xl border border-zinc-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/70 backdrop-blur-xl'
            : 'border-b border-zinc-200 bg-white/80 backdrop-blur-md'
        }`}
        style={{ boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.03)' : '0 8px 32px rgba(0,0,0,0.08)' }}
      >
        {/* Main bar */}
        <div
          className="flex items-center justify-between gap-4 transition-all duration-300"
          style={{
            maxWidth: '72rem',
            margin: '0 auto',
            padding: scrolled ? '0 1.25rem' : '0 1.25rem',
            height: scrolled ? '56px' : '64px',
          }}
        >
          {/* Left: Avatar + Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 shrink-0"
          >
            <img
              src="/up.webp"
              alt="AR Tanveer"
              style={{
                borderRadius: '12px',
                width: scrolled ? '36px' : '40px',
                height: scrolled ? '36px' : '40px',
                transition: 'width 0.3s ease, height 0.3s ease',
                objectFit: 'cover',
                border: '2px solid #e5e7eb',
              }}
            />
            <div className="leading-tight">
              <p className="font-bold text-sm text-zinc-950 tracking-tight">AR TANVEER</p>
              <p className="text-[11px] text-zinc-500 font-medium">Sr. Product Designer</p>
            </div>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNav(item.path)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  item.active
                    ? 'bg-zinc-900 text-white shadow-md scale-[1.02]'
                    : 'bg-transparent text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-950'
                }`}
              >
                {item.icon && <span className="w-4 h-4 flex items-center justify-center">{item.icon}</span>}
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 rounded-xl text-zinc-600 hover:bg-zinc-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-zinc-100"
            >
              <div className="flex flex-col p-3 gap-1">
                {navItems.map(item => (
                  <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNav(item.path)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left transition-all duration-200 ${
                      item.active
                        ? 'bg-zinc-900 text-white'
                        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
                    }`}
                  >
                    {item.icon && <span className="w-4 h-4 flex items-center justify-center">{item.icon}</span>}
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
