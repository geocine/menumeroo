import { proxy } from 'valtio';
import { derive, devtools } from 'valtio/utils';
import axios from 'axios';
import {
  Category,
  Food,
  Menu,
  Store,
  StoreBasket,
  StoreBasketItem
} from './types';

// TODO: separate slices properly
export interface VStore {
  stores: Store[];
  categories: Category[];
  currentStore: {
    store?: Store;
    menu?: Menu[];
  };
  currentFood: StoreBasketItem;
  basket: {
    items: StoreBasket[];
  };
  currentStoreBasket: {
    orders: StoreBasketItem[];
    totalPrice?: number; // derived
  };
  loadStores: () => Promise<void>;
  loadStore: (id: number) => Promise<void>;
  loadCategories: () => Promise<void>;
  loadFood: (id: number) => Promise<void>;
  setSelectedCategory: (id: number) => void;
  setSelectedVariation: (id: number, select: boolean) => void;
  addUpdateBasket: (storeBasketItem: StoreBasketItem) => void;
  updateMenu: () => void;
  removeFromBasket: (storeBasketItem: StoreBasketItem) => void;
  removeStoreBasket: (id: number) => void;
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
  const basket = vstore.basket.items.find((item) => item.id === id);
  vstore.currentStoreBasket.orders = basket?.orders || [];
  vstore.currentStore.menu = menu;
  updateMenu();
};

const loadCategories = async () => {
  const response = await axios.get('/api/categories');
  vstore.categories = response.data;
};

const loadFood = async (id: number) => {
  const response = await axios.get(`/api/foods/${id}`);
  const { variations = [], ...food } = response.data;
  vstore.currentFood.food = food;
  const foodInBasket = vstore.currentStoreBasket.orders.find(
    (basketItem) => basketItem.food?.id === id
  );

  const menuVariations: Menu[] = variations.reduce(groupByType, []) || [];

  if (!foodInBasket) {
    vstore.currentFood.multiplier = 1;
    vstore.currentFood.variations = menuVariations;
  } else {
    vstore.currentFood.multiplier = foodInBasket.multiplier;
    // TODO: variation data outdated
    vstore.currentFood.variations = foodInBasket.variations;
  }

  // TODO: if food page is refreshed , currentStore will be blank
  if (!vstore.currentStore.store?.id && food) {
    await loadStore(food.storeId);
  }
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

const setSelectedVariation = (id: number, selected: boolean) => {
  vstore.currentFood.variations = vstore.currentFood.variations?.map(
    (currentMenu: Menu) => {
      currentMenu.foodItems = currentMenu.foodItems?.map((foodItem) => {
        if (foodItem.id === id) {
          foodItem.chosen = selected;
        }
        return foodItem;
      });
      return currentMenu;
    }
  );
};

const addUpdateBasket = (storeBasketItem: StoreBasketItem) => {
  const store = vstore.currentStore.store;
  if (store) {
    let storeBasket = vstore.basket.items.find(
      (sBasket) => sBasket.id === store.id
    );
    if (!storeBasket) {
      storeBasket = {
        id: store?.id,
        location: store?.location,
        name: store?.name,
        src: store?.src,
        distance: store?.distance,
        time: store?.time,
        orders: [storeBasketItem]
      };
      vstore.basket.items.push(storeBasket);
    } else {
      // TODO: possible bug here on undefined value
      storeBasket.orders = storeBasket.orders || [];
      const order = storeBasket.orders.findIndex(
        (order) => order.food?.id === storeBasketItem.food?.id
      );
      if (~order) {
        storeBasket.orders[order] = storeBasketItem;
      } else {
        storeBasket.orders = [...(storeBasket.orders || []), storeBasketItem];
      }
    }
    vstore.currentStoreBasket.orders = storeBasket?.orders || [];
    updateMenu();
  }
};

const updateMenu = () => {
  vstore.currentStore.menu = vstore.currentStore.menu?.map((storeMenu) => {
    storeMenu.foodItems = storeMenu.foodItems.map((food) => {
      const foodInBasket = vstore.currentStoreBasket.orders.find(
        (basketItem) => basketItem.food?.id === food.id
      );
      if (foodInBasket) {
        food.multiplier = foodInBasket.multiplier;
      } else {
        food.multiplier = undefined;
      }
      return food;
    });
    return storeMenu;
  });
};

const removeFromBasket = (storeBasketItem: StoreBasketItem) => {
  const store = vstore.currentStore.store;
  if (store) {
    let storeBasket = vstore.basket.items.find(
      (sBasket) => sBasket.id === store.id
    );
    if (storeBasket) {
      storeBasket.orders = storeBasket.orders?.filter(
        (order) => order.food?.id !== storeBasketItem.food?.id
      );
      if ((storeBasket.orders?.length || 0) < 1) {
        vstore.basket.items = vstore.basket.items.filter(
          (sBasket) => sBasket.id !== store.id
        );
      }
    }
    vstore.currentStoreBasket.orders = storeBasket?.orders || [];
    updateMenu();
  }
};

const removeStoreBasket = (id: number) => {
  vstore.basket.items = vstore.basket.items.filter((item) => item.id !== id);
};

export const vstore = proxy<VStore>({
  stores: [],
  categories: [],
  currentStore: {},
  currentFood: {},
  basket: {
    items: []
  },
  currentStoreBasket: {
    orders: []
  },
  loadStores,
  loadStore,
  loadCategories,
  loadFood,
  setSelectedCategory,
  setSelectedVariation,
  addUpdateBasket,
  updateMenu,
  removeFromBasket,
  removeStoreBasket
});

// Derived totalPrice on currentStoreBasket slice
derive(
  {
    totalPrice: (get) => {
      const currentStoreBasket = get(vstore.currentStoreBasket);
      return currentStoreBasket.orders.reduce<number>(
        (ordersTotal: number, order: StoreBasketItem) => {
          return (ordersTotal += order?.totalPrice || 0);
        },
        0
      );
    }
  },
  {
    proxy: vstore.currentStoreBasket
  }
);

// Derived totalPrice on currentFood slice
derive(
  {
    totalPrice: (get) => {
      const currentFood = get(vstore.currentFood);
      const variationTotal =
        currentFood.variations?.reduce<number>(
          (varTotal: number, currentMenu: Menu) => {
            const foodItems = currentMenu.foodItems?.filter(
              (foodItem) => foodItem.chosen
            );
            return (
              varTotal +
              foodItems.reduce((total: number, food: Food) => {
                return total + (food?.price || 0);
              }, 0)
            );
          },
          0
        ) || 0;
      return (
        ((currentFood.food?.price || 0) + variationTotal) *
        (currentFood.multiplier || 1)
      );
    },
    inBasket: (get) => {
      const currentFood = get(vstore.currentFood);
      const currentStoreBasket = get(vstore.currentStoreBasket);
      return ~currentStoreBasket.orders.findIndex(
        (order) => order.food?.id === currentFood.food?.id
      );
    }
  },
  {
    proxy: vstore.currentFood
  }
);

devtools(vstore, 'vstore');
