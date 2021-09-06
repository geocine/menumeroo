import styled from '@emotion/styled/macro';
import { IonContent, IonPage, IonFooter } from '@ionic/react';
import { Button, Header, Input } from '../components';
import { useEffect, useState } from 'react';

const StyledMyAddressesPage = styled.div`
  input {
    margin-top: 20px !important;
  }
`;

const ProfileHeader = styled.div`
  img {
    display: flex;
    width: 150px;
    margin: 20px auto 0 auto;
  }

  .fullname {
    display: block;
    font-family: 'AvenirLTStd';
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    color: #2a3b56;
  }

  .number {
    display: block;
    font-family: 'AvenirLTStd';
    text-align: center;
    color: #8a94a3;
  }
`;

const ProfileInput = styled.div`
  display: block;
  font-family: 'AvenirLTStd';
  font-size: 18px;
  text-align: left;
  margin-left: 30px;
  color: #8A94A3;
  margin-top: 20px;
  margin-bottom: 30px;

  .data-holder {
    float: right;
    margin-right: 30px;
  }

  .data-holder input {
    margin: 0 !important;
    max-width: 100% !important;
    text-align: right;
    color: #2A3B56;
    background: var(--ion-color-light) !important;
  }
  
  .data-holder input:read-only {
    margin: 0 !important;
    background: none !important;
    max-width: 100% !important;
    text-align: right;
    color: #2A3B56;
  }
`;

const saveProfile = (data: any) => {
  // login process
  console.log(data);
};

const MyAddressesPage = () => {
  const [data, setData] = useState<any | null>();
  const [readOnly = true, setReadOnly] = useState<boolean | undefined>();
  const [buttonText  = "Edit", setButtonText] = useState<string>();
  let inputData = [];
  const editMode = () => {
    if (readOnly === true) {
      setReadOnly(false);
      setButtonText("Save");
    } else {
      setReadOnly(true);
      setButtonText("Edit");
    }
  }
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header
          title={`My Addresses`}
          showButton={true}
          type='back'
          style={{ background: 'transparent' }}
        />
        <StyledMyAddressesPage>
          <p>Address 1</p>
        </StyledMyAddressesPage>
      </IonContent>
      <IonFooter>
        <Button type='primary' onClick={() => editMode()}>
          {buttonText}
        </Button>
      </IonFooter>
    </IonPage>
  );
};

export default MyAddressesPage;
