export interface City {
  id: string;
  name: string;
  image: string;
  region: string;
  shortDescription: string;
  description: string;
  attractions: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
} 