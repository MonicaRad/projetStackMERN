export type Movie = {
  id: string;
  title: string;
  description: string;
  year: number;
  director: string;
  genre?: string;
  duration?: number;
  createdAt: string;
  active?: boolean;
  price: number;
  poster?: string;
};
