import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Button, Input, Title } from '../components';
import { IcnLock, IcnProfile } from '../components/Icon/Icon';
import { useHistory } from 'react-router';

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

const LoginPage = () => {
  let history = useHistory();
  const openResetPassword = () => {
    history.push(`/resetpassword`);
  }
  return (
    <IonPage>
      <Header
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyledLoginPage>
          <Title text="Sign in"/>
          <Input className="username" prefix={<IcnProfile/>} placeholder="Username" />
          <Input className="password" prefix={<IcnLock/>} placeholder="Password" type="password" />
          <Button type="primary">Sign In</Button>
          <a className="link" href="javascript:void(0)" onClick={()=> openResetPassword()}>Forgot Password?</a>
        </StyledLoginPage>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
