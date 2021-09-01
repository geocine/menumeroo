import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Button, Input, Title } from '../components';
import { IcnLock, IcnProfile } from '../components/Icon/Icon';
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

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
    color: #8A94A3;
  }
`;

const StyleTitleSection = styled.div`
  margin: 30px auto;
`;

const login = (username: any) => {
  // login process
  console.log(username);
}

const LoginPage = () => {
  let history = useHistory();
  const openForgotPassword = () => {
    history.push(`/forgotpassword`);
  }

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [disabled = true, setDisabled] = useState<boolean | null>();

  useEffect(() => {
    if (!username && !password) {
      setDisabled(true)
    } else {
      setDisabled(null)
    }
  }, [username, password]);

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
          </StyleTitleSection>
          <Input onChange={(e) => setUsername(e.target.value)} className="username" prefix={<IcnProfile />} placeholder="Username" />
          <Input onChange={(e) => setPassword(e.target.value)} className="password" prefix={<IcnLock />} placeholder="Password" type="password" />
          <Button type="primary" onClick={() => login(username)} disabled={disabled}>Sign In</Button>
          <span className="link" onClick={() => openForgotPassword()}>Forgot Password?</span>
        </StyledLoginPage>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
