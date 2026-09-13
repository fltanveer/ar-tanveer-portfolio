export interface EmailTemplate {
  id: string;
  brand: string;
  title: string;
  category: string;
  palette: string;
  width: number;
  height: number;
}

/**
 * Original fictional campaign concepts, distinct from commissioned client work.
 * Order is display order: the gallery fills its top row first, so the most
 * colourful concepts lead.
 */
export const emailTemplates: EmailTemplate[] = [
  { id: 'waggle', brand: 'Waggle', title: 'Treats worth sitting for', category: 'Pet shop · Welcome offer', palette: 'Coral, teal & sunshine', width: 600, height: 3265 },
  { id: 'offday', brand: 'Offday', title: 'Big comfort. Small plans.', category: 'Apparel · Zine collection launch', palette: 'Cobalt, butter & tomato', width: 600, height: 2498 },
  { id: 'form', brand: 'FORM', title: 'Your pace. Your people.', category: 'Activewear · Poster welcome offer', palette: 'Terracotta & black', width: 600, height: 3138 },
  { id: 'supper', brand: 'Sunday Table', title: 'Dinner is the occasion', category: 'Food & lifestyle · Supper club invitation', palette: 'Paprika & cream', width: 600, height: 2487 },
  { id: 'fieldwork', brand: 'Fieldwork', title: 'Good things. Grown slow.', category: 'Farm to door · Harvest almanac', palette: 'Ochre & olive', width: 600, height: 1967 },
  { id: 'pennant', brand: 'Pennant', title: 'You saved £412 in August', category: 'Fintech · Monthly money summary', palette: 'Forest green & lime', width: 600, height: 2247 },
  { id: 'fairhaven', brand: 'Fairhaven Row', title: 'Twelve townhouses. One quiet square.', category: 'Real estate · Residential launch', palette: 'Charcoal & stone', width: 600, height: 3633 },
  { id: 'halden', brand: 'Halden Health', title: 'Your annual physical is on Thursday', category: 'Healthcare · Appointment confirmation', palette: 'Navy & harbour blue', width: 600, height: 2310 },
  { id: 'still', brand: 'Still', title: 'Three minutes a day is enough to start', category: 'Wellness app · First-week onboarding', palette: 'Paper & slate', width: 600, height: 2269 },
  { id: 'aure', brand: 'AURE', title: 'Daily Milk Body Cream', category: 'Skincare · Product launch', palette: 'Stone & ink', width: 600, height: 2509 },
];
