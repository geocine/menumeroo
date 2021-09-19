import {
  IonBadge,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { Redirect, Route } from 'react-router';
import { IcnHome, IcnOrder, IcnProfile } from '../components/Icon/Icon';
import { FiShoppingBag } from 'react-icons/fi';
import HomeTab from './HomeTab';
import OrdersTab from './OrdersTab';
import BasketTab from './BasketTab';
import ProfileTab from './ProfileTab';
import styled from '@emotion/styled/macro';
import { useSnapshot } from 'valtio';
import { vstore } from '../store/store';

const Badge = styled(IonBadge)`
  width: 10px;
  border-radius: 50%;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -5px;
  right: -5px;
`;

const BasketContainer = styled.div`
  width: 30px;
  height: 30px;
  display: inline-block;
  position: relative;
`;

const MainPage = () => {
  const data = useSnapshot(vstore);

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        <Route path="/tabs/home" render={() => <HomeTab />} exact />
        <Route path="/tabs/orders" render={() => <OrdersTab />} exact />
        <Route path="/tabs/basket" render={() => <BasketTab />} exact />
        <Route
          path="/tabs/profile"
          render={() => <ProfileTab />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home">
          <IcnHome />
        </IonTabButton>
        <IonTabButton tab="order" href="/tabs/orders">
          <IcnOrder />
        </IonTabButton>
        <IonTabButton tab="basket" href="/tabs/basket">
          <BasketContainer>
            {data.basket.items.length > 0 && <Badge />}
            <FiShoppingBag size={28} strokeWidth={1.5} />
          </BasketContainer>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IcnProfile />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainPage;
