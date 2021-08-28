import { IonContent, IonPage } from '@ionic/react';
import { Header } from '../components';

const MyListTab = () => {
  return (
    <IonPage>
      <Header showButton={true} type="back" title="My Basket" />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default MyListTab;
