import { IonContent, IonPage } from '@ionic/react';
import styled from '@emotion/styled/macro';
import { IcnNext } from '../components/Icon/Icon';
import { Button } from '../components';

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
  font-size: 18px;
  text-align: left;
  margin-left: 30px;
  color: #2A3B56;
  
  .icon {
    float: right;
    margin-right: 30px;
  }
`;

const ProfileTab = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ProfileHeader>
          <img
            src="/assets/images/avatar.png" alt="avatar"
          ></img><br/>
          <span className="fullname">Jack Sparrow</span>
          <span className="number">+63 905 123 4567</span>
        </ProfileHeader>
        <ProfileLink>
          <p>My Profile<span className="icon"><IcnNext/></span></p>
        </ProfileLink>
        <ProfileLink>
          <p>Change Password<span className="icon"><IcnNext/></span></p>
        </ProfileLink>
        <ProfileLink>
          <p>Payment Settings<span className="icon"><IcnNext/></span></p>
        </ProfileLink>
        <ProfileLink>
          <p>My Vouchers<span className="icon"><IcnNext/></span></p>
        </ProfileLink>
        <ProfileLink>
          <p>Notification<span className="icon"><IcnNext/></span></p>
        </ProfileLink>
        <ProfileLink>
          <p>About Us<span className="icon"><IcnNext/></span></p>
        </ProfileLink>
        <ProfileLink>
          <p>Contact Us<span className="icon"><IcnNext/></span></p>
        </ProfileLink>
        <Button type="secondary" onClick={()=> {console.log('logout')}}>Sign Out</Button>
      </IonContent>
    </IonPage>
  );
};

export default ProfileTab;
