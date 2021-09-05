import { rest } from 'msw';
import { Food, Store, UserProfile } from '../store/types';
import { categories, stores, user } from './data';

const userData = {
  profile: user
};

export const handlers = [
  rest.get('/api/stores', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(stores));
  }),
  rest.get('/api/stores/:storeId', (req, res, ctx) => {
    const { storeId } = req.params;
    return res(
      ctx.status(200),
      ctx.json(stores.find((store) => store.id === parseInt(storeId)))
    );
  }),
  rest.get('/api/foods/:foodId', (req, res, ctx) => {
    const { foodId } = req.params;
    const foods: Food[] = stores.reduce((foodList: Food[], store: Store) => {
      let storeMenu = store.menu || [];
      storeMenu = storeMenu.map((menu) => {
        menu.storeId = store.id;
        return menu;
      });
      return [...foodList, ...storeMenu];
    }, []);
    const result = foods.find((food) => food.id === parseInt(foodId));
    return res(ctx.status(200), ctx.json(result));
  }),
  rest.get('/api/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(categories));
  }),
  // :id is userId: number
  rest.get('/api/users/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userData.profile));
  }),
  rest.post<UserProfile>('/api/users/:id', (req, res, ctx) => {
    userData.profile = req.body;
    return res(ctx.status(200), ctx.json(userData.profile));
  })
];
