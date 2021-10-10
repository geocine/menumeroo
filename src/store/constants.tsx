import {
  IcnPaypal,
  IcnGCash,
  IcnGrabPay,
  IcnPayMaya
} from '../components/Icon/Icon';

export const getPayment = (key: string) => {
  const payments = [
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
  return payments.find((payment) => payment.val === key);
};
