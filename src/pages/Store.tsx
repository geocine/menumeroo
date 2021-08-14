import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header } from '../components';

const HeaderImage = styled.div`
  background-color: #eae8e8;
  height: 300px;
  margin-top: -82px;
`;

const Store = () => {
  return (
    <IonPage>
      <Header
        title="Store"
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <HeaderImage />
      </IonContent>
    </IonPage>
  );
};

export default Store;
