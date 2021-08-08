import { IonContent, IonPage } from '@ionic/react';
import { CategorySlider, FoodSlider, SearchHeader } from '../components';

const Home: React.FC = () => {
  return (
    <IonPage>
      <SearchHeader />
      <IonContent fullscreen>
        <CategorySlider />
        <FoodSlider />
      </IonContent>
    </IonPage>
  );
};

export default Home;
