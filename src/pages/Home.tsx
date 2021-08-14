import { IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
import {
  CategorySlider,
  FoodSlider,
  SearchHeader,
  StoreCard,
  StoreCardSlider
} from '../components';
import { HomeData } from '../store/data';

const { categories, stores } = HomeData;

const Home = () => {
  let history = useHistory();
  const openStore = (id: number) => {
    history.push(`/tabs/store/${id}`);
  };

  return (
    <IonPage>
      <SearchHeader showBack={false} />
      <IonContent fullscreen>
        <CategorySlider categories={categories} />
        {stores.map((store) => (
          <StoreCardSlider key={store.id}>
            <StoreCard
              store={store}
              size={125}
              onClick={(id) => openStore(id)}
            />
            <FoodSlider
              foods={store.featuredFoods || []}
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

export default Home;
