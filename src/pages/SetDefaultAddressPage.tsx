import styled from '@emotion/styled/macro';
import { IonContent, IonPage, IonFooter, IonCheckbox } from '@ionic/react';
import { Button, Header, Input } from '../components';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiFillPushpin } from "react-icons/ai";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import { useHistory } from 'react-router';

const StyledSetDefaultAddressPage = styled.div`
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


const SetDefaultAddressPage = () => {

  const [addressList, setAddressList] = useState([
    { id: 1, name: "House", address: "Lot 3 Blk 24 Kristina Homes Subd.", city: "Davao City", details: "red gate", isDefault: false },
    { id: 2, name: "Office", address: "3rd Flr Prestige Bldg", city: "Makati City", details: "", isDefault: true },
    { id: 3, name: "Residence", address: "12 Masipag St.", city: "Quezon City", details: "Door 3C", isDefault: false },
  ]);

  let history = useHistory();
  
  const setDefault = (value: number) => {
    setAddressList(
      addressList?.map((address) => {
        address.isDefault = address.id === value;
        return address;
      })
    );
  };
  const saveDefaultAddress = () => {
    //
  }
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header
          title={`Set Default Address`}
          showButton={true}
          type='back'
          style={{ background: 'transparent' }}
        />
        {addressList.map((address) => (
        <AddressContainer key={address.id} onClick={() => {setDefault(address.id);}}>
          <div>
            <label>{address.name}</label>
            <p className="details">{address.address}</p>
            <p className="details">{address.city}</p>
            <p className="details">{address.details}</p>
          </div>
          <span className="icon">
              <IonCheckbox
                slot="end"
                color="primary"
                mode="ios"
                name={address.name}
                value={address.address}
                checked={address.isDefault}
              />
            </span>
        </AddressContainer>
        ))}
        
      </IonContent>
      <IonFooter>
        <Button type="primary" onClick={() => saveDefaultAddress()}>
          Save
        </Button>
      </IonFooter>
    </IonPage>
  );
};

export default SetDefaultAddressPage;
