import { IonContent, IonPage } from '@ionic/react';
import { Header, StoreCard } from '../components';

const Order = () => {
  return (
    <IonPage>
      <Header title="Order" showButton={true} type="close" />
      <IonContent fullscreen>
        <StoreCard
          src="/assets/images/foods/Food1.jpeg"
          name="My Store"
          location="San Juan"
          distance="4 km"
          time="10 mins"
          rating={3}
        />
      </IonContent>
    </IonPage>
  );
};

export default Order;
