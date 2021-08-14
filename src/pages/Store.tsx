import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header } from '../components';

const HeaderImage = styled.div`
  background-color: #666;
  height: 200px;
`;

const Store = () => {
  return (
    <IonPage>
      <Header title="Store" showButton={true} type="back" />
      <IonContent fullscreen>
        <HeaderImage />
      </IonContent>
    </IonPage>
  );
};

export default Store;
