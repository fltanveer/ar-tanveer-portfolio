/**
 * PROTECTED CONTRACT — do not change this transform.
 *
 * Copy-link buttons have been emitting `#/saas/drive`-style URLs, and those may
 * already be shared. Altering the slug shape would silently break every link
 * that exists in the wild. Behaviour is preserved byte-for-byte from the
 * original per-page copies this replaces.
 */
export const toSlug = (title: string): string =>
  title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

/** Same shape the previous per-page implementations produced. */
export const shareUrlFor = (section: string, title: string): string =>
  `${window.location.origin}${window.location.pathname.replace(/\/$/, '')}#/${section}/${toSlug(title)}`;
