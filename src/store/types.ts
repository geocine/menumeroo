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
  variations?: FoodVariation;
}

export interface FoodType {
  id: number;
  name: string;
}

export interface FoodVariation {
  id: number;
  name: string;
  price?: number;
  type?: FoodVariationType;
}

export interface FoodVariationType {
  id: number;
  name: string;
  description: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  selected?: boolean;
}
