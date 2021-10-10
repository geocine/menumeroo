import styled from '@emotion/styled/macro';
import { vstore } from '../store/store';
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
import { useSnapshot } from 'valtio';
import { PaymentItem } from '../store/types';

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
  mode?: string;
}

const getPayments = () => [
  { label: 'PayPal', icon: <IcnPaypal />, val: 'paypal', isChecked: true },
  { label: 'GCash', icon: <IcnGCash />, val: 'gcash', isChecked: false },
  {
    label: 'GrabPay',
    icon: <IcnGrabPay />,
    val: 'grabpay',
    isChecked: false
  },
  { label: 'PayMaya', icon: <IcnPayMaya />, val: 'paymaya', isChecked: false }
];

const PaymentSettingsPage = () => {
  const data = useSnapshot(vstore);
  const { mode } = useParams<PaymentSettingsPageParam>();
  const [headingSubtitle, setHeadingSubtitle] = useState<string>(
    'Choose payment method'
  );
  const [heading, setHeading] = useState<string>('Payment Methods');

  const [paymentList, setPaymentList] = useState<PaymentItem[]>(getPayments());

  const history = useHistory();

  const setDefault = (value: string) => {
    setPaymentList(
      paymentList?.map((payment) => {
        payment.isChecked = payment.val === value;
        return payment;
      })
    );
  };

  useEffect(() => {
    if (mode === '1') {
      setHeading('Payment Settings');
      setHeadingSubtitle('Choose default payment method');
    } else {
      setHeading('Payment Methods');
      setHeadingSubtitle('Choose payment method');
      setPaymentList(
        getPayments().map((payment: PaymentItem) => {
          payment.isChecked = false;
          if (payment.val === data.currentStoreBasket.paymentMethod) {
            payment.isChecked = true;
          }
          return payment;
        })
      );
    }
  }, [mode, data.currentStoreBasket.paymentMethod]);

  const saveDefault = () => {
    let paymentSelected = paymentList?.find((payment) => payment.isChecked);
    if (parseInt(mode ?? '0')) {
      //TODO: store default payment here
    } else {
      // Set default payment method in currentStoreBasket
      if (paymentSelected) {
        vstore.currentStoreBasket.paymentMethod = paymentSelected.val;
      }
    }
    history.goBack();
  };

  return (
    <IonPage>
      <Header
        title={heading}
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyleTitleSection>
          <Subtitle text={headingSubtitle} />
        </StyleTitleSection>
        {paymentList?.map(({ label, icon, val, isChecked }, i) => (
          <PaymentMethodLink key={i} onClick={() => setDefault(val)}>
            {icon}
            <label>{label}</label>
            <span className="check-mark">
              <IonCheckbox
                slot="end"
                color="primary"
                mode="ios"
                name={label}
                value={val}
                checked={isChecked}
              />
            </span>
          </PaymentMethodLink>
        ))}
      </IonContent>
      <IonFooter>
        <Button type="primary" onClick={() => saveDefault()}>
          Save
        </Button>
      </IonFooter>
    </IonPage>
  );
};

export default PaymentSettingsPage;
