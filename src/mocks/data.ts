// Home Data
import { Category, Store } from '../store/types';

export const stores: Store[] = [
  {
    id: 1,
    src: '/assets/images/foods/Food1.jpeg',
    name: "Cloud's Restaurant",
    location: 'San Juan',
    distance: '4 km',
    time: '10 mins',
    rating: 3,
    menu: [
      {
        id: 1,
        name: 'Pork',
        description: 'Pork fried in oil',
        src: '/assets/images/foods/Food1.jpeg',
        price: 150,
        featured: true,
        type: {
          id: 1,
          name: 'Breakfast'
        }
      },
      {
        id: 2,
        name: 'Pork Chop',
        description: 'Pork fried in olive oil',
        src: '/assets/images/foods/Food1.jpeg',
        price: 500,
        featured: true,
        type: {
          id: 1,
          name: 'Breakfast'
        }
      },
      {
        id: 3,
        name: 'Sisig Hooray',
        description: 'Sisig w/ egg',
        src: '/assets/images/foods/Food2.jpeg',
        price: 125,
        featured: true,
        type: {
          id: 2,
          name: 'Popular'
        }
      },
      {
        id: 4,
        name: 'Halo-Halo',
        description: 'National dessert',
        src: '/assets/images/foods/Food3.jpeg',
        price: 70,
        featured: true,
        type: {
          id: 2,
          name: 'Popular'
        }
      }
    ]
  }
];

export const categories: Category[] = [
  {
    name: 'Drinks',
    icon: 'coffee'
  },
  {
    name: 'Food',
    icon: 'chicken'
  },
  {
    name: 'Dessert',
    icon: 'muffin'
  },
  {
    name: 'Merienda',
    icon: 'food'
  }
];
