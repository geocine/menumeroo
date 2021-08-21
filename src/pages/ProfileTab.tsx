import { IonContent, IonPage } from '@ionic/react';
import { SearchHeader } from '../components';

const ProfileTab = () => {
  return (
    <IonPage>
      <SearchHeader showLocation={false} />
      <IonContent fullscreen></IonContent>
    </IonPage>
  );
};

export default ProfileTab;
