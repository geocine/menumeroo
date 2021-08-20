import { IonContent, IonPage } from '@ionic/react';
import { Header } from '../components';

const Order = () => {
  return (
    <IonPage>
      <Header title="Order" showButton={true} type="close" />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default Order;
