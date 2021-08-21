import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Button, Input } from '../components';
import { IcnLock, IcnProfile } from '../components/Icon/Icon';

const StyledLoginPage = styled.div`
  .ant-input-affix-wrapper { 
    margin-bottom: 20px !important;
  }
  .username svg {
    width: 16px;
    height: 19px;
  }
`;

const LoginPage = () => {
  return (
    <IonPage>
      <Header
        title="Sign In"
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyledLoginPage>
          <Input className="username" prefix={<IcnProfile/>} placeholder="Username" />
          <Input className="password" prefix={<IcnLock/>} placeholder="Password" type="password" />
          <Button type="primary">Sign In</Button>
        </StyledLoginPage>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
