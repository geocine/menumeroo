// Home Data
import {
  IcnCoffee,
  IcnChicken,
  IcnMuffin,
  IcnFood
} from '../components/Icon/Icon';
import { Category, Store } from './types';

const stores: Store[] = [
  {
    src: '/assets/images/foods/Food1.jpeg',
    name: 'My Store',
    location: 'San Juan',
    distance: '4 km',
    time: '10 mins',
    rating: 3,
    featuredFoods: [
      {
        label: 'Crispy Pata',
        src: '/assets/images/foods/Food1.jpeg',
        price: 535.99
      },
      {
        label: 'Pork Sisig',
        src: '/assets/images/foods/Food2.jpeg',
        price: 185.0
      },
      {
        label: 'Halo-halo',
        src: '/assets/images/foods/Food3.jpeg',
        price: 105.25
      },
      {
        label: 'Pancit Lucban',
        src: '/assets/images/foods/Food4.jpeg',
        price: 600.2
      }
    ]
  }
];

const categories: Category[] = [
  {
    label: 'Drinks',
    icon: <IcnCoffee />
  },
  {
    label: 'Food',
    icon: <IcnChicken />
  },
  {
    label: 'Dessert',
    icon: <IcnMuffin />
  },
  {
    label: 'Merienda',
    icon: <IcnFood />
  }
];

export const HomeData = {
  stores,
  categories
};
