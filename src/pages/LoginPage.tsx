import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Button, Input } from '../components';

const StyledWelcomePage = styled.div`
  .welcome-image {
    width: 100%;
    margin: 10% auto 0 auto;
  }
  input {
    margin-top: 20px !important;
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
          <Input placeholder="username"/>
          <Input placeholder="password"/>
          <Button type="primary">Sign In</Button>
        </StyledWelcomePage>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
