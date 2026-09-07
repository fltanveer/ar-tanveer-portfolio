import React, { useEffect, useState } from 'react';
import { X, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';

export interface RailItem {
  label: string;
  path: string;
  section: string;
  icon?: LucideIcon;
}

/**
 * Persistent left index on lg+, translucent bar + sheet below it.
 *
 * Apple sidebar behaviour: the selected row is a filled rounded rect, and the
 * ground stays achromatic — the current section is marked by fill and luminance,
 * never by hue. Blue is reserved for links and focus.
 */
export function SideRail({
  items,
  utility = [],
  onOpenProfile,
}: {
  items: RailItem[];
  utility?: RailItem[];
  onOpenProfile: () => void;
}) {
  const location = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);
  const current = location.pathname.split('/')[1] || 'home';

  useEffect(() => setSheetOpen(false), [location.pathname]);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheetOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const Wordmark = ({ compact = false }: { compact?: boolean }) => (
    <Link to="/" className="press block" aria-label="AR Tanveer, home">
      <span className={`t-heading block text-ink ${compact ? 'text-[17px]' : 'text-[19px]'}`}>
        AR Tanveer
      </span>
      <span className="t-label mt-0.5 block text-xs text-ink-soft">Sr. Product Designer</span>
    </Link>
  );

  const Row = ({
    item,
    ordinal,
    onNavigate,
  }: {
    item: RailItem;
    ordinal?: string;
    onNavigate?: () => void;
  }) => {
    const active = current === item.section;
    return (
      <li>
        <Link
          to={item.path}
          onClick={onNavigate}
          aria-current={active ? 'page' : undefined}
          className={`group flex items-baseline gap-3 rounded-[8px] px-3 py-2.5 transition-colors duration-200 ${
            active ? 'bg-raised' : 'hover:bg-surface'
          }`}
        >
          {/* One 16px slot, filled either way. The work rows carry an ordinal;
              the process row carries its own mark. Left empty it read as a
              numbered item that had lost its number. */}
          <span className="flex w-4 shrink-0 items-center justify-center text-ink-soft">
            {ordinal ? (
              <span className="t-label text-[11px] tabular-nums">{ordinal}</span>
            ) : item.icon ? (
              <item.icon className="size-[13px]" aria-hidden="true" />
            ) : null}
          </span>
          <span
            className={`flex-1 text-[14px] transition-colors duration-200 ${
              active ? 'text-ink' : 'text-ink-soft group-hover:text-ink'
            }`}
          >
            {item.label}
          </span>
        </Link>
      </li>
    );
  };

  const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      <nav aria-label="Sections">
        <ul className="flex flex-col gap-0.5 px-2">
          {items.map((item, i) => (
            <Row
              key={item.section}
              item={item}
              ordinal={String(i + 1).padStart(2, '0')}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
      </nav>
      {utility.length > 0 && (
        <nav aria-label="Process" className="mt-2 border-t border-line pt-2">
          <ul className="flex flex-col gap-0.5 px-2">
            {utility.map((item) => (
              <Row key={item.section} item={item} onNavigate={onNavigate} />
            ))}
          </ul>
        </nav>
      )}
    </>
  );

  const ProfileButton = () => (
    <button
      type="button"
      onClick={onOpenProfile}
      className="press m-2 flex items-center gap-3 rounded-[10px] px-3 py-3 text-left transition-colors duration-200 hover:bg-surface"
    >
      <img
        src="/up.webp"
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-full object-cover"
      />
      <span className="min-w-0">
        <span className="block truncate text-[14px] text-ink">Md Ashrafur Rahman</span>
        <span className="t-label block text-[11px] text-link">View profile</span>
      </span>
    </button>
  );

  return (
    <>
      {/* ── Desktop rail ────────────────────────────────────────────────── */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-line bg-page lg:flex">
        <div className="px-5 py-6">
          <Wordmark />
        </div>
        <div className="custom-scrollbar flex-1 overflow-y-auto pb-4">
          <NavList />
        </div>
        <div className="border-t border-line">
          <ProfileButton />
        </div>
      </aside>

      {/* ── Mobile bar ──────────────────────────────────────────────────── */}
      <header className="material-chrome sticky top-0 z-40 flex items-center justify-between border-b border-line px-5 py-3 lg:hidden">
        <Wordmark compact />
        <button
          type="button"
          onClick={() => setSheetOpen((o) => !o)}
          aria-expanded={sheetOpen}
          aria-label={sheetOpen ? 'Close menu' : 'Open menu'}
          className="press -mr-2 flex size-9 items-center justify-center rounded-full text-ink"
        >
          {sheetOpen ? (
            <X className="size-[18px]" />
          ) : (
            <span aria-hidden="true" className="flex w-[18px] flex-col gap-[5px]">
              <span className="h-px w-full bg-current" />
              <span className="h-px w-full bg-current" />
            </span>
          )}
        </button>
      </header>

      {/* ── Mobile sheet ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSheetOpen(false)}
              className="fixed inset-0 z-40 bg-page/60 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, transform: 'translateY(-8px)' }}
              animate={{ opacity: 1, transform: 'translateY(0px)' }}
              exit={{ opacity: 0, transform: 'translateY(-8px)' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="material-panel fixed inset-x-0 top-[60px] z-40 border-b border-line lg:hidden"
            >
              <div className="py-2">
                <NavList onNavigate={() => setSheetOpen(false)} />
              </div>
              <div className="border-t border-line">
                <ProfileButton />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
