import React from 'react';

export interface Store {
  id: number;
  name: string;
  location: string;
  src: string;
  distance?: string;
  time?: string;
  rating?: number;
  featuredFoods?: Food[];
}

export interface Food {
  id: number;
  name: string;
  src: string;
  description?: string;
  price?: number;
}
export interface Category {
  name: string;
  icon: React.ReactNode;
  selected?: boolean;
}

export interface StoreMenu {
  group: string;
  foodItems: Food[];
}
