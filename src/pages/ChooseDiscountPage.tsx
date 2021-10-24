import styled from '@emotion/styled/macro';
import { IonPage, IonContent, IonFooter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Button, Header } from '../components';
import DiscountItem from '../components/DiscountItem';
import { vstore } from '../store/store';
import { Discount, StoreBasketItem } from '../store/types';

const Footer = styled(IonFooter)`
  background: white;
`;

const DiscountContent = styled.div`
  background: #f5f5f561;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 15px 30px;
  margin-bottom: 10px;

  display: grid;
  grid-row-gap: 20px;
  grid-template-columns: 1fr;
`;

const getDiscounts = (): Discount[] => [
  {
    id: 1,
    name: 'Sale 20% Off',
    discountString: '20%',
    src: '',
    dateFrom: '10/04/2020',
    dateTo: '11/04/2020',
    checked: false,
    getTotalPrice: (orders: StoreBasketItem[], totalPrice: number) => {
      return totalPrice - totalPrice * 0.2;
    }
  },
  {
    id: 2,
    name: 'Sale 30% Off',
    discountString: '30%',
    src: '',
    dateFrom: '10/04/2020',
    dateTo: '11/04/2020',
    checked: false,
    getTotalPrice: (orders: StoreBasketItem[], totalPrice: number) => {
      return totalPrice - totalPrice * 0.3;
    }
  }
];

const ChooseDiscountPage = () => {
  const [discounts, setDiscounts] = useState(getDiscounts());
  const history = useHistory();

  useEffect(() => {
    setDiscounts(
      discounts.map((discount) => {
        if (discount.id === vstore.currentStoreBasket.discount?.id) {
          discount.checked = true;
        } else {
          discount.checked = false;
        }
        return discount;
      })
    );
  }, []);

  const onDiscoutnSelected = (discountId: number) => {
    setDiscounts(
      discounts.map((discount) => {
        if (discount.id === discountId) {
          discount.checked = !discount.checked;
        } else {
          discount.checked = false;
        }
        return discount;
      })
    );
  };

  const chooseDiscount = () => {
    const discount = discounts.find((d) => d.checked);
    vstore.currentStoreBasket.discount = discount;
    history.goBack();
  };

  return (
    <IonPage>
      <Header showButton={true} type="back" title="Choose Discount" />
      <IonContent fullscreen>
        <DiscountContent>
          {discounts.map((discount) => (
            <DiscountItem
              key={discount.id}
              discount={discount}
              isChecked={discount.checked}
              onClick={onDiscoutnSelected}
            />
          ))}
        </DiscountContent>
      </IonContent>
      <Footer>
        <Button type="primary" onClick={chooseDiscount}>
          Choose
        </Button>
      </Footer>
    </IonPage>
  );
};

export default ChooseDiscountPage;
