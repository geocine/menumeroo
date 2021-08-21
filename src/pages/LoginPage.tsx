import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Button, Input } from '../components';
import { IcnProfile } from '../components/Icon/Icon';

const StyledWelcomePage = styled.div`
  input {
    margin-top: 10px !important;
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
        <StyledWelcomePage>
          <Input prefix={<IcnProfile/>} placeholder="username"/>
          <Input prefix={<IcnProfile/>} placeholder="password"/>
          <Button type="primary">Sign In</Button>
        </StyledWelcomePage>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
