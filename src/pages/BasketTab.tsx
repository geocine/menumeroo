import styled from '@emotion/styled/macro';
import { IonContent, IonList, IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
import { useSnapshot } from 'valtio';
import { Header, BasketItem, Button } from '../components';
import { vstore } from '../store/store';
import { StoreBasket } from '../store/types';
import { Modal } from 'antd';
import { useState } from 'react';

const MModal = styled(Modal)`
  font-family: 'AvenirLTStd';
  .ant-modal-content {
    border-radius: 10px;
  }
  .ant-modal-header {
    border-radius: 10px 10px 0 0;
    font-family: 'AvenirLTStd-Heavy';
  }
  .ant-modal-body {
    padding: 10px 24px 0 24px;
  }
  .ant-modal-footer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    button {
      margin: 5px 0;
      width: auto;
      min-width: 100%;
    }
  }
`;

const BasketTab = () => {
  const data = useSnapshot(vstore);
  const [showModal, setShowModal] = useState(false);
  const [storeId, setStoreId] = useState(0);
  const history = useHistory();
  const openStore = (id: number) => {
    history.push(`/store/${id}`);
  };

  return (
    <IonPage>
      <Header showButton={true} type="back" title="My Basket" />
      <IonContent fullscreen>
        <IonList>
          {data.basket?.items.map((item: StoreBasket, index) => (
            <BasketItem
              key={index}
              store={item}
              borderRadius={5}
              size={50}
              onClick={openStore}
              onRemoveClick={(id: number) => {
                setStoreId(id);
                setShowModal(true);
              }}
            />
          ))}
        </IonList>
        <MModal
          title="Remove this order?"
          centered
          visible={showModal}
          closable={false}
          maskClosable={false}
          onOk={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          width={320}
          footer={[
            <Button
              key="back"
              type="secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                vstore.removeStoreBasket(storeId);
                setShowModal(false);
                setStoreId(0);
              }}
            >
              Yes, Remove
            </Button>
          ]}
        >
          <p>Do you want to remove this order from your basket?</p>
        </MModal>
      </IonContent>
    </IonPage>
  );
};

export default BasketTab;
