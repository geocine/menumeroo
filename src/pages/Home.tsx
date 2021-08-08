import { IonContent, IonPage } from '@ionic/react';
import { CategorySlider, ExploreContainer, SearchHeader } from '../components';

const Home: React.FC = () => {
  return (
    <IonPage>
      <SearchHeader />
      <IonContent fullscreen>
        <CategorySlider />
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
