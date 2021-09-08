// Home Data
import { Category, Store, UserProfile } from '../store/types';

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
        name: 'Pancit',
        description: 'Pancit for long life',
        src: '/assets/images/foods/Food4.jpeg',
        price: 120,
        featured: true,
        type: {
          id: 1,
          name: 'Breakfast'
        },
        variations: [
          {
            id: 1,
            name: 'Add on Shrimp',
            price: 20,
            type: {
              id: 1,
              description: 'Optional',
              name: 'Addons'
            }
          },
          {
            id: 2,
            name: 'Add on Pork Cutlet',
            price: 40,
            type: {
              id: 1,
              description: 'Optional',
              name: 'Addons'
            }
          }
        ]
      },
      {
        id: 3,
        name: 'Sisig Hooray',
        description: 'Sisig w/ egg',
        src: '/assets/images/foods/Food2.jpeg',
        price: 125.25,
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
    id: 1,
    name: 'Drinks',
    icon: 'coffee'
  },
  {
    id: 2,
    name: 'Food',
    icon: 'chicken'
  },
  {
    id: 3,
    name: 'Dessert',
    icon: 'muffin'
  },
  {
    id: 4,
    name: 'Merienda',
    icon: 'food'
  }
];

export const user: UserProfile = {
  name: 'Jack Sparrow',
  phoneNumber: '9051234567',
  email: 'jack@menumeroo.com'
};
