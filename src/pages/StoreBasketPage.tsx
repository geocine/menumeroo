import styled from '@emotion/styled/macro';
import { IonPage, IonContent, IonFooter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSnapshot } from 'valtio';
import { Button, Header, OrderItem } from '../components';
import { IcnNext, IcnPaypal } from '../components/Icon/Icon';
import { vstore } from '../store/store';

const StoreBasketSection = styled.div`
  background: #f5f5f561;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 15px 30px;
  margin-bottom: 10px;

  & > h1 {
    font-size: 16px;
    font-family: 'AvenirLTStd';
    color: var(--ion-color-medium);
  }

  .payment-items {
    display: flex;
    .payment-item {
    }
    .payment-total {
      margin-left: auto;
    }
    .payment-voucher {
      margin-left: auto;
    }
  }
`;

const DetailItem = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  .action {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    .content {
      display: inline-flex;
      align-items: center;
    }
    .content span {
      margin: 2px 10px 0 10px;
    }
  }
  & > span {
    margin-top: 2px;
  }
`;

const VoucherCode = styled.div`
  margin: 0 10px;
  padding: 2px 10px 0px 10px;
  border-radius: 3px;
  background: var(--ion-color-light);
  color: var(--ion-color-medium);
`;

const DiscountedPrice = styled.span`
  margin-right: 10px;
  margin-left: auto;
  padding: 5px 5px 0px 5px;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;
  border-color: #e8e8e8;
  color: #b9b9b9;
`;

const PlaceOrder = styled(IonFooter)`
  background: white;

  .total {
    display: flex;
    padding: 10px 35px;
    align-items: center;

    h1 {
      font-size: 18px;
      font-family: 'AvenirLTStd';
      margin: 0;
    }

    div.price {
      margin-left: auto;
      font-size: 24px;
      color: var(--ion-color-primary);
    }
  }

  & > button {
    margin-top: 0;
  }
`;

interface StoreBasketPageParams {
  id?: string;
}
const StoreBasketPage = () => {
  const { id } = useParams<StoreBasketPageParams>();
  const data = useSnapshot(vstore);
  const history = useHistory();

  useEffect(() => {
    const loadStoreBasket = async () => {
      if (id) {
        await vstore.currentStore.loadStore(parseInt(id));
        await vstore.currentStoreBasket.loadStoreBasket(parseInt(id));
      }
    };
    loadStoreBasket();
    return () => {
      if (!vstore.currentStore.inStore) {
        vstore.currentStore.clearStore();
        vstore.currentStoreBasket.clearStoreBasket();
      }
    };
  }, [id]);

  const openFood = async (id: number, item?: number) => {
    if (item) {
      history.push(`/food/${id}/${item}`);
    }
  };

  return (
    <IonPage>
      <Header
        showButton={true}
        type="close"
        title={data.currentStore.store?.name}
      />
      <IonContent fullscreen>
        <StoreBasketSection>
          <h1>Deliver to</h1>
          San Juan
        </StoreBasketSection>
        <StoreBasketSection>
          <h1>Order summary</h1>
          <div className="items">
            {data.currentStoreBasket.orders.map((order) => (
              <OrderItem
                noPadding={true}
                key={order.id}
                item={order}
                onClick={(id, itemId) => {
                  openFood(id, itemId);
                }}
              />
            ))}
          </div>
        </StoreBasketSection>
        <StoreBasketSection>
          <div className="payment-items">
            <div className="payment-item">Subtotal</div>
            <div className="payment-total">
              {data.currentStoreBasket.totalPrice?.toFixed(2)}
            </div>
          </div>
          <div className="payment-items">
            <div className="payment-item">Service fees</div>
            <div className="payment-total">0.00</div>
          </div>
        </StoreBasketSection>
        <StoreBasketSection>
          <h1>Payment details</h1>
          <DetailItem>
            <span>Voucher Code</span>
            <div className="action">
              <div className="content">
                <VoucherCode>Sale 0% Off</VoucherCode>
              </div>
              <IcnNext className="indicator" />
            </div>
          </DetailItem>
          <DetailItem>
            <span>Payment Method</span>
            <div className="action">
              <div className="content">
                <IcnPaypal /> <span>Paypal</span>
              </div>
              <IcnNext className="indicator" />
            </div>
          </DetailItem>
        </StoreBasketSection>
      </IonContent>
      <PlaceOrder>
        <div className="total">
          <h1>Total</h1>
          <div className="price">
            <DiscountedPrice>0%</DiscountedPrice>
            {data.currentStoreBasket.totalPrice?.toFixed(2)}
          </div>
        </div>
        <Button type="primary" onClick={() => {}}>
          Place Order
        </Button>
      </PlaceOrder>
    </IonPage>
  );
};

export default StoreBasketPage;
