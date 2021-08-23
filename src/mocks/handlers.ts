import { rest } from 'msw';
import { Food } from '../store/types';
import { categories, stores } from './data';

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
    const foods: Food[] = stores.reduce(
      (foodList: Food[], store) => [...foodList, ...(store.menu || [])],
      []
    );
    const result = foods.find((food) => food.id === parseInt(foodId));
    return res(ctx.status(200), ctx.json(result));
  }),
  rest.get('/api/categories', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(categories));
  })
];
