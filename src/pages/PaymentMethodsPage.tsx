import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Subtitle, Check } from '../components';
import { IcnPaypal, IcnGCash, IcnGrabPay, IcnPayMaya } from '../components/Icon/Icon';
import { useHistory } from 'react-router';

const PaymentMethodLink = styled.div`
  display: flex;
  font-family: 'AvenirLTStd';
  font-size: 16px;
  text-align: left;
  color: #2a3b56;
  margin: 20px 30px 30px 30px;
  align-items: center;

  label {
    margin-left: 10px;
  }

  .check-mark {
    margin-left: auto;
  }
`;


const StyleTitleSection = styled.div`
  margin: 30px auto;
`;

const PaymentMethodsPage = () => {
  let history = useHistory();

  const addPayment = () => {
    history.push(`/profile/payment-methods`);
  };
  return (
    <IonPage>
      <Header
        title="Add Payment Method"
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyleTitleSection>
          <Subtitle text="Choose payment method to add"/>
        </StyleTitleSection>
        <PaymentMethodLink>
          <IcnPaypal/> 
          <label>Paypal</label>
          <span className="check-mark"><Check status="On"/></span>
        </PaymentMethodLink>
        <PaymentMethodLink>
          <IcnGCash/> 
          <label>GCash</label>
          <span className="check-mark"><Check status="Off"/></span>
        </PaymentMethodLink>
        <PaymentMethodLink>
          <IcnGrabPay/>  
          <label>GrabPay</label>
          <span className="check-mark"><Check status="Off"/></span>
        </PaymentMethodLink>
        <PaymentMethodLink>
          <IcnPayMaya/>
          <label>PayMaya</label>
          <span className="check-mark"><Check status="Off"/></span>
        </PaymentMethodLink>
      </IonContent>
    </IonPage>
  );
};

export default PaymentMethodsPage;
