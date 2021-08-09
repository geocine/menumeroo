import { IonContent, IonPage } from '@ionic/react';
import { SearchHeader } from '../components';

const Order = () => {
  return (
    <IonPage>
      <SearchHeader showLocation={false} />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Order;
