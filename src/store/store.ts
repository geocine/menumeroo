import { proxy } from 'valtio';
import axios from 'axios';
import { Category, Food, Menu, Store } from './types';

export interface VStore {
  stores: Store[];
  categories: Category[];
  currentStore: {
    store?: Store;
    menu?: Menu[];
  };
  currentFood: Food;
  loadStores: () => void;
  loadStore: (id: number) => void;
  loadCategories: () => void;
  loadFood: (id: number) => void;
}

const loadStores = async () => {
  const response = await axios.get('/api/stores');
  vstore.stores = response.data;
};

const loadStore = async (id: number) => {
  const response = await axios.get(`/api/stores/${id}`);
  const store: Store = response.data;
  vstore.currentStore.store = store;
  const menu: Menu[] =
    store.menu?.reduce((current: Menu[], item) => {
      const typeId = item.type?.id || 0;
      const typeName = item.type?.name || '';
      if (!typeId && !typeName) {
        return current;
      }
      const exist = current.findIndex(
        (currentItem) => currentItem.id === typeId
      );
      let currentIndex = exist;
      if (!~exist) {
        current = [...current, { id: typeId, name: typeName, foodItems: [] }];
        currentIndex = current.length - 1;
      }
      current[currentIndex].foodItems.push(item);
      return current;
    }, []) || [];

  vstore.currentStore.menu = menu;
};

const loadCategories = async () => {
  const response = await axios.get('/api/categories');
  vstore.categories = response.data;
};

const loadFood = async (id: number) => {
  const response = await axios.get(`/api/food/${id}`);
  vstore.currentFood = response.data;
};

export const vstore = proxy<VStore>({
  stores: [],
  categories: [],
  currentStore: {},
  currentFood: {
    id: 0,
    src: '#',
    name: ''
  },
  loadStores,
  loadStore,
  loadCategories,
  loadFood
});
