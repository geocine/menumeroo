import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, Title, Subtitle } from '../components';

const StyledCheckEmailPage = styled.div`
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


const CheckEmailPage = () => {
  return (
    <IonPage>
      <Header
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyledCheckEmailPage>
          <StyleTitleSection>
            <Title text="Forgot Password"/>
            <Subtitle text="Please check your e-mail to reset your password"/>
          </StyleTitleSection>
        </StyledCheckEmailPage>
      </IonContent>
    </IonPage>
  );
};

export default CheckEmailPage;
