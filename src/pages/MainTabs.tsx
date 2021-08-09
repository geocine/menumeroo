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
import Home from './Home';
import Order from './Order';
import MyList from './MyList';
import Profile from './Profile';

const MainTabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/home" />
        <Route path="/tabs/home" render={() => <Home />} exact={true} />
        <Route path="/tabs/order" render={() => <Order />} exact={true} />
        <Route path="/tabs/mylist" render={() => <MyList />} exact={true} />
        <Route path="/tabs/profile" render={() => <Profile />} exact={true} />
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

export default MainTabs;
