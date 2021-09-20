import { IonPage, IonContent, IonFooter } from '@ionic/react';
import styled from '@emotion/styled/macro';
import { Button, Header, Input } from '../components';
import { useState } from 'react';
import { useParams } from 'react-router';

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

interface EditAddressPageParam {
  id: string;
}

const EditAddressPage = () => {
  const { id } = useParams<EditAddressPageParam>();
  const [addressList, setAddressList] = useState([
    { id: 1, name: "House", address: "Lot 3 Blk 24 Kristina Homes Subd.", city: "Davao City", details: "red gate" },
    { id: 2, name: "Office", address: "3rd Flr Prestige Bldg", city: "Makati City", details: "" },
    { id: 3, name: "Residence", address: "12 Masipag St.", city: "Quezon City", details: "Door 3C" },
  ]);
  const address = addressList.find((address) => address.id === Number(id));
  const saveAddress = () => {
    //
  }
  return (
    <IonPage>
      <Header
          title={`Edit Address`}
          showButton={true}
          type='back'
          style={{ background: 'transparent' }}
        />
      <IonContent fullscreen>
        <AddressLine>
          <label>Label</label>
          <Input name="label" className="address-input" value={address?.name}/>
        </AddressLine>
        <AddressLine>
          <label>House / Unit No. and Street</label>
          <Input name="street" className="address-input" value={address?.address}/>
        </AddressLine>
        <AddressLine>
          <label>City</label>
          <Input name="city" className="address-input" value={address?.city}/>
        </AddressLine>
        <AddressLine>
          <label>Notes to Driver</label>
          <Input name="notes" className="address-input" value={address?.details}/>
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

export default EditAddressPage;
