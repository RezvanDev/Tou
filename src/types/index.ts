export interface City {
  id: string;
  name: string;
  image: string;
  region: string;
  shortDescription: string;
  description: string;
  attractions: string[];
  /**
   * Необязательные изображения для каждой достопримечательности по порядку.
   * Если заданы, будут показаны рядом с названием достопримечательности.
   */
  attractionImages?: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
} 