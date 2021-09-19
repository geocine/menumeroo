import { IonPage, IonContent } from '@ionic/react';
import { Header } from '../components';

const OrdersTab = () => {
  return (
    <IonPage>
      <Header showButton={true} type="close" title="Orders" />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default OrdersTab;
