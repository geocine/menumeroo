import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Button, Input, Title, Subtitle } from '../components';
import { IcnEmail } from '../components/Icon/Icon';
import { useHistory } from 'react-router';

const StyledForgotPasswordPage = styled.div`
  .ant-input-affix-wrapper { 
    margin-bottom: 20px !important;
  }
  .username svg {
    width: 16px;
    height: 19px;
  }
`;

const StyleTitleSection = styled.div`
  margin: 30px auto;
`;


const ForgotPasswordPage = () => {
  let history = useHistory();
  const nextStep = () => {
    history.push(`/checkemail`);
  }
  return (
    <IonPage>
      <Header
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyledForgotPasswordPage>
          <StyleTitleSection>
            <Title text="Forgot Password"/>
            <Subtitle text="Enter your e-mail"/>
          </StyleTitleSection>
          <Input className="phone" prefix={<IcnEmail/>} placeholder="E-mail address" type="number" required/>
          <Button type="primary" onClick={()=> nextStep()}>Next</Button>
        </StyledForgotPasswordPage>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordPage;
