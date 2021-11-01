import axios from 'axios';
import { rest } from 'msw';
import { Food, Store, User } from '../store/types';

const baseUrl = 'https://mmcdn.netlify.app';

export const handlers = [
  rest.get('/api/stores', async (req, res, ctx) => {
    const stores = await axios.get(`${baseUrl}/data/stores.json`);
    stores.data = stores.data.map((store: Store) => {
      store.src = `${baseUrl}${store.src}`;
      return store;
    });
    return res(ctx.status(200), ctx.json(stores.data));
  }),
  rest.get('/api/stores/:storeId', async (req, res, ctx) => {
    const { storeId } = req.params;
    const stores = await axios.get(`${baseUrl}/data/stores.json`);
    stores.data = stores.data.map((store: Store) => {
      store.src = `${baseUrl}${store.src}`;
      return store;
    });
    return res(
      ctx.status(200),
      ctx.json(
        stores.data.find((store: Store) => store.id === parseInt(storeId))
      )
    );
  }),
  rest.get('/api/stores/:storeId/foods', async (req, res, ctx) => {
    const { storeId } = req.params;
    const foods = await axios.get(`${baseUrl}/data/foods.json`);
    let menu: Food[] = foods.data.filter(
      (food: Food) => food.storeId === parseInt(storeId)
    );
    menu = menu.map((food: Food) => {
      food.src = `${baseUrl}${food.src}`;
      return food;
    });
    return res(ctx.status(200), ctx.json(menu));
  }),
  rest.get('/api/foods/:foodId', async (req, res, ctx) => {
    const { foodId } = req.params;
    const foods = await axios.get(`${baseUrl}/data/foods.json`);
    const result = foods.data.find(
      (food: Food) => food.id === parseInt(foodId)
    );
    result.src = `${baseUrl}${result.src}`;
    return res(ctx.status(200), ctx.json(result));
  }),
  rest.get('/api/categories', async (req, res, ctx) => {
    const categories = await axios.get(`${baseUrl}/data/categories.json`);
    return res(ctx.status(200), ctx.json(categories.data));
  }),
  rest.post('/api/auth', async (req, res, ctx) => {
    const { username, password } = req.body as any;
    const allUsers = localStorage.getItem('users');
    const users = JSON.parse(allUsers || '[]');
    const user: User = users.find(
      (user: User) => user.username === username
    );
    if(user){
      const bcrypt = require('bcryptjs');
      const doesPasswordMatch = bcrypt.compareSync(password, user.password);
      if(doesPasswordMatch){
        return res(ctx.status(200), ctx.json(user));
      }
    }
    return res(ctx.status(401), ctx.json({user,message:'Incorrect username or password'}));
  }),
  rest.get('/api/users',  async (req, res, ctx) => { 
    const users = await axios.get(`${baseUrl}/data/users.json`);
    return res(ctx.status(200), ctx.json(users.data));
  }),
  // :id is userId: number
  rest.get('/api/users/:userId', async (req, res, ctx) => {
    const { userId } = req.params;
    const users = await axios.get(`${baseUrl}/data/users.json`);
    const user: User = users.data.find(
      (user: User) => user.id === parseInt(userId)
    );
    user.avatar = `${baseUrl}${user.avatar}`;
    return res(ctx.status(200), ctx.json(user));
  }),
  rest.put<User>('/api/users/:userId', (req, res, ctx) => {
    // TODO: utitlize local storage because cannot do anything on post, data is mock data
    return res(ctx.status(200), ctx.json({}));
  }),
  rest.post<User>('/api/users', (req, res, ctx) => {
    // get data from req.body
    return res(ctx.status(200), ctx.json({}));
  })
];
