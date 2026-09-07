export interface VibeSite {
  id: number;
  name: string;
  url: string;
  image: string;
}

/** Extracted from VibeCodePage so the home index can count these without importing a page. */
export const vibeSites: VibeSite[] = [
  { id: 1, name: 'The Café', url: 'https://the-cafe-mu.vercel.app/', image: '/vibe/the cafe.png' },
  { id: 2, name: 'Argos Legal Group', url: 'https://argos-legal-group.vercel.app/', image: '/vibe/argos.png' },
  { id: 3, name: 'Sentekse', url: 'https://sentekse.vercel.app/index.html', image: '/vibe/senteske.png' },
  { id: 4, name: 'HopOn BD', url: 'https://hoponbd.com/', image: '/vibe/hopon.png' },
  { id: 5, name: 'HopOn Food', url: 'https://hopon-food.vercel.app/', image: '/vibe/hopon-food.png' },
  { id: 6, name: 'MLJ Digital', url: 'https://mljdigital.dk/', image: '/vibe/mlj.png' },
  { id: 7, name: 'Noma', url: 'https://noma-iota.vercel.app/', image: '/vibe/noma.png' },
  { id: 8, name: 'CaseActive', url: 'https://caseactive-sandbox.vercel.app/', image: '/vibe/caseactive.png' },
  { id: 9, name: 'Edge Surgical', url: 'https://edgesurgical.vercel.app/', image: '/vibe/Edge.png' },
  { id: 10, name: 'Figma Token Sandbox', url: 'https://figma-token-sandbox.vercel.app/', image: '/vibe/Figma-token.png' },
  { id: 11, name: 'FacilityFlow', url: 'https://facilityflow.dk/', image: '/vibe/facilityscreen.png' },
  { id: 12, name: 'AixAi', url: 'https://aixai-web.vercel.app/', image: '/vibe/aixai.png' },
];
