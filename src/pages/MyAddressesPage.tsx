import styled from '@emotion/styled/macro';
import { IonContent, IonPage, IonFooter } from '@ionic/react';
import { Button, Header, Input } from '../components';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from "react-icons/ai";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { useHistory } from 'react-router';

const StyledMyAddressesPage = styled.div`
  input {
    margin-top: 20px !important;
  }
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid var(--ion-color-light);
  padding: 15px 30px;
  margin-bottom: 10px;

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
  padding: 10px 30px;
  border-top: 1px solid var(--ion-color-light);

  .icon {
    display: inline-flex;
    margin-left: auto;
  }
`;


const MyAddressesPage = () => {

  const [addressList, setAddressList] = useState([
    { id: 1, name: "House", address: "Lot 3 Blk 24 Kristina Homes Subd.", city: "Davao City", details: "red gate" },
    { id: 2, name: "Office", address: "3rd Flr Prestige Bldg", city: "Makati City", details: "" },
    { id: 3, name: "Residence", address: "12 Masipag St.", city: "Quezon City", details: "Door 3C" },
  ]);

  let history = useHistory();
  const newAddress = () => {
    history.push(`/profile/new-address`);
  };
  const editAddress = (i: any) => {
    history.push(`/profile/edit-address/`+i);
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
        {addressList.map((address) => (
        <AddressContainer key={address.id} onClick={() => {editAddress(address.id);}}>
          <div>
            <label>{address.name}</label>
            <p className="details">{address.address}</p>
            <p className="details">{address.city}</p>
            <p className="details">{address.details}</p>
          </div>
          <span className="icon"><FaPencilAlt/></span>
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
