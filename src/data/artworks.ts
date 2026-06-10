import { Artwork } from '../types';

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: 'anatomy-of-light',
    title: 'The Anatomy of Light',
    category: 'abstract',
    medium: 'Oil, acrylic, and charcoal on raw canvas',
    year: '2018',
    dimensions: '48" x 48"',
    description: 'A sweeping exploration of deep indigo colliding with charcoal markings and bold, textured ochres. Inspired by early morning light piercing through the floor-to-ceiling iron windows of a Soho studio loft.',
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '1:1',
    series: 'Luminous Geometries',
    story: 'This piece was painted during a transitional winter. The artist became fascinated with how the northern light in Manhattan felt sharp, casting rectangular geometries which were then translated into fluid gestures.',
    featured: true
  },
  {
    id: 'manhattan-monolith',
    title: 'Manhattan Monolith in Rain',
    category: 'photography',
    medium: 'Archival gelatin silver print',
    year: '1984',
    dimensions: '24" x 36"',
    description: 'Captured with a Leica M4 in midtown Manhattan during an evening downpour. The streetlights and vehicle beams create liquid mirrors on the slick pavement while skyscrapers dissolve into the elements.',
    imageUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '3:4',
    series: 'New York Nocturnes',
    story: 'Waiting for over two hours under an awning on 42nd street, the artist wanted to capture the exact fraction of a second where human bustle turned into abstract geometry of water, metal waves, and luminous energy.',
    featured: true
  },
  {
    id: 'silent-grid-5',
    title: 'Silent Grid No. 5',
    category: 'abstract',
    medium: 'Plaster, marble dust, and graphite on panel',
    year: '2021',
    dimensions: '36" x 48"',
    description: 'An extremely delicate, tactile exploration of neutral whites, plaster ridges, and micro-fine graphite grids. Highly structured yet organic in its microscopic textures.',
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '3:4',
    series: 'Minimalist Terrains',
    story: 'Moving away from color, the artist sought here to isolate form and texture. The chalky plaster surface responds dynamically to ambient shadows in a room, shifting throughout the day as the sun travels.',
    featured: false
  },
  {
    id: 'flatiron-steam',
    title: 'Flatiron Geometry & Steam',
    category: 'photography',
    medium: 'Vintage silver gelatin fiber print',
    year: '1988',
    dimensions: '20" x 24"',
    description: 'Classic high-contrast street capture focusing on Manhattan subterranean steam emerging from a pavement vent, set against the towering, triangular prow of the Flatiron building in winter.',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '3:4',
    series: 'New York Nocturnes',
    story: 'New York is a city that breathes from its gutters. This photograph is a testament to the heavy steam clouds of the 1980s, creating an atmospheric haze that turns monumental brick structures into soft, cinematic ghosts.',
    featured: true
  },
  {
    id: 'elysium-fields',
    title: 'Elysium Layering',
    category: 'abstract',
    medium: 'Pigments, gold leaf, and graphite on heavy linen',
    year: '2020',
    dimensions: '40" x 50"',
    description: 'Deep earthy charcoal, raw sienna, and cream white textures are scored with thin gold-leaf lines that represent geological fractures or city boundaries.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '4:3',
    series: 'Aura & Space',
    story: 'The combination of raw gesso, natural pigments, and genuine gold leaf represents the intersection between the raw, decaying industrial streets of Manhattan and the polished galleries where they find salvation.',
    featured: false
  },
  {
    id: 'skyscraper-reflections',
    title: 'Glass Monolith andSky',
    category: 'photography',
    medium: 'Archival pigment print on metal mount',
    year: '2012',
    dimensions: '30" x 45"',
    description: 'An abstract architectural crop of a financial district facade, refracting passing clouds and adjacent brick tenement towers in a steel checkerboard.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '16:9',
    series: 'Urban Structurism',
    story: 'This photograph was shot looking straight up while lying flat on a bench. By tilting the axis, the building facade loses its reference point to gravity, transforming into an endless, grid-like geometric painting.',
    featured: false
  },
  {
    id: 'symphony-blue',
    title: 'Symphony in Deep Blue',
    category: 'abstract',
    medium: 'Oil, resin, and deep pigments on maple panel',
    year: '2023',
    dimensions: '30" x 30"',
    description: 'Layers of translucent blue glazes applied with a heat gun to build a fluid, high-gloss surface reminiscent of oceanic currents or cosmic dust.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '1:1',
    series: 'Luminous Geometries',
    story: 'By mixing industrial resins with fine French ultramarine pigments, the artist engineered a deep blue paint that has high structural depth. In high lighting, hidden details in the lower layers become fully luminous.',
    featured: true
  },
  {
    id: 'east-river-violet',
    title: 'Dusk Over East River',
    category: 'photography',
    medium: 'Archival pigment print on baryta',
    year: '1995',
    dimensions: '24" x 30"',
    description: 'A long-exposure landscape of the city silhouette across the water. The sky glows with a pale violet gradient, and bridge suspensions form a delicate lattice.',
    imageUrl: 'https://images.unsplash.com/photo-1492666673288-3c4b4576ad9a?auto=format&fit=crop&q=80&w=1200',
    aspectRatio: '4:3',
    series: 'New York Nocturnes',
    story: 'Captured on a cold November evening from the old piers in DUMBO before the park existed. The water is smoothed into glass by an 80-second exposure, highlighting the stillness of New York from a removed perspective.',
    featured: false
  }
];

export const ARTIST_BIOGRAPHY = {
  name: 'John Oquendo',
  born: '1952',
  based: 'New York / Brooklyn (formerly)',
  philosophy: 'To find the geometry of silence inside the noise of the city, and the organic movement of nature inside the confines of a rigid grid.',
  bioParagraphs: [
    'John Oquendo is an American painter and photographer whose multi-disciplinary practice spans over four decades. Born in New York, his artistic language was forged in the raw, industrial crucible of Soho and DUMBO in the late 1970s and 1980s, working alongside pioneering abstract expressionists and street realists.',
    'Oquendo\'s work explores the dialogue between painterly spontaneity and photographic precision. His early gelatin-silver photography documents the shifting grit, steam, and soaring perspectives of Manhattan nocturnes. Simultaneously, his large-scale abstract paintings translate these architectural rhythms, light flows, and textures into non-objective canvases using oil, plaster, graphite, and metallic leaf.',
    'Today, his work is held in numerous private and select public collections. He believes that a piece of art is not merely an image, but a physical presence—a quiet temple that alters the spatial and emotional texture of the room it inhabits.'
  ]
};
