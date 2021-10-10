import { proxy, subscribe } from 'valtio';
import { derive, devtools } from 'valtio/utils';
import axios from 'axios';
import {
  Category,
  Food,
  Menu,
  Store,
  StoreBasket,
  StoreBasketItem,
  User
} from './types';

export interface VStore {
  home: {
    stores: Store[];
    categories: Category[];
    setSelectedCategory: (id: number) => void;
    loadStores: () => Promise<void>;
    loadCategories: () => Promise<void>;
  };
  currentStore: {
    store?: Store;
    menu?: Menu[];
    inStore: boolean;
    loadStore: (id: number) => Promise<void>;
    getFoodDetails: (id: number) => Food | null;
    clearStore: () => void;
  };
  currentFood: StoreBasketItem & {
    loadFood: (id: number, itemId?: number) => Promise<void>;
    setSelectedVariation: (id: number, select: boolean) => void;
    clearFood: () => void;
  };
  basket: {
    items: StoreBasket[];
    addUpdateBasket: (storeBasketItem: StoreBasketItem) => void;
    removeFromBasket: (storeBasketItem: StoreBasketItem) => void;
    setNote: (storeBasketItem: StoreBasketItem, note: string) => void;
  };
  currentStoreBasket: {
    paymentMethod: string;
    orders: StoreBasketItem[];
    totalPrice?: number; // derived
    removeStoreBasket: (id: number) => void;
    ordersInBasket: (foodId: number) => number;
    loadStoreBasket: (id: number) => void;
    clearStoreBasket: () => void;
  };
  user: {
    profile?: User;
    loadProfile: (id: number) => Promise<void>;
    saveProfile: () => Promise<void>;
  };
}

// Home

const setSelectedCategory = (id: number) => {
  vstore.home.categories = vstore.home.categories.map((category: Category) => {
    category.selected = false;
    if (category.id === id) {
      category.selected = true;
    }
    return category;
  });
};

const loadStores = async () => {
  const response = await axios.get<Store[]>('/api/stores');
  const stores = response.data;
  for (let store of stores) {
    const menuResponse = await axios.get<Food[]>(
      `/api/stores/${store.id}/foods`
    );
    store.menu = menuResponse.data;
  }
  vstore.home.stores = stores;
};

const loadCategories = async () => {
  const response = await axios.get('/api/categories');
  vstore.home.categories = response.data;
};

// Store

const loadStore = async (id: number) => {
  const response = await axios.get<Store>(`/api/stores/${id}`);
  const store: Store = response.data;
  const menuResponse = await axios.get<Food[]>(`/api/stores/${id}/foods`);
  store.menu = menuResponse.data;
  vstore.currentStore.store = store;
  const menu: Menu[] = store.menu?.reduce(groupByType, []) || [];
  vstore.currentStore.menu = menu;
};

const getFoodDetails = (id: number): Food | null => {
  for (let menu of vstore.currentStore.menu || []) {
    for (let food of menu.foodItems) {
      if (food.id === id) {
        return food;
      }
    }
  }
  return null;
};

const clearStore = () => {
  vstore.currentStore.menu = [];
  vstore.currentStore.store = {
    id: 0,
    name: '',
    location: '',
    src: ''
  };
};

// Food

const loadFood = async (id: number, itemId?: number) => {
  const response = await axios.get(`/api/foods/${id}`);
  const { variations = [], ...food } = response.data;
  // vstore.currentFood.id = itemId || 0;
  vstore.currentFood.food = food;

  const foodInBasket = vstore.currentStoreBasket.orders.find(
    (basketItem) => basketItem.id === itemId && basketItem.food?.id === id
  );

  const menuVariations: Menu[] = variations.reduce(groupByType, []) || [];

  if (!foodInBasket) {
    vstore.currentFood.id = 0;
    vstore.currentFood.multiplier = 1;
    vstore.currentFood.variations = menuVariations;
    vstore.currentFood.note = '';
  } else {
    vstore.currentFood.id = itemId || 0;
    vstore.currentFood.multiplier = foodInBasket.multiplier;
    // TODO: variation data outdated
    vstore.currentFood.variations = foodInBasket.variations;
    vstore.currentFood.note = foodInBasket.note;
  }

  // TODO: if food page is refreshed , currentStore will be blank
  if (!vstore.currentStore.store?.id && food) {
    await loadStore(food.storeId);
  }
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

const clearFood = () => {
  vstore.currentFood.multiplier = 1;
  vstore.currentFood.variations = [];
  vstore.currentFood.note = '';
  vstore.currentFood.food = {
    id: 0,
    name: '',
    src: ''
  };
};

// Basket

const addUpdateBasket = (storeBasketItem: StoreBasketItem) => {
  const currentStoreBasketItem = { ...storeBasketItem };
  const store = vstore.currentStore.store;
  if (store) {
    let storeBasket = vstore.basket.items.find(
      (sBasket) => sBasket.id === store.id
    );
    if (!storeBasket) {
      currentStoreBasketItem.id = 1;
      vstore.currentFood.id = 1;
      // creates a storeBasket to store the basket of the store
      storeBasket = {
        id: store?.id,
        location: store?.location,
        name: store?.name,
        src: store?.src,
        distance: store?.distance,
        time: store?.time,
        orders: [currentStoreBasketItem]
      };
      vstore.basket.items.push(storeBasket);
    } else {
      // TODO: possible bug here on undefined value
      storeBasket.orders = storeBasket.orders || [];
      const order = storeBasket.orders.findIndex(
        (order) => order.id === currentStoreBasketItem.id
      );
      if (~order) {
        storeBasket.orders[order] = currentStoreBasketItem;
      } else {
        currentStoreBasketItem.id = generateId(storeBasket.orders);
        storeBasket.orders = [
          ...(storeBasket.orders || []),
          currentStoreBasketItem
        ];
      }
    }
    vstore.currentStoreBasket.orders = storeBasket?.orders || [];
  }
};

const removeFromBasket = (storeBasketItem: StoreBasketItem) => {
  const store = vstore.currentStore.store;
  if (store) {
    let storeBasket = vstore.basket.items.find(
      (sBasket) => sBasket.id === store.id
    );
    if (storeBasket) {
      storeBasket.orders = storeBasket.orders?.filter(
        (order) => order.id !== storeBasketItem.id
      );
      if ((storeBasket.orders?.length || 0) < 1) {
        vstore.basket.items = vstore.basket.items.filter(
          (sBasket) => sBasket.id !== store.id
        );
      }
    }
    vstore.currentStoreBasket.orders = storeBasket?.orders || [];
  }
};

const setNote = (storeBasketItem: StoreBasketItem, note: string) => {
  if (!note) {
    return;
  }
  const store = vstore.currentStore.store;
  if (store) {
    let storeBasket = vstore.basket.items.find(
      (sBasket) => sBasket.id === store.id
    );
    if (storeBasket) {
      const item = storeBasket.orders?.find(
        (order) => order.id === storeBasketItem.id
      );
      if (item) {
        item.note = note;
      }
    }
  }
  if (
    storeBasketItem.id === vstore.currentFood.id &&
    storeBasketItem.food?.id === vstore.currentFood.food?.id
  ) {
    vstore.currentFood.note = note;
  }
};

// Store Basket

const removeStoreBasket = (id: number) => {
  vstore.basket.items = vstore.basket.items.filter((item) => item.id !== id);
};

const ordersInBasket = (foodId: number): number => {
  return vstore.currentStoreBasket.orders.reduce<number>(
    (ordersTotal: number, item: StoreBasketItem) => {
      if (item.food?.id === foodId) {
        ordersTotal += item.multiplier || 0;
      }
      return ordersTotal;
    },
    0
  );
};

const loadStoreBasket = (id: number) => {
  const basket = vstore.basket.items.find((item) => item.id === id);
  vstore.currentStoreBasket.orders = basket?.orders || [];
};

const clearStoreBasket = () => {
  vstore.currentStoreBasket.orders = [];
};

// Users

const loadProfile = async () => {
  const response = await axios.get('/api/users/1');
  vstore.user.profile = response.data;
};

const saveProfile = async () => {
  await axios.put('/api/users/1', vstore.user.profile);
};

// Helpers

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

const generateId = (items: any[]) => {
  // this is a dummy id generator
  return items[items.length - 1].id + 1;
};

// Exports
const basketItems = localStorage.getItem('basketItems');
const initialState: VStore = {
  home: {
    stores: [],
    categories: [],
    setSelectedCategory,
    loadStores,
    loadCategories
  },
  currentStore: {
    store: undefined,
    menu: [],
    inStore: false,
    loadStore,
    getFoodDetails,
    clearStore
  },
  currentFood: {
    id: 0,
    loadFood,
    setSelectedVariation,
    clearFood
  },
  basket: {
    items: JSON.parse(basketItems || '[]'),
    addUpdateBasket,
    removeFromBasket,
    setNote
  },
  currentStoreBasket: {
    paymentMethod: 'paypal',
    orders: [],
    removeStoreBasket,
    ordersInBasket,
    loadStoreBasket,
    clearStoreBasket
  },
  user: {
    profile: undefined,
    loadProfile,
    saveProfile
  }
};

export const vstore = proxy<VStore>(initialState);

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
    }
  },
  {
    proxy: vstore.currentFood
  }
);

devtools(vstore, 'vstore');

subscribe(vstore, () => {
  localStorage.setItem('basketItems', JSON.stringify(vstore.basket.items));
});
