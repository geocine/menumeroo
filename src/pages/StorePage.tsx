import styled from '@emotion/styled/macro';
import { IonContent, IonFooter, IonPage, IonModal } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSnapshot } from 'valtio';
import {
  Header,
  FoodMenuCard,
  FoodMenuItem,
  Button,
  OrderItem
} from '../components';
import { vstore } from '../store/store';
import { Food, StoreBasketItem } from '../store/types';

const HeaderImage = styled.div`
  background-color: #eae8e8;
  height: 300px;
  margin-top: -82px;
  overflow: hidden;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

interface StorePageParams {
  id?: string;
}

const Basket = styled(IonFooter)`
  background: white;
`;

// TODO: Move this elsewhere in case we need to separate this as a page
const FoodModal = styled(IonModal)<{ full: boolean }>`
  .modal-wrapper {
    bottom: 0;
    position: absolute;
  }

  --height: ${(props) => (props.full ? '100%' : 'auto')};

  .ion-page {
    position: relative;
    display: flex;
    contain: content;
    flex-direction: column;
    height: 100%;
  }

  button {
    flex-shrink: 0;
  }
`;

// TODO: This is already in FoodPage FYI, maybe move FoodModal to that file
const FoodHeader = styled.div`
  background: #f5f5f561;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 15px 30px;
  margin-bottom: 10px;

  h1 {
    font-family: 'AvenirLTStd-Heavy';
    font-size: 22px;
  }

  h3 {
    color: var(--ion-color-medium);
    font-family: 'AvenirLTStd';
    font-size: 14px;
    margin-top: 20px;
  }

  header {
    display: flex;

    h1 {
      margin-bottom: 0;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .price {
      margin-left: auto;
      width: 150px;
      text-align: right;

      h1 {
        color: var(--ion-color-primary);
      }

      label {
        color: var(--ion-color-medium);
        font-family: 'AvenirLTStd';
      }
    }
  }
`;

const FoodContent = styled.div`
  overflow: auto;
  flex-grow: 1;
  border-bottom: 1px solid #efefef;
`;

const StorePage = () => {
  const { id } = useParams<StorePageParams>();
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState<StoreBasketItem[]>([]);
  const [food, setFood] = useState<Food | null>();
  const data = useSnapshot(vstore);
  const history = useHistory();

  useEffect(() => {
    const loadStore = async () => {
      if (id) {
        await vstore.currentStore.loadStore(parseInt(id));
        await vstore.currentStoreBasket.loadStoreBasket(parseInt(id));
      }
    };
    loadStore();
    return () => {
      vstore.currentStore.clearStore();
      vstore.currentStoreBasket.clearStoreBasket();
    };
  }, [id]);

  const closeOrders = () => {
    setShowOrders(false);
    setOrders([]);
  };

  // TODO: do not await setStates check onDidDismiss or any means to do a smoother transition to another page
  const openFood = async (id: number, item?: number) => {
    if (item) {
      await setShowOrders(false);
      history.push(`/food/${id}/${item}`);
    }
    const storeOrders = data.currentStoreBasket.orders.filter(
      (order) => order.food?.id === id
    );
    setOrders(storeOrders);
    const storeFood = vstore.currentStore.getFoodDetails(id);
    setFood(storeFood);
    if (storeOrders.length > 0) {
      if ((storeFood?.variations?.length || 0) > 0) {
        setShowOrders(true);
      } else {
        history.push(`/food/${id}/${storeOrders[0].id}`);
      }
    } else {
      await setShowOrders(false);
      history.push(`/food/${id}`);
    }
  };

  const openStoreBasket = () => {
    history.push(`/store/${id}/basket`);
  };

  return (
    <IonPage>
      <Header
        title={data.currentStore.store?.name}
        showButton={true}
        type="back"
        style={{ background: '#ffededb5' }}
      />
      <IonContent fullscreen>
        <HeaderImage>
          <img
            src={data.currentStore.store?.src}
            alt={data.currentStore.store?.name}
          ></img>
        </HeaderImage>
        {data.currentStore.menu?.map((menu) => (
          <FoodMenuCard key={menu.id} title={menu.name}>
            {menu.foodItems.map((food) => (
              <FoodMenuItem
                key={food.id}
                food={food}
                onClick={(id) => openFood(id)}
              />
            ))}
          </FoodMenuCard>
        ))}
        <FoodModal
          isOpen={showOrders}
          cssClass="food-mdal"
          onDidDismiss={closeOrders}
          full={orders.length > 3}
        >
          {orders.length > 3 && (
            <Header showButton={true} type="close" onDismiss={closeOrders} />
          )}
          <FoodHeader>
            <header>
              <h1>{food?.name}</h1>
              <div className="price">
                <h1>{food?.price?.toFixed(2)}</h1>
                <label>Base price</label>
              </div>
            </header>
            <h3>{food?.description}</h3>
          </FoodHeader>
          <FoodContent>
            {orders.map((order) => (
              <OrderItem
                key={order.id}
                item={order}
                onClick={(id, itemId) => {
                  openFood(id, itemId);
                }}
              />
            ))}
          </FoodContent>
          <Button
            type="primary"
            onClick={() => {
              if (food) {
                setShowOrders(false);
                history.push(`/food/${food.id}`);
              }
            }}
          >
            Make Another
          </Button>
        </FoodModal>
      </IonContent>
      {data.currentStoreBasket.orders.length > 0 && (
        <Basket>
          <Button type="primary" onClick={openStoreBasket}>
            Basket - {data.currentStoreBasket.orders.length} items -{' '}
            {data.currentStoreBasket.totalPrice?.toFixed(2)}
          </Button>
        </Basket>
      )}
    </IonPage>
  );
};

export default StorePage;
