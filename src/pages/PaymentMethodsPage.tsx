import styled from '@emotion/styled/macro';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { Header, Button, Input, Subtitle, Check } from '../components';
import { IcnNext, IcnPayment, IcnAdd, IcnPaypal, IcnGrabPay } from '../components/Icon/Icon';
import { useHistory } from 'react-router';

const PaymentMethodLink = styled.div`
  display: block;
  font-family: 'AvenirLTStd';
  font-size: 16px;
  text-align: left;
  color: #2a3b56;
  margin: 20px 30px 30px 30px;

  label {
    margin-left: 10px;
  }
  
  .icon {
    float: right;
    margin-right: 30px;
  }

  .check-mark {
    float: right;
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
          <img src="/assets/images/gcash.png" alt="avatar"></img> 
          <label>GCash</label>
          <span className="check-mark"><Check status="Off"/></span>
        </PaymentMethodLink>
        <PaymentMethodLink>
          <img src="/assets/images/grabpay.png" alt="avatar"></img> 
          <label>GrabPay</label>
          <span className="check-mark"><Check status="Off"/></span>
        </PaymentMethodLink>
        <PaymentMethodLink>
          <img src="/assets/images/paymaya.png" alt="avatar"></img> 
          <label>PayMaya</label>
          <span className="check-mark"><Check status="Off"/></span>
        </PaymentMethodLink>
      </IonContent>
    </IonPage>
  );
};

export default PaymentMethodsPage;
