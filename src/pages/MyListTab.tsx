import { IonContent, IonPage } from '@ionic/react';
import { SearchHeader } from '../components';

const MyListTab = () => {
  return (
    <IonPage>
      <SearchHeader showLocation={false} />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default MyListTab;
