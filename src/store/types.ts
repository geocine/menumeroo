import React from 'react';

export interface Food {
  label: string;
  src: string;
  price?: number;
}

export interface Category {
  label: string;
  icon: React.ReactNode;
}
