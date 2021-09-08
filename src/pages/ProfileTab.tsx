import { IonContent, IonPage } from '@ionic/react';
import styled from '@emotion/styled/macro';
import { IcnNext } from '../components/Icon/Icon';
import { Button } from '../components';
import { useHistory } from 'react-router';
import { useSnapshot } from 'valtio';
import { vstore } from '../store/store';
import { useEffect } from 'react';


const ProfileHeader = styled.div`

  img {
    display: flex;
    width: 150px;
    margin: 50px auto 0 auto;
  }

  .fullname {
    display: block;
    font-family: 'AvenirLTStd';
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    color: #2A3B56;
  }

  .number {
    display: block;
    font-family: 'AvenirLTStd';
    text-align: center;
    color: #8A94A3;
  }
`;

const ProfileLink = styled.div`
  display: block;
  font-family: 'AvenirLTStd';
  font-size: 16px;
  text-align: left;
  margin-left: 30px;
  color: #2a3b56;
  margin-top: 20px;
  margin-bottom: 30px;

  .icon {
    float: right;
    margin-right: 30px;
  }
`;

const ProfileTab = () => {
  const data = useSnapshot(vstore);
  let history = useHistory();
  
  const openProfile = () => {
    history.push(`/profile/edit`);
  };

  const openAddresses = () => {
    history.push(`/profile/addresses`);
  };

  const openPasswordUpdate = () => {
    history.push(`/profile/password`);
  };

  const openPaymentSettings = () => {
    history.push(`/profile/payment`);
  };

  useEffect(() => {
    const load = async () => {
      await vstore.user.loadProfile(1);
    };
    load();
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <ProfileHeader>
          <img src='/assets/images/avatar.png' alt='avatar'></img>
          <span className='fullname'>{data.user.profile?.name}</span>
          <span className='number'>+63{data.user.profile?.phoneNumber}</span>
        </ProfileHeader>
        <ProfileLink
          onClick={() => {
            openProfile();
          }}
        >
          <p>
            My Profile
            <span className='icon'>
              <IcnNext />
            </span>
          </p>
        </ProfileLink>
        <ProfileLink
          onClick={() => {
            openAddresses();
          }}
        >
          <p>
            My Addresses
            <span className='icon'>
              <IcnNext />
            </span>
          </p>
        </ProfileLink>
        <ProfileLink
          onClick={() => {
            openPasswordUpdate();
          }}
        >
          <p>
            Change Password
            <span className='icon'>
              <IcnNext />
            </span>
          </p>
        </ProfileLink>
        <ProfileLink
          onClick={() => {
            openPaymentSettings();
          }}
        >
          <p>
            Payment Settings
            <span className='icon'>
              <IcnNext />
            </span>
          </p>
        </ProfileLink>
        <Button
          type='secondary'
          onClick={() => {
            console.log('logout');
          }}
        >
          Sign Out
        </Button>
      </IonContent>
    </IonPage>
  );
};

export default ProfileTab;
