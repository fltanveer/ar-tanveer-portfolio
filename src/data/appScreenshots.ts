export interface ScreenshotSet {
  id: string;
  name: string;
  category: string;
  /** The Figma file the screens were taken from. */
  figmaLink: string;
  /** One headline per panel, in order. Doubles as the image's alt text. */
  panels: string[];
}

const FIGMA = 'https://www.figma.com/design/W2rsVN4BgxMgtimRKQTbNg/Design-Demo-Files?node-id=';

/**
 * App Store screenshot sets built from the app designs in Figma. Each image is
 * 860 x 1864 (a 430 x 932 panel at 2x) in public/app-screenshots/<id>-<n>.webp.
 */
export const screenshotSets: ScreenshotSet[] = [
  {
    id: 'mindcare',
    name: 'MindCare',
    category: 'Meditation and mental health',
    figmaLink: `${FIGMA}8-5987`,
    panels: [
      'Breathe in. Let the day go.',
      'Five quiet minutes, every evening',
      'Know how you really feel',
      'Courses that meet you where you are',
      'Small steps. Real change.',
    ],
  },
  {
    id: 'muscle',
    name: 'Muscle Locker',
    category: 'Powerlifting coaching',
    figmaLink: `${FIGMA}80-12958`,
    panels: [
      'Lift heavy. Powerlifting programs built around you.',
      'Every set. Planned.',
      'A real coach. On call.',
      'Ask between sets.',
      'Start your transformation',
    ],
  },
  {
    id: 'hopon',
    name: 'Hop On',
    category: 'Ride hailing',
    figmaLink: `${FIGMA}19-38469`,
    panels: [
      'Hop on. Get there.',
      'Pick the ride that fits the trip',
      'Name your own fare',
      'Watch your driver pull up',
      'Help is one tap away',
    ],
  },
  {
    id: 'decoraan',
    name: 'Decoraan',
    category: 'Furniture shopping',
    figmaLink: `${FIGMA}19-81740`,
    panels: [
      'Make room for slow mornings.',
      'Shop by the way you live',
      'Pieces made to stay',
      'See it in your room first',
      'Delivered and assembled',
    ],
  },
  {
    id: 'studylity',
    name: 'StudyLity',
    category: 'Social learning',
    figmaLink: `${FIGMA}18-12438`,
    panels: [
      'Study smarter, together.',
      'Your week, at a glance',
      'Climb the leaderboard',
      'Every book, one shelf',
      'Unlock badges as you learn',
    ],
  },
  {
    id: 'tracky',
    name: 'Tracky',
    category: 'Parcel delivery',
    figmaLink: `${FIGMA}18-7956`,
    panels: [
      'Every parcel, in your pocket.',
      'Pickup to doorstep, live',
      'Proof of delivery in one tap',
      'Paperwork that flags itself',
      'Sign up with just your phone',
    ],
  },
  {
    id: 'ldma',
    name: 'LDMA',
    category: 'Car sharing',
    figmaLink: `${FIGMA}8-14519`,
    panels: [
      'Share the car. Split the road.',
      'Borrow from friends you trust',
      'Pick a date. Send a request.',
      'Always know where it is',
      'Say thanks with a gift',
    ],
  },
];

export const screenshotSrc = (id: string, index: number) => `/app-screenshots/${id}-${index + 1}.webp`;
