import { IonPage, IonContent } from '@ionic/react';
import { Header } from '../components';

const NewAddressPage = () => {
  return (
    <IonPage>
      <Header showButton={true} type="close" title="Page" />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default NewAddressPage;
