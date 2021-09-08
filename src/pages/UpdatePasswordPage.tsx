import styled from '@emotion/styled/macro';
import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { Header, Button, Input, Subtitle } from '../components';
import { IcnLock } from '../components/Icon/Icon';
import { useEffect, useState } from 'react';

const StyledUpdatePasswordPage = styled.div`
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

const submit = (password: any) => {
  // process password update
  console.log(password);
}

const UpdatePasswordPage = () => {

  const [password, setPassword] = useState<string>();
  const [password2, setPassword2] = useState<string>();
  const [disabled = true, setDisabled] = useState<boolean | null>();

  useEffect(() => {
    if (!password && !password2) {
      setDisabled(true)
    } else {
      setDisabled(null)
    }
  }, [password, password2]);

  return (
    <IonPage>
      <Header
        title="Change Password"
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <StyleTitleSection>
          <Subtitle text="Enter Old Password"/>
        </StyleTitleSection>
        <StyledUpdatePasswordPage>
          <Input name="oldPassword" onChange={(e) => setPassword(e.target.value)} className="password" prefix={<IcnLock />} placeholder="Enter Old Password" type="password" autoComplete="off"/>
        </StyledUpdatePasswordPage>
        <StyleTitleSection>
          <Subtitle text="Create New Password"/>
        </StyleTitleSection>
        <StyledUpdatePasswordPage>
          <Input name="newPassword" onChange={(e) => setPassword(e.target.value)} className="password" prefix={<IcnLock />} placeholder="Enter New Password" type="password" autoComplete="off"/>
          <Input name="newPassword2" onChange={(e) => setPassword2(e.target.value)} className="password" prefix={<IcnLock />} placeholder="Re-Enter New Password" type="password" autoComplete="off"/>
        </StyledUpdatePasswordPage>
      </IonContent>
      <IonFooter>
        <Button type="primary" onClick={() => submit(password)} disabled={disabled}>Save</Button>
      </IonFooter>
    </IonPage>
  );
};

export default UpdatePasswordPage;
