import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupConfig } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import FoodPage from './pages/FoodPage';
import StorePage from './pages/StorePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import CheckEmailPage from './pages/CheckEmailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MyProfilePage from './pages/MyProfilePage';
import MyAddressesPage from './pages/MyAddressesPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import PaymentSettingsPage from './pages/PaymentSettingsPage';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import StoreBasketPage from './pages/StoreBasketPage';
import StorePaymentPage from './pages/StorePaymentPage';
import ChooseDiscountPage from './pages/ChooseDiscountPage';

setupConfig({ mode: 'md' });

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  relativeTime: {
    future: '%s left',
    past: '%s ago',
    s: '1 second',
    m: '1 minute',
    mm: '%d minutes',
    h: '1 hour',
    hh: '%d hours',
    d: '1 day',
    dd: '%d days',
    M: '1 month',
    MM: '%d months',
    y: '1 year',
    yy: '%d years'
  }
});

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/welcome">
          <WelcomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup/:code?">
          <SignupPage />
        </Route>
        <Route path="/forgotpassword">
          <ForgotPasswordPage />
        </Route>
        <Route path="/checkemail">
          <CheckEmailPage />
        </Route>
        <Route path="/resetpassword/:code?">
          <ResetPasswordPage />
        </Route>
        <Route path="/store/:id" exact>
          <StorePage />
        </Route>
        <Route path="/store/:id/basket">
          <StoreBasketPage />
        </Route>
        <Route exact path="/store/:id/checkout">
          <StorePaymentPage />
        </Route>
        <Route path="/food/:id/:itemId?">
          <FoodPage />
        </Route>
        <Route path="/tabs">
          <MainPage />
        </Route>
        <Route exact path="/">
          <Redirect to="/tabs" />
        </Route>
        <Route path="/profile/edit">
          <MyProfilePage />
        </Route>
        <Route path="/profile/addresses">
          <MyAddressesPage />
        </Route>
        <Route path="/profile/password">
          <UpdatePasswordPage />
        </Route>
        <Route path="/profile/payment/:mode?">
          <PaymentSettingsPage />
        </Route>
        <Route path="/profile/discount/:mode?">
          <ChooseDiscountPage />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
