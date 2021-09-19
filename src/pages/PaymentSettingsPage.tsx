import styled from '@emotion/styled/macro';
import { IonCheckbox, IonContent, IonFooter, IonPage } from '@ionic/react';
import { Button, Header, Subtitle } from '../components';
import {
  IcnGCash,
  IcnGrabPay,
  IcnPayMaya,
  IcnPaypal
} from '../components/Icon/Icon';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';

const PaymentMethodLink = styled.div`
  display: flex;
  font-family: 'AvenirLTStd';
  font-size: 16px;
  text-align: left;
  color: #2a3b56;
  margin: 20px 30px 30px 30px;
  align-items: center;

  label {
    margin-top: 5px;
    margin-left: 10px;
  }

  .check-mark {
    display: inline-flex;
    margin-left: auto;
  }
`;

const StyleTitleSection = styled.div`
  margin: 30px auto;
`;

interface PaymentSettingsPageParam {
  /**
   * 0 = choose payment method on checkout
   * 1 = set default payment
   */
  mode? : string; 
}

const PaymentSettingsPage = () => {
  const { mode } = useParams<PaymentSettingsPageParam>();
  const [headingSubtitle, setHeadingSubtitle] = useState<string>();

  const [paymentList, setPaymentList] = useState([
    { label: 'PayPal', icon: <IcnPaypal />, val: 'paypal', isChecked: true },
    { label: 'GCash', icon: <IcnGCash />, val: 'gcash', isChecked: false },
    { label: 'GrabPay', icon: <IcnGrabPay />, val: 'grabpay', isChecked: false },
    { label: 'PayMaya', icon: <IcnPayMaya />, val: 'paymaya', isChecked: false }
  ] ); 

  const setDefault = (value: string) => {
    setPaymentList(paymentList.map(payment => {
      payment.isChecked = payment.val === value
      return payment;
    })); 
  }

  useEffect(() => {
    if(mode === "1"){
      setHeadingSubtitle("Choose default payment method");
    } else {
      setHeadingSubtitle("Choose payment method");
    }
  }, [mode]);

  const saveDefault = () => {
    let defaultPayment = paymentList.find((payment) => payment.isChecked);
    //TODO: store default payment here
  };
  return (
    <IonPage>
      <Header
        title='Payment Settings'
        showButton={true}
        type='back'
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyleTitleSection>
          <Subtitle text={headingSubtitle} />
        </StyleTitleSection>
        {paymentList.map(({ label, icon, val, isChecked }, i) => (
          <PaymentMethodLink key={i} onClick={() => setDefault(val)}>
            {icon}
            <label>{label}</label>
            <span className='check-mark'>
              <IonCheckbox
                slot='end'
                color='primary'
                mode='ios'
                name={label}
                value={val}
                checked={isChecked}
              />
            </span>
          </PaymentMethodLink>
        ))}
      </IonContent>
      <IonFooter>
        <Button type='primary' onClick={() => saveDefault()}>
          Save
        </Button>
      </IonFooter>
    </IonPage>
  );
};

export default PaymentSettingsPage;
