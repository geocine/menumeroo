export interface Store {
  id: number;
  name: string;
  location: string;
  src: string;
  distance?: string;
  time?: string;
  rating?: number;
  menu?: Food[];
}

export interface Menu {
  id: number;
  name: string;
  description?: string;
  choiceType?: 'multi' | 'single';
  foodItems: Food[];
}

export interface Food {
  id: number;
  name: string;
  src: string;
  description?: string;
  price?: number;
  featured?: boolean;
  type?: FoodType;
  chosen?: boolean;
  variations?: FoodVariation[];
}

export interface FoodType {
  id: number;
  name: string;
  description?: string;
}

export interface FoodVariation {
  id: number;
  name: string;
  price?: number;
  type?: FoodType;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  selected?: boolean;
}
