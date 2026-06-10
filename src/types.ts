export type ArtCategory = 'abstract' | 'photography';

export interface Artwork {
  id: string;
  title: string;
  category: ArtCategory;
  medium: string;
  year: string;
  dimensions: string;
  description: string;
  imageUrl: string;
  aspectRatio: '1:1' | '3:4' | '4:3' | '16:9';
  series: string;
  story: string;
  featured?: boolean;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  location: string;
  message: string;
  timestamp: string;
}

export interface Inquiry {
  id: string;
  artworkId: string;
  artworkTitle: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
