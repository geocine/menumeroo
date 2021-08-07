import {
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonList,
  IonItem,
  IonMenuButton,
  IonButtons,
  IonHeader
} from '@ionic/react';
import { ExploreContainer, LocationTitle } from '../components';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonToolbar style={{ outline: '1px solid black' }}>
        <IonButtons slot="start">
          <IonMenuButton autoHide={false} menu="side" />
        </IonButtons>
        <LocationTitle title="Current Location" location="San Juan" />
      </IonToolbar>
      <IonMenu menuId="side" contentId="menu-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Start Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="menu-content">
          <IonList>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
            <IonItem>Menu Item</IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonContent fullscreen>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
