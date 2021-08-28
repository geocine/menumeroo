import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { Redirect, Route } from 'react-router';
import { IcnHome, IcnMyList, IcnProfile } from '../components/Icon/Icon';
import { IoBasketOutline } from 'react-icons/io5';
import HomeTab from './HomeTab';
import MyListTab from './MyListTab';
import CartTab from './CartTab';
import ProfileTab from './ProfileTab';

const MainPage = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        <Route path="/tabs/home" render={() => <HomeTab />} exact />
        <Route path="/tabs/mylist" render={() => <MyListTab />} exact />
        <Route path="/tabs/cart" render={() => <CartTab />} exact />
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
        <IonTabButton tab="order" href="/tabs/mylist">
          <IcnMyList />
        </IonTabButton>
        <IonTabButton tab="cart" href="/tabs/cart">
          <IoBasketOutline size={30} />
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IcnProfile />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainPage;
