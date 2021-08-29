import { IonContent, IonList, IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
import { useSnapshot } from 'valtio';
import { Header, BasketItem } from '../components';
import { vstore } from '../store/store';
import { StoreBasket } from '../store/types';

const BasketTab = () => {
  const data = useSnapshot(vstore);
  const history = useHistory();
  const openStore = (id: number) => {
    history.push(`/store/${id}`);
  };
  return (
    <IonPage>
      <Header showButton={true} type="back" title="My Basket" />
      <IonContent fullscreen>
        <IonList>
          {data.basket?.items.map((item: StoreBasket) => (
            <BasketItem
              store={item}
              borderRadius={5}
              size={50}
              onClick={openStore}
            />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default BasketTab;
