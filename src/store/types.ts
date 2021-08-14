import React from 'react';

export interface Store {
  name: string;
  location: string;
  src: string;
  distance?: string;
  time?: string;
  rating?: number;
  featuredFoods?: Food[];
}

export interface Food {
  label: string;
  src: string;
  price?: number;
}
export interface Category {
  label: string;
  icon: React.ReactNode;
}
