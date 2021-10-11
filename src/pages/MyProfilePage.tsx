import styled from '@emotion/styled/macro';
import { IonContent, IonPage, IonFooter } from '@ionic/react';
import { Button, Header, Input } from '../components';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { vstore } from '../store/store';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const StyledMyProfilePage = styled.div`
  input {
    margin-top: 20px !important;
  }
`;

const ProfileHeader = styled.div`
  height: 220px;

  img {
    display: flex;
    width: 150px;
    margin: 20px auto 0 auto;
  }

  .fullname {
    height: 25px;
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

  .avatar {
    display: block;
    text-align: center;
  }
`;

const ProfileInput = styled.div`
  display: block;
  font-family: 'AvenirLTStd';
  font-size: 16px;
  text-align: left;
  margin-left: 30px;
  color: var(--ion-color-medium);
  margin-top: 20px;
  margin-bottom: 30px;

  label {
    max-width: 35%;
    margin-top: 15px;
    display: inline-block;
  }

  .data-holder {
    float: right;
    margin-right: 30px;
    max-width: 55%;
    font-size: 14px;
  }

  .ant-input-affix-wrapper{
    max-width: 100% !important;
    background: var(--ion-color-light) !important;
  }

  .ant-input-affix-wrapper-readonly{
    background: none !important;
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
  const user = data.local.user;
  const [avatarImage, setAvatarImage] = useState<string>();
  const [readOnly = true, setReadOnly] = useState<boolean | undefined>();
  const [buttonText = 'Edit', setButtonText] = useState<string>();
  const [maxLength] = useState<number>(10);
  const editMode = () => {
    if (readOnly === true) {
      setReadOnly(false);
      setButtonText('Save');
    } else {
      setReadOnly(true);
      setButtonText('Edit');
      vstore.user.saveProfile(user.id);
    }
  };

  const updateProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (vstore.user.profile) {
      vstore.user.profile[e.target.name] = e.target.value;
    }
  };
  
  useEffect(() => {
    const load = async () => {
      await vstore.user.loadProfile(user.id);
    };
    load();
    setAvatarImage(data.user.profile?.avatar);
  }, []);

  const props = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    multiple: false,
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e);
      }
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const handleChange = async ({ file, fileList } : {file: any, fileList: any}) => {
    file.preview = await getBase64(file);
    setAvatarImage(file.preview)
  }
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
            <span className="avatar">
              <ImgCrop shape="round" grid>
                <Upload accept="image/*" itemRender={()=> <></>} showUploadList={false} onChange={handleChange} beforeUpload={() => false}>
                  <img src={avatarImage} alt="avatar"></img>
                </Upload>
              </ImgCrop>
            </span>
            <span className="fullname">{data.user.profile?.name}</span>
          </ProfileHeader>
          <ProfileInput>
            <label>My Name</label>
            <span className="data-holder">
              <Input
                name="name"
                value={data.user.profile?.name}
                onChange={updateProfile}
                className="profile-input"
                placeholder="Fullname"
                readOnly={readOnly}
                autoComplete="off"
              />
            </span>
          </ProfileInput>
          <ProfileInput>
            <label>Phone Number</label>
            <span className="data-holder">
              <Input
                prefix="+63"
                name="phoneNumber"
                value={data.user.profile?.phoneNumber}
                onChange={updateProfile}
                className="profile-input"
                placeholder="Phone Number"
                readOnly={readOnly}
                autoComplete="off"
                maxLength={maxLength}
              />
            </span>
          </ProfileInput>
          <ProfileInput>
            <label>Email</label>
            <span className="data-holder">
              <Input
                name="email"
                value={data.user.profile?.email}
                onChange={updateProfile}
                className="profile-input"
                placeholder="Email"
                readOnly={readOnly}
                autoComplete="off"
              />
            </span>
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
