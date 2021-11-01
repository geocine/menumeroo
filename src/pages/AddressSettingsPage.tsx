import styled from '@emotion/styled/macro';
import { IonContent, IonPage, IonFooter, IonCheckbox } from '@ionic/react';
import { Button, Header, Subtitle } from '../components';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { vstore } from '../store/store';
import { useSnapshot } from 'valtio';
import { Address } from '../store/types';

const StyleTitleSection = styled.div`
  margin: 10px auto;
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

interface AddressSettingsPageParam {
  /**
   * 0 = choose address on checkout
   * 1 = set default address on profile
   */
  mode?: string;
}


const AddressSettingsPage = () => {

  const data = useSnapshot(vstore);
  const user = data.local.user;

  const { mode } = useParams<AddressSettingsPageParam>();
  const [headingSubtitle, setHeadingSubtitle] = useState<string>(
    'Choose payment method'
  );
  const [heading, setHeading] = useState<string>('Payment Methods');

  const [addressList, setAddressList] = useState<Address[]>();

  const getAddressData = (list: Address[]) => {
    var addressData: Address[] = [];
    list.map((address: Address) => {
      var newAddress: Address = ({
        id: address.id,
        name: address.name,
        address: address.address,
        city: address.city,
        details: address.details,
        isDefault: address.isDefault
      });
      addressData.push(newAddress);
      return address;
    })
    return addressData;
  }

  useEffect(() => {
    if(user && user.addresses){
      setAddressList(getAddressData(user.addresses));
    }
  }, []);

  useEffect(() => {
    if (mode === '1') {
      setHeading('Address Settings');
      setHeadingSubtitle('Choose default address');
    } else {
      setHeading('Address Settings');
      setHeadingSubtitle('Choose delivery address');
    }
  }, [mode]);

  let history = useHistory();
  
  const setDefault = (value: number) => {
    if(addressList !== undefined){
      setAddressList(
        addressList.map((address: Address) => {
          address.isDefault = address.id === value ? true : false;
          return address;
        })
      );
    }
  };
  
  const saveDefaultAddress = () => {
    if(mode === '1'){
      if (vstore.user.profile && vstore.local.user) {
        vstore.user.profile['addresses'] = addressList;
        vstore.local.user.addresses = addressList;
      }
    }
  }
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header
          title={heading}
          showButton={true}
          type='back'
          style={{ background: 'transparent' }}
        />
        <StyleTitleSection>
          <Subtitle text={headingSubtitle} />
        </StyleTitleSection>
        {addressList?.map((address: Address) => (
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

export default AddressSettingsPage;
