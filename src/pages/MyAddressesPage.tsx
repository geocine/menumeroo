import styled from '@emotion/styled/macro';
import { IonContent, IonPage, IonFooter } from '@ionic/react';
import { Button, Header, Input } from '../components';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { useHistory } from 'react-router';

const StyledMyAddressesPage = styled.div`
  input {
    margin-top: 20px !important;
  }
`;

const AddressContainer = styled.div`
  display: block;
  margin: 0px 30px 20px 30px;

  label {
    font-family: 'AvenirLTStd-Heavy';
    color: var(--ion-color-secondary);
    font-size: 18px;
  }

  .details {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    color: var(--ion-color-medium);
  }

  .icon {
    display: inline-flex;
    margin-left: auto;
  }
`;

const NewAddress = styled.div`
  display: flex;
  font-weight: normal;
  font-family: 'AvenirLTStd-Heavy';
  color: var(--ion-color-secondary);
  font-size: 16px;
  text-align: left;
  margin: 0px 30px;

  .icon {
    display: inline-flex;
    margin-left: auto;
  }
`;


const MyAddressesPage = () => {

  const [addressList, setAddressList] = useState([
    { name: "House", address: "Lot 3 Blk 24 Kristina Homes Subd.", city: "Davao City", details: "red gate" },
    { name: "Office", address: "3rd Flr Prestige Bldg", city: "Makati City", details: "" },
    { name: "Residence", address: "12 Masipag St.", city: "Quezon City", details: "Door 3C" },
  ]);

  let history = useHistory();
  const newAddress = () => {
    history.push(`/profile/new-address`);
  };
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header
          title={`My Addresses`}
          showButton={true}
          type='back'
          style={{ background: 'transparent' }}
        />
        {addressList.map((address, i) => (
        <AddressContainer key={i}>
          <label>{address.name}</label>
          <span className="icon"><AiOutlineEdit/></span>
          <p className="details">{address.address}</p>
          <p className="details">{address.details}</p>
        </AddressContainer>
        ))}
        <NewAddress onClick={() => {newAddress();}}>
          <label>Add New Address</label>
          <span className="icon"><AiOutlinePlus/></span>
        </NewAddress>
      </IonContent>
    </IonPage>
  );
};

export default MyAddressesPage;
