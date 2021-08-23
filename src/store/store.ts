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
  currentFood: {
    food?: Food;
    variations?: Menu[];
  };
  loadStores: () => Promise<void>;
  loadStore: (id: number) => Promise<void>;
  loadCategories: () => Promise<void>;
  loadFood: (id: number) => Promise<void>;
  setSelectedCategory: (id: number) => void;
}

const loadStores = async () => {
  const response = await axios.get('/api/stores');
  vstore.stores = response.data;
};

const groupByType = (current: Menu[], item: Food) => {
  const typeId = item.type?.id || 0;
  const typeName = item.type?.name || '';
  const typeDescription = item.type?.description;
  if (!typeId && !typeName) {
    return current;
  }
  const exist = current.findIndex((currentItem) => currentItem.id === typeId);
  let currentIndex = exist;
  if (!~exist) {
    current = [
      ...current,
      {
        id: typeId,
        name: typeName,
        foodItems: [],
        description: typeDescription
      }
    ];
    currentIndex = current.length - 1;
  }
  current[currentIndex].foodItems.push(item);
  return current;
};

const loadStore = async (id: number) => {
  const response = await axios.get(`/api/stores/${id}`);
  const store: Store = response.data;
  vstore.currentStore.store = store;
  const menu: Menu[] = store.menu?.reduce(groupByType, []) || [];

  vstore.currentStore.menu = menu;
};

const loadCategories = async () => {
  const response = await axios.get('/api/categories');
  vstore.categories = response.data;
};

const loadFood = async (id: number) => {
  const response = await axios.get(`/api/foods/${id}`);
  const { variations = [], ...food } = response.data;
  vstore.currentFood.food = food;
  const menuVariations: Menu[] = variations.reduce(groupByType, []) || [];
  vstore.currentFood.variations = menuVariations;
};

const setSelectedCategory = (id: number) => {
  vstore.categories = vstore.categories.map((category: Category) => {
    category.selected = false;
    if (category.id === id) {
      category.selected = true;
    }
    return category;
  });
};

export const vstore = proxy<VStore>({
  stores: [],
  categories: [],
  currentStore: {},
  currentFood: {},
  loadStores,
  loadStore,
  loadCategories,
  loadFood,
  setSelectedCategory
});
