import { IonContent, IonPage } from '@ionic/react';
import { FoodSlider, Header } from '../components';

const Order = () => {
  return (
    <IonPage>
      <Header title="Order" showButton={true} type="close" />
      <IonContent fullscreen>
        <FoodSlider />
      </IonContent>
    </IonPage>
  );
};

export default Order;
