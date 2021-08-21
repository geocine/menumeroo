import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { Redirect, Route } from 'react-router';
import {
  IcnHome,
  IcnMyList,
  IcnOrder,
  IcnProfile
} from '../components/Icon/Icon';
import HomeTab from './HomeTab';
import OrderTab from './OrderTab';
import MyListTab from './MyListTab';
import ProfileTab from './ProfileTab';
import StorePage from './Store';

const MainPage = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        <Route
          path="/tabs/store/:id"
          render={() => <StorePage />}
          exact={true}
        />
        <Route path="/tabs/home" render={() => <HomeTab />} exact={true} />
        <Route path="/tabs/order" render={() => <OrderTab />} exact={true} />
        <Route path="/tabs/mylist" render={() => <MyListTab />} exact={true} />
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
        <IonTabButton tab="order" href="/tabs/order">
          <IcnOrder />
        </IonTabButton>
        <IonTabButton tab="mylist" href="/tabs/mylist">
          <IcnMyList />
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IcnProfile />
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default MainPage;
