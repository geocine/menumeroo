import { IonPage, IonContent, IonTextarea } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSnapshot } from 'valtio';
import { Header, FoodVariationCard } from '../components';
import { Food } from '../store/types';

import styled from '@emotion/styled/macro';
import { vstore } from '../store/store';

const HeaderImage = styled.div`
  background-color: #eae8e8;
  height: 300px;
  margin-top: -82px;

  img {
    object-fit: cover;
  }
`;

const FoodHeader = styled.div`
  background: #f5f5f561;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 15px 30px;
  margin-bottom: 10px;
  margin-top: 5px;

  h1 {
    font-family: 'AvenirLTStd-Heavy';
    font-size: 22px;
  }

  h3 {
    color: var(--ion-color-medium);
    font-family: 'AvenirLTStd';
    font-size: 14px;
    margin-top: 20px;
  }

  header {
    display: flex;

    h1 {
      margin-bottom: 0;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .price {
      margin-left: auto;
      width: 150px;
      text-align: right;

      h1 {
        color: var(--ion-color-primary);
      }

      label {
        color: var(--ion-color-medium);
        font-family: 'AvenirLTStd';
      }
    }
  }
`;

const Instructions = styled.div`
  font-size: 14px;
  color: var(--ion-color-medium);
  p {
    margin-top: 5px;
    line-height: 20px;
  }
`;

const TextArea = styled(IonTextarea)`
  border-radius: 5px;
  background-color: var(--ion-color-light);
  font-family: 'AvenirLTStd';
`;

const FoodPage = () => {
  const { id } = useParams<any>();
  const data = useSnapshot(vstore);

  useEffect(() => {
    const loadFood = async () => {
      await data.loadFood(id);
    };
    loadFood();
  }, [id]);

  return (
    <IonPage>
      <Header showButton={true} type="close" />
      <IonContent fullscreen>
        <HeaderImage>
          <img src={data.currentFood.src} alt={data.currentFood.name}></img>
        </HeaderImage>
        <FoodHeader>
          <header>
            <h1>{data.currentFood.name}</h1>
            <div className="price">
              <h1>{`PHP ${data.currentFood.price}`}</h1>
              <label>Base price</label>
            </div>
          </header>
          <h3>{data.currentFood.description}</h3>
        </FoodHeader>
        <FoodVariationCard title="Special Instructions" sideNote="Optional">
          <Instructions>
            <p>
              For self pick-ups, you won't be able to add special instructions
              after placing your order.
            </p>
            <TextArea placeholder="eg. No onions"></TextArea>
          </Instructions>
        </FoodVariationCard>
      </IonContent>
    </IonPage>
  );
};

export default FoodPage;
