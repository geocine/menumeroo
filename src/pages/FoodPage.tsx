import { IonPage, IonContent, IonTextarea, IonFooter } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSnapshot } from 'valtio';
import {
  Header,
  FoodVariationCard,
  Button,
  FoodVariations,
  Counter
} from '../components';

import styled from '@emotion/styled/macro';
import { vstore } from '../store/store';
import { TextareaChangeEventDetail } from '@ionic/core';

const HeaderImage = styled.div`
  background-color: #eae8e8;
  height: 300px;
  margin-top: -82px;

  img {
    object-fit: cover;
    height: 300px;
  }
`;

const FoodHeader = styled.div`
  background: #f5f5f561;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 15px 30px;
  margin-bottom: 10px;

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

const AddToCart = styled(IonFooter)`
  background: white;
`;

interface FoodParams {
  id: string;
  itemId?: string;
}

// TODO: think about cleanly separating food and basketItem details
const FoodPage = () => {
  const { id = '0', itemId = '0' } = useParams<FoodParams>();
  const history = useHistory();
  const data = useSnapshot(vstore);
  const currentFood = data.currentFood;
  const [buttonState, setButtonState] = useState(1);

  const buttonStates = {
    ADD: 1,
    REMOVE: 2,
    UPDATE: 3
  };

  useEffect(() => {
    if ((currentFood.multiplier || 0) > 0 && !parseInt(itemId)) {
      setButtonState(buttonStates.ADD);
    }
    if ((currentFood.multiplier || 0) > 0 && parseInt(itemId)) {
      setButtonState(buttonStates.UPDATE);
    }
    if ((currentFood.multiplier || 0) === 0) {
      setButtonState(buttonStates.REMOVE);
    }
  }, [
    itemId,
    currentFood.multiplier,
    buttonStates.ADD,
    buttonStates.UPDATE,
    buttonStates.REMOVE
  ]);

  useEffect(() => {
    const loadFood = async () => {
      await vstore.currentFood.loadFood(parseInt(id), parseInt(itemId));
    };
    loadFood();
  }, [id, itemId]);

  const multiplyPrice = (multiplier: number = 1) => {
    vstore.currentFood.multiplier = multiplier;
  };

  const updateBasket = () => {
    vstore.basket.addUpdateBasket(currentFood);
    history.goBack();
  };

  const removeFromBasket = () => {
    vstore.basket.removeFromBasket(currentFood);
    history.goBack();
  };

  const updateNote = (e: CustomEvent<TextareaChangeEventDetail>) => {
    vstore.basket.setNote(currentFood, e.detail.value || '');
  };

  return (
    <IonPage>
      <Header showButton={true} type="close" />
      <IonContent fullscreen>
        <HeaderImage>
          <img src={currentFood.food?.src} alt={currentFood.food?.name}></img>
        </HeaderImage>
        <FoodHeader>
          <header>
            <h1>{currentFood.food?.name}</h1>
            <div className="price">
              <h1>{currentFood.food?.price?.toFixed(2)}</h1>
              <label>Base price</label>
            </div>
          </header>
          <h3>{currentFood?.food?.description}</h3>
        </FoodHeader>
        {currentFood?.variations?.map((variation) => (
          <FoodVariationCard
            key={variation.id}
            title={variation.name}
            sideNote={variation.description}
          >
            <FoodVariations
              variations={variation.foodItems}
              choiceType={variation.choiceType}
            />
          </FoodVariationCard>
        ))}
        <FoodVariationCard title="Special Instructions" sideNote="Optional">
          <Instructions>
            <p>
              You won't be able to add special instructions after placing your
              order.
            </p>
            <TextArea
              placeholder="eg. No onions"
              value={currentFood.note}
              onIonChange={updateNote}
            ></TextArea>
          </Instructions>
        </FoodVariationCard>
        <Counter
          onChange={multiplyPrice}
          value={currentFood.multiplier || 1}
          min={parseInt(itemId) ? 0 : 1}
        />
      </IonContent>
      <AddToCart>
        {buttonState === buttonStates.ADD && (
          <Button type="primary" onClick={updateBasket}>
            Add to Basket - {(currentFood.totalPrice || 0).toFixed(2)}
          </Button>
        )}
        {buttonState === buttonStates.UPDATE && (
          <Button type="primary" onClick={updateBasket}>
            Update Basket - {(currentFood.totalPrice || 0).toFixed(2)}
          </Button>
        )}
        {buttonState === buttonStates.REMOVE && (
          <Button type="primary" onClick={removeFromBasket}>
            Remove From Basket
          </Button>
        )}
      </AddToCart>
    </IonPage>
  );
};

export default FoodPage;
