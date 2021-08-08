import { IonContent, IonPage } from '@ionic/react';
import { ExploreContainer, SearchHeader } from '../components';

const Home: React.FC = () => {
  return (
    <IonPage>
      <SearchHeader />
      <IonContent fullscreen>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
