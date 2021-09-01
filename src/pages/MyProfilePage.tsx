import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Button, Header, Input } from '../components';
import { useEffect, useState } from 'react';

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
    color: #2a3b56;
  }

  .number {
    display: block;
    font-family: 'AvenirLTStd';
    text-align: center;
    color: #8a94a3;
  }
`;

const ProfileInput = styled.div`
  display: block;
  font-family: 'AvenirLTStd';
  font-size: 18px;
  text-align: left;
  margin-left: 30px;
  color: #8A94A3;
  margin-top: 20px;
  margin-bottom: 20px;

  .data-holder {
    float: right;
    margin-right: 30px;
  }
  
  .data-holder input {
    margin: 0 !important;
    background: none !important;
    height: auto !important;
    max-width: 100% !important;
    padding: 0 !important;
    text-align: right;
    color: #2A3B56;
  }
`;

const saveProfile = (data: any) => {
  // login process
  console.log(data);
};

const MyProfilePage = () => {
  const [data, setData] = useState<any | null>();
  let inputData = [];
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header
          title={`My Profile`}
          showButton={true}
          type='back'
          style={{ background: 'transparent' }}
        />
        <StyledMyProfilePage>
          <ProfileHeader>
            <img src='/assets/images/avatar.png' alt='avatar'></img>
            <span className='fullname'>Jack Sparrow</span>
            <span className='number'>change photo</span>
          </ProfileHeader>
          <ProfileInput>
            <p>My Name
            <span className='data-holder'>
              <Input
                onChange={e => inputData.push(e.target.value)}
                className='profile-input'
                placeholder='name'
                value='Jack Sparrow'
              />
            </span>
            </p>
          </ProfileInput>
          <ProfileInput>
            <p>Phone Number
            <span className='data-holder'>
              <Input
                onChange={e => inputData.push(e.target.value)}
                className='profile-input'
                placeholder='number'
                value='+63 905 123 4567'
              />
            </span>
            </p>
          </ProfileInput>
          <ProfileInput>
            <p>Email
            <span className='data-holder'>
              <Input
                onChange={e => inputData.push(e.target.value)}
                className='profile-input'
                placeholder='number'
                value='jack@foodorder.com'
              />
            </span>
            </p>
          </ProfileInput>
          <Button type='primary' onClick={() => saveProfile('data')}>
            Save
          </Button>
        </StyledMyProfilePage>
      </IonContent>
    </IonPage>
  );
};

export default MyProfilePage;
