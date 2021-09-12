import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header } from '../components';
import { IcnPayment, IcnAdd } from '../components/Icon/Icon';
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

const PaymentSettingsPage = () => {
  let history = useHistory();

  const addPayment = () => {
    history.push(`/profile/payment-methods`);
  };
  return (
    <IonPage>
      <Header
        title="Payment Settings"
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
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

export default PaymentSettingsPage;
