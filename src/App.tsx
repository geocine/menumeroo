import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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
import NewAddressPage from './pages/NewAddressPage';
import EditAddressPage from './pages/EditAddressPage';
import AddressSettingsPage from './pages/AddressSettingsPage';

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
import PrivateRoute from './components/router/PrivateRoute';

setupIonicReact({ mode: 'md' });

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
        <PrivateRoute path="/store/:id" exact>
          <StorePage />
        </PrivateRoute>
        <PrivateRoute path="/store/:id/basket">
          <StoreBasketPage />
        </PrivateRoute>
        <PrivateRoute exact path="/store/:id/checkout">
          <StorePaymentPage />
        </PrivateRoute>
        <PrivateRoute path="/food/:id/:itemId?">
          <FoodPage />
        </PrivateRoute>
        <PrivateRoute path="/tabs">
          <MainPage />
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <Redirect to="/tabs" />
        </PrivateRoute>
        <PrivateRoute path="/profile/edit">
          <MyProfilePage />
        </PrivateRoute>
        <PrivateRoute path="/profile/addresses">
          <MyAddressesPage />
        </PrivateRoute>
        <PrivateRoute path="/profile/address/:mode?">
          <AddressSettingsPage />
        </PrivateRoute>
        <PrivateRoute path="/profile/new-address">
          <NewAddressPage />
        </PrivateRoute>
        <PrivateRoute path="/profile/edit-address/:id">
          <EditAddressPage />
        </PrivateRoute>
        <PrivateRoute path="/profile/password">
          <UpdatePasswordPage />
        </PrivateRoute>
        <PrivateRoute path="/profile/payment/:mode?">
          <PaymentSettingsPage />
        </PrivateRoute>
        <PrivateRoute path="/profile/discount/:mode?">
          <ChooseDiscountPage />
        </PrivateRoute>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
