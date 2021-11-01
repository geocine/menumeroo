import styled from '@emotion/styled/macro';
import { IonContent, IonPage, IonFooter } from '@ionic/react';
import { Button, Header, Input } from '../components';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiFillPushpin } from "react-icons/ai";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { useHistory } from 'react-router';
import { vstore } from '../store/store';
import { useSnapshot } from 'valtio';
import { Address } from '../store/types';

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

  const data = useSnapshot(vstore);
  const user = data.local.user;

  const [addressList, setAddressList] = useState(data.local.user?.addresses);

  // useEffect(() => {
  //   console.log(user?.addresses);
  //   console.log(addressList);
  // }, []);

  let history = useHistory();
  const newAddress = () => {
    history.push(`/profile/new-address`);
  };
  const setDefaultAddress = () => {
    history.push(`/profile/address/1`);
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
        {addressList?.map((address: Address) => (
        <AddressContainer key={address.id} onClick={() => {editAddress(address.id);}}>
          <div>
            <label>{address.name}</label>
            <p className="details">{address.address}</p>
            <p className="details">{address.city}</p>
            <p className="details">{address.details}</p>
            <p className="details">{address.isDefault ? "[default]" : ""}</p>
          </div>
          <span className="icon"><FaPencilAlt/></span>
        </AddressContainer>
        ))}
        <NewAddress onClick={() => {setDefaultAddress();}}>
          <label>Set Default Address</label>
          <span className="icon"><AiFillPushpin/></span>
        </NewAddress>
        <NewAddress onClick={() => {newAddress();}}>
          <label>Add New Address</label>
          <span className="icon"><AiOutlinePlus/></span>
        </NewAddress>
        
      </IonContent>
    </IonPage>
  );
};

export default MyAddressesPage;
