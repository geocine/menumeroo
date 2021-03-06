import { IonPage, IonContent, IonFooter } from '@ionic/react';
import styled from '@emotion/styled/macro';
import { Button, Header, Input } from '../components';

const AddressLine = styled.div`
  display: block;
  margin-bottom: 20px;

  label { 
    font-family: 'AvenirLTStd';
    font-weight: 600;
    font-size: 16px;
    color: var(--ion-color-secondary);
    margin: 10px 30px;
  }

  .address-input {
    display: block;
    width: 100%;
    margin: 0;
  }
  
`;

const NewAddressPage = () => {
  const saveAddress = () => {
    //
  }
  return (
    <IonPage>
      <Header
          title={`Add New Address`}
          showButton={true}
          type='back'
          style={{ background: 'transparent' }}
        />
      <IonContent fullscreen>
        <AddressLine>
          <label>Label</label>
          <Input name="label" className="address-input" />
        </AddressLine>
        <AddressLine>
          <label>House / Unit No. and Street</label>
          <Input name="street" className="address-input" />
        </AddressLine>
        <AddressLine>
          <label>City</label>
          <Input name="city" className="address-input" />
        </AddressLine>
        <AddressLine>
          <label>Notes to Driver</label>
          <Input name="notes" className="address-input" />
        </AddressLine>
      </IonContent>
      <IonFooter>
        <Button type="primary" onClick={() => saveAddress()}>
          Save
        </Button>
      </IonFooter>
    </IonPage>
  );
};

export default NewAddressPage;
