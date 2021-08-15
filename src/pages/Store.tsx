import styled from '@emotion/styled/macro';
import { IonContent, IonPage, IonModal, useIonModal } from '@ionic/react';
import { useState } from 'react';
import { Header, FoodMenuGroup, FoodMenuItem } from '../components';
import { StoreData } from '../store/data';
import { Food } from '../store/types';

const { storeMenu } = StoreData;

const HeaderImage = styled.div`
  background-color: #eae8e8;
  height: 300px;
  margin-top: -82px;
`;

const FoodModal = styled(IonModal)`
  .modal-wrapper {
    height: 500px;
    bottom: 0;
    position: absolute;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }
  .ion-page {
    padding: 10px 30px;
  }
`;

const Store = () => {
  const [food, setFood] = useState<Food | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (foodItem: Food) => {
    setFood(foodItem);
    setShowModal(true);
  };

  return (
    <IonPage>
      <Header
        title="Store"
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <HeaderImage />
        {storeMenu.map((menu) => (
          <FoodMenuGroup title={menu.group}>
            {menu.foodItems.map((foodItem) => (
              <FoodMenuItem
                food={foodItem}
                onClick={(id) => openModal(foodItem)}
              />
            ))}
          </FoodMenuGroup>
        ))}
        <FoodModal
          isOpen={showModal}
          cssClass="food-mdal"
          onDidDismiss={() => setShowModal(false)}
        >
          {food?.name} {food?.id}
        </FoodModal>
      </IonContent>
    </IonPage>
  );
};

export default Store;
