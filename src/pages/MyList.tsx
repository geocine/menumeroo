import { IonContent, IonPage } from '@ionic/react';
import { SearchHeader } from '../components';

const MyList = () => {
  return (
    <IonPage>
      <SearchHeader showLocation={false} />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default MyList;
