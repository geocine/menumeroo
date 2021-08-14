import { IonContent, IonPage } from '@ionic/react';
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
  return (
    <IonPage>
      <SearchHeader />
      <IonContent fullscreen>
        <CategorySlider categories={categories} />
        {stores.map((store, idx) => (
          <StoreCardSlider key={idx}>
            <StoreCard
              src={store.src}
              name={store.name}
              location={store.location}
              distance={store.distance}
              time={store.time}
              rating={store.rating}
              size={125}
            />
            <FoodSlider foods={store.featuredFoods || []} size={100} />
          </StoreCardSlider>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Home;
