import styled from '@emotion/styled/macro';
import { IonContent, IonPage, IonFooter } from '@ionic/react';
import { Button, Header, Input } from '../components';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { vstore } from '../store/store';

const StyledMyProfilePage = styled.div`
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
    color: var(--ion-color-secondary);
  }

  .number {
    display: block;
    font-family: 'AvenirLTStd';
    text-align: center;
    color: var(--ion-color-medium);
  }
`;

const ProfileInput = styled.div`
  display: block;
  font-family: 'AvenirLTStd';
  font-size: 18px;
  text-align: left;
  margin-left: 30px;
  color: var(--ion-color-medium);
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
    color: var(--ion-color-secondary);
    background: var(--ion-color-light) !important;
  }

  .data-holder input:read-only {
    margin: 0 !important;
    background: none !important;
    max-width: 100% !important;
    text-align: right;
    color: var(--ion-color-secondary);
  }
`;

const MyProfilePage = () => {
  const data = useSnapshot(vstore);
  const [readOnly = true, setReadOnly] = useState<boolean | undefined>();
  const [buttonText = 'Edit', setButtonText] = useState<string>();
  const editMode = () => {
    if (readOnly === true) {
      setReadOnly(false);
      setButtonText('Save');
    } else {
      setReadOnly(true);
      setButtonText('Edit');
      vstore.user.saveProfile();
    }
  };

  const updateProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (vstore.user.profile) {
      vstore.user.profile[e.target.name] = e.target.value;
    }
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
        <Header
          title={`My Profile`}
          showButton={true}
          type="back"
          style={{ background: 'transparent' }}
        />
        <StyledMyProfilePage>
          <ProfileHeader>
            <img src="/assets/images/avatar.png" alt="avatar"></img>
            <span className="fullname">{data.user.profile?.name}</span>
            <span className="number">change photo</span>
          </ProfileHeader>
          <ProfileInput>
            <p>
              My Name
              <span className="data-holder">
                <Input
                  name="name"
                  value={data.user.profile?.name}
                  onChange={updateProfile}
                  className="profile-input"
                  placeholder="Fullname"
                  readOnly={readOnly}
                />
              </span>
            </p>
          </ProfileInput>
          <ProfileInput>
            <p>
              Phone Number
              <span className="data-holder">
                <Input
                  prefix="+63"
                  name="phoneNumber"
                  value={data.user.profile?.phoneNumber}
                  onChange={updateProfile}
                  className="profile-input"
                  placeholder="Phone Number"
                  readOnly={readOnly}
                />
              </span>
            </p>
          </ProfileInput>
          <ProfileInput>
            <p>
              Email
              <span className="data-holder">
                <Input
                  name="email"
                  value={data.user.profile?.email}
                  onChange={updateProfile}
                  className="profile-input"
                  placeholder="Email"
                  readOnly={readOnly}
                />
              </span>
            </p>
          </ProfileInput>
        </StyledMyProfilePage>
      </IonContent>
      <IonFooter>
        <Button type="primary" onClick={() => editMode()}>
          {buttonText}
        </Button>
      </IonFooter>
    </IonPage>
  );
};

export default MyProfilePage;
