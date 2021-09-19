import styled from '@emotion/styled/macro';
import { IonPage, IonContent, IonFooter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSnapshot } from 'valtio';
import { Button, Header, OrderItem } from '../components';
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

    span.price {
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
          <div className="payment-items">
            <div className="payment-method">Paypal</div>
            <div className="payment-voucher">Voucher Code</div>
          </div>
        </StoreBasketSection>
      </IonContent>
      <PlaceOrder>
        <div className="total">
          <h1>Total</h1>
          <span className="price">
            {data.currentStoreBasket.totalPrice?.toFixed(2)}
          </span>
        </div>
        <Button type="primary" onClick={() => {}}>
          Place Order
        </Button>
      </PlaceOrder>
    </IonPage>
  );
};

export default StoreBasketPage;
