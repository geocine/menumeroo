import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { useParams } from 'react-router';
import { Header, Button, Input, Title } from '../components';
import { IcnLock, IcnProfile } from '../components/Icon/Icon';

const StyledSignupPage = styled.div`
  .ant-input-affix-wrapper { 
    margin-bottom: 20px !important;
  }
  .username svg {
    width: 16px;
    height: 19px;
  }
`;

interface SignupPageParams {
  code? : string
}

const SignupPage = () => {
  const { code } = useParams<SignupPageParams>();
  return (
    <IonPage>
      <Header
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyledSignupPage>
          <Title text="Sign up"/>
          <Input className="username" prefix={<IcnProfile/>} placeholder="Enter username" />
          <Input className="password" prefix={<IcnLock/>} placeholder="Enter password" type="password" />
          <Input className="password" prefix={<IcnLock/>} placeholder="Re-enter password" type="password" />
          <Button type="primary">Sign Up</Button>
        </StyledSignupPage>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
