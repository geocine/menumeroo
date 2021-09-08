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

setupConfig({ mode: 'md' });

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
        <Route path="/store/:id">
          <StorePage />
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
        <Route
          path="/profile/edit"
          render={() => <MyProfilePage />}
          exact={true}
        />
        <Route
          path="/profile/addresses"
          render={() => <MyAddressesPage />}
          exact={true}
        />
        <Route
          path="/profile/password"
          render={() => <UpdatePasswordPage />}
          exact={true}
        />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
