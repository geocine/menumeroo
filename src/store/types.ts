// TODO: separate API types vs App types
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

export interface StoreBasket {
  id: number;
  name: string;
  location: string;
  src: string;
  distance?: string;
  time?: string;
  orders?: StoreBasketItem[];
}

export interface StoreBasketItem {
  id: number;
  food?: Food;
  note?: string;
  variations?: Menu[];
  multiplier?: number;
  totalPrice?: number; // derived
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
  chosen?: boolean; // kinda confusing chosen variation is here
  multiplier?: number; // there is another multipler on top level for viewing
  storeId?: number; // property coming from API
  variations?: FoodVariation[]; // property coming from API
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

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  avatar: string;
  [key: string]: any; // need this to be able to dynamically address string properties
}
