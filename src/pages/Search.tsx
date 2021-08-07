import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSearchbar,
  IonBackButton
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const Search = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton text="Search" icon="buttonIcon" />
          <IonSearchbar
            value=""
            placeholder="Search restaurants or dishes"
            onIonChange={() => {}}
            showCancelButton="always"
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Search;
