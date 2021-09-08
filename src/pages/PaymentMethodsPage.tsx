import styled from '@emotion/styled/macro';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { Header, Button, Input, Subtitle } from '../components';
import { IcnNext, IcnPayment, IcnAdd } from '../components/Icon/Icon';
import { useHistory } from 'react-router';

const PaymentMethodLink = styled.div`
  display: block;
  font-family: 'AvenirLTStd';
  font-size: 16px;
  text-align: left;
  margin-left: 30px;
  color: #2a3b56;
  margin-top: 20px;
  margin-bottom: 30px;

  label {
    margin-left: 10px;
  }
  
  .icon {
    float: right;
    margin-right: 30px;
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
        <PaymentMethodLink onClick={() => {addPayment();}}>
          <IcnPayment />
            <label>Add new payment method</label>
            <span className='icon'>
              <IcnAdd />
            </span>
        </PaymentMethodLink>
      </IonContent>
    </IonPage>
  );
};

export default PaymentMethodsPage;
