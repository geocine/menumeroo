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
import BasketTab from './BasketTab';
import ProfileTab from './ProfileTab';
import MyProfilePage from './MyProfilePage';

const MainPage = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        <Route path="/tabs/home" render={() => <HomeTab />} exact />
        <Route path="/tabs/mylist" render={() => <MyListTab />} exact />
        <Route path="/tabs/basket" render={() => <BasketTab />} exact />
        <Route
          path="/tabs/profile"
          render={() => <ProfileTab />}
          exact={true}
        />
        <Route
          path="/tabs/profile/edit"
          render={() => <MyProfilePage />}
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
        <IonTabButton tab="basket" href="/tabs/basket">
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
