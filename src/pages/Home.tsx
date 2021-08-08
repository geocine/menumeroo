import { IonContent, IonPage } from '@ionic/react';
import {
  Button,
  CategorySlider,
  FoodSlider,
  SearchHeader
} from '../components';

const Home: React.FC = () => {
  return (
    <IonPage>
      <SearchHeader />
      <IonContent fullscreen>
        <CategorySlider />
        <FoodSlider />
        <Button type="primary">Sign In</Button>
        <Button type="secondary">Sign Up</Button>
      </IonContent>
    </IonPage>
  );
};

export default Home;
