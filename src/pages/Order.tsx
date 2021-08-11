import { IonContent, IonPage } from '@ionic/react';
import { FoodSlider, Header, StoreCard } from '../components';

const Order = () => {
  return (
    <IonPage>
      <Header title="Order" showButton={true} type="close" />
      <IonContent fullscreen>
        <FoodSlider />
        <StoreCard
          src="/assets/images/foods/Food1.jpeg"
          name="My Store"
          location="San Juan"
        />
      </IonContent>
    </IonPage>
  );
};

export default Order;
