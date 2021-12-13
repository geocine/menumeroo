import styled from '@emotion/styled/macro';
import { IonPage, IonContent } from '@ionic/react';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { Header } from '../components';
import { getPayment } from '../store/constants';
import { vstore } from '../store/store';

const Container = styled.div`
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 30px;

  svg {
    width: 100px;
    height: auto;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }
`;

const StorePaymentPage = () => {
  const data = useSnapshot(vstore);
  const [payment] = useState(getPayment(data.currentStoreBasket.paymentMethod));

  return (
    <IonPage>
      <Header showButton={true} type="close" title="Payment" />
      <IonContent fullscreen>
        <Container>
          {payment?.icon}
          <p>
            You will be redirected to {payment?.label} to complete your purchase
            securely.
          </p>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default StorePaymentPage;
