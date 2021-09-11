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
    color: #2a3b56;
  }

  .number {
    display: block;
    font-family: 'AvenirLTStd';
    text-align: center;
    color: #8a94a3;
  }
`;

const ProfileLink = styled.div`
  display: block;
  font-family: 'AvenirLTStd';
  font-size: 18px;
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
  let history = useHistory();
  const data = useSnapshot(vstore);
  const openProfile = () => {
    history.push(`/profile/edit`);
  };
  const openAddresses = () => {
    history.push(`/profile/addresses`);
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
          <img src={data.user.profile?.avatar} alt="avatar"></img>
          <span className="fullname">{data.user.profile?.name}</span>
          <span className="number">{data.user.profile?.phoneNumber}</span>
        </ProfileHeader>
        <ProfileLink
          onClick={() => {
            openProfile();
          }}
        >
          <p>
            My Profile
            <span className="icon">
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
            <span className="icon">
              <IcnNext />
            </span>
          </p>
        </ProfileLink>
        <ProfileLink>
          <p>
            Change Password
            <span className="icon">
              <IcnNext />
            </span>
          </p>
        </ProfileLink>
        <ProfileLink>
          <p>
            Payment Settings
            <span className="icon">
              <IcnNext />
            </span>
          </p>
        </ProfileLink>
        <Button
          type="secondary"
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
