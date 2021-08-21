import { IonContent, IonPage } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useSnapshot } from 'valtio';
import {
  CategorySlider,
  FoodSlider,
  SearchHeader,
  StoreCard,
  StoreCardSlider
} from '../components';
import { vstore } from '../store/store';

const HomePage = () => {
  const data = useSnapshot(vstore);
  const history = useHistory();

  const openStore = (id: number) => {
    history.push(`/store/${id}`);
  };

  useEffect(() => {
    const loadData = async () => {
      await data.loadStores();
      await data.loadCategories();
    };
    loadData();
  }, []);

  const onSelectCategory = (id: number) => {
    data.setSelectedCategory(id);
  };

  return (
    <IonPage>
      <SearchHeader showBack={false} />
      <IonContent fullscreen>
        <CategorySlider
          categories={data.categories}
          onSelect={(id) => onSelectCategory(id)}
        />
        {data.stores.map((store) => (
          <StoreCardSlider key={store.id}>
            <StoreCard
              store={store}
              size={125}
              onClick={(id) => openStore(id)}
            />
            <FoodSlider
              foods={store.menu || []}
              size={100}
              storeId={store.id}
              onClick={(id) => openStore(id)}
            />
          </StoreCardSlider>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
