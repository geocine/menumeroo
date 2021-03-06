import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Button, Input, Title } from '../components';
import { IcnLock, IcnProfile } from '../components/Icon/Icon';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';
import { vstore } from '../store/store';
import { useSnapshot } from 'valtio';

const StyledLoginPage = styled.div`
  .ant-input-affix-wrapper {
    margin-bottom: 20px !important;
  }
  .username svg {
    width: 16px;
    height: 19px;
  }

  h1 {
    font-family: 'AvenirLTStd';
    font-size: 24px;
    margin-bottom: 0;
    margin-top: 6px;
    font-weight: 800;
    color: var(--ion-color-secondary);
  }

  .link {
    font-family: 'AvenirLTStd';
    display: block;
    text-align: right;
    max-width: calc(100% - 60px);
    margin: 0 auto;
    color: #8a94a3;
  }
`;

const StyleTitleSection = styled.div`
  margin: 30px auto;
  .error-message {
    color: #ff0000;
    max-width: calc(100% - 60px);
    margin: 0 auto;
  }
`;

const LoginPage = () => {
  const data = useSnapshot(vstore);
  const [statusMessage, setStatusMessage] = useState<string>();

  let history = useHistory();
  const openForgotPassword = () => {
    history.push(`/forgotpassword`);
  };

  const login = async (username: any, password: any) => {
    try {
      await vstore.local.loginUser(username, password);
      // redirect to homepage
      history.push('/tabs/home');
    } catch (error: any) {
      setStatusMessage(error.response.data.message);
    }
  };

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [disabled = true, setDisabled] = useState<boolean | null>();
  useEffect(() => {
    // TODO: remove this loadUsers routine once actual API is in place
    const loadUsers = async () => {
      await vstore.local.loadUsers();
    };
    loadUsers();

    if (data.local.user?.id) {
      history.push(`/tabs/home`);
    }
  }, []);

  useEffect(() => {
    setStatusMessage('');
    if (!username && !password) {
      setDisabled(true);
    } else {
      setDisabled(null);
    }
  }, [username, password]);
  useEffect(() => {
    if (data.local.user?.id) {
      history.push(`/tabs/home`);
    }
  }, [data.local.user]);
  return (
    <IonPage>
      <Header
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyledLoginPage>
          <StyleTitleSection>
            <Title text="Sign in" />
            <p className="error-message">{statusMessage}</p>
          </StyleTitleSection>
          <Input
            name="username"
            onBlur={(e) => setUsername(e.target.value)}
            className="username"
            prefix={<IcnProfile />}
            placeholder="Username"
          />
          <Input
            name="password"
            onBlur={(e) => setPassword(e.target.value)}
            className="password"
            prefix={<IcnLock />}
            placeholder="Password"
            type="password"
          />
          <Button
            type="primary"
            onClick={() => login(username, password)}
            disabled={disabled}
          >
            Sign In
          </Button>
          <span className="link" onClick={() => openForgotPassword()}>
            Forgot Password?
          </span>
        </StyledLoginPage>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
