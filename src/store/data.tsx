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
    id: 1,
    src: '/assets/images/foods/Food1.jpeg',
    name: "Cloud's Restaurant",
    location: 'San Juan',
    distance: '4 km',
    time: '10 mins',
    rating: 3,
    featuredFoods: [
      {
        id: 1,
        name: 'Crispy Pata',
        src: '/assets/images/foods/Food1.jpeg',
        price: 535.99
      },
      {
        id: 2,
        name: 'Pork Sisig',
        src: '/assets/images/foods/Food2.jpeg',
        price: 185.0
      },
      {
        id: 3,
        name: 'Halo-halo',
        src: '/assets/images/foods/Food3.jpeg',
        price: 105.25
      },
      {
        id: 4,
        name: 'Pancit Lucban',
        src: '/assets/images/foods/Food4.jpeg',
        price: 600.2
      }
    ]
  }
];

const categories: Category[] = [
  {
    name: 'Drinks',
    icon: <IcnCoffee />
  },
  {
    name: 'Food',
    icon: <IcnChicken />
  },
  {
    name: 'Dessert',
    icon: <IcnMuffin />
  },
  {
    name: 'Merienda',
    icon: <IcnFood />
  }
];

export const HomeData = {
  stores,
  categories
};
