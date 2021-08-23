import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Button, Input, Title, Subtitle } from '../components';
import { IcnPhone } from '../components/Icon/Icon';

const StyledResetPasswordPage = styled.div`
  .ant-input-affix-wrapper { 
    margin-bottom: 20px !important;
  }
  .username svg {
    width: 16px;
    height: 19px;
  }
`;


const ResetPasswordPage = () => {
  return (
    <IonPage>
      <Header
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyledResetPasswordPage>
          <Title text="Forgot Password"/>
          <Subtitle text="Enter your phone"/>
          <Input className="phone" prefix={<IcnPhone/>} placeholder="Phone number" type="number"/>
          <Button type="primary">Next</Button>
        </StyledResetPasswordPage>
      </IonContent>
    </IonPage>
  );
};

export default ResetPasswordPage;
