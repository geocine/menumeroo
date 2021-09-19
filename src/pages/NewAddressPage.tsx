import { IonPage, IonContent } from '@ionic/react';
import { Header } from '../components';

const NewAddressPage = () => {
  return (
    <IonPage>
      <Header
          title={`Add New Address`}
          showButton={true}
          type='back'
          style={{ background: 'transparent' }}
        />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default NewAddressPage;
