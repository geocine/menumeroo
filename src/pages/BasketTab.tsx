import styled from '@emotion/styled/macro';
import { IonContent, IonList, IonPage } from '@ionic/react';
import { useHistory } from 'react-router';
import { useSnapshot } from 'valtio';
import { Header, BasketItem, Button } from '../components';
import { vstore } from '../store/store';
import { StoreBasket } from '../store/types';
import { Modal } from 'antd';
import { useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';

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

const Container = styled.div`
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 30px;

  svg {
    width: 100px;
    height: auto;
  }

  strong {
    font-size: 16px;
    line-height: 22px;
    display: block;
    font-weight: normal;
    font-family: 'AvenirLTStd-Heavy';
    color: var(--ion-color-secondary);
  }
  p {
    font-size: 14px;
    line-height: 20px;
    color: var(--ion-color-medium)
    margin: 0;
  }
`;

const BasketTab = () => {
  const data = useSnapshot(vstore);
  const [showModal, setShowModal] = useState(false);
  const [storeId, setStoreId] = useState(0);
  const history = useHistory();
  const openStore = (id: number) => {
    history.push(`/store/${id}/basket`);
  };

  return (
    <IonPage>
      <Header showButton={true} type="back" title="My Basket" />
      <IonContent fullscreen>
        {data.basket?.items.length < 1 && (
          <Container>
            <FiShoppingBag size={100} strokeWidth={0.5} color={'#f55b02'} />
            <strong>Fill up your lonely basket with good food!</strong>
            <p>We can help you decide on what to order.</p>
          </Container>
        )}
        {data.basket?.items.length > 0 && (
          <>
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
                    vstore.currentStoreBasket.removeStoreBasket(storeId);
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
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default BasketTab;
