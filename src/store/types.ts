import { ReactElement } from 'react';

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
  min?: number;
  max?: number;
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
  min?: number;
  max?: number;
}

export interface FoodVariation {
  id: number;
  name: string;
  price?: number;
  type?: FoodType;
}

export interface PaymentItem {
  label: string;
  icon: ReactElement;
  val: string;
  isChecked: boolean;
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
  addresses?: Address[];
}

export interface Address {
  id: number;
  name: string;
  address: string;
  city: string;
  details: string;
  isDefault: boolean;
}

export interface Discount {
  id: number;
  name: string;
  discountString: string;
  src: string;
  dateFrom: string; // Will come from json mm/dd/yyyy parse as Date
  dateTo: string; // Will come from json mm/dd/yyyy parse as Date
  checked: boolean;
  getTotalPrice?: (orders: StoreBasketItem[], totalPrice: number) => number;
}

export interface AuthResponse {
  userId: number;
  accessToken: string;
}
