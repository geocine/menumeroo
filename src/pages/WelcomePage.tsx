import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Button, WelcomeImage } from '../components';
import { useHistory } from 'react-router';

const StyledWelcomePage = styled.div`
  .welcome-image {
    width: 100%;
    margin: 10% auto 0 auto;
  }
  input {
    margin-top: 20px !important;
  }
`;

const WelcomePage = () => {
  let history = useHistory();
  const openLogin = () => {
    history.push(`/login`);
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <StyledWelcomePage>
          <WelcomeImage className="welcome-image" />
          <Button type="primary" onClick={()=> openLogin()}>Sign In</Button>
        </StyledWelcomePage>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
