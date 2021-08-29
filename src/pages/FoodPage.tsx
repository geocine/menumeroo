import { IonPage, IonContent, IonTextarea, IonFooter } from '@ionic/react';
import { useEffect } from 'react';
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
}

const FoodPage = () => {
  const { id = '0' } = useParams<FoodParams>();
  const history = useHistory();
  const data = useSnapshot(vstore);

  useEffect(() => {
    const loadFood = async () => {
      await vstore.loadFood(parseInt(id));
    };
    loadFood();
  }, [id]);

  const multiplyPrice = (multiplier: number = 1) => {
    vstore.currentFood.multiplier = multiplier;
  };

  const updateBasket = () => {
    vstore.addUpdateBasket(data.currentFood);
    history.goBack();
  };

  const removeFromBasket = () => {
    vstore.removeFromBasket(data.currentFood);
    history.goBack();
  };

  return (
    <IonPage>
      <Header showButton={true} type="close" />
      <IonContent fullscreen>
        <HeaderImage>
          <img
            src={data.currentFood?.food?.src}
            alt={data.currentFood?.food?.name}
          ></img>
        </HeaderImage>
        <FoodHeader>
          <header>
            <h1>{data.currentFood?.food?.name}</h1>
            <div className="price">
              <h1>{data.currentFood?.food?.price?.toFixed(2)}</h1>
              <label>Base price</label>
            </div>
          </header>
          <h3>{data.currentFood?.food?.description}</h3>
        </FoodHeader>
        {data.currentFood?.variations?.map((variation) => (
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
              For self pick-ups, you won't be able to add special instructions
              after placing your order.
            </p>
            <TextArea placeholder="eg. No onions"></TextArea>
          </Instructions>
        </FoodVariationCard>
        <Counter
          onChange={multiplyPrice}
          value={data.currentFood.multiplier || 1}
          min={data.currentFood.inBasket ? 0 : 1}
        />
      </IonContent>
      <AddToCart>
        {(data.currentFood.multiplier || 0) > 0 && !data.currentFood.inBasket && (
          <Button type="primary" onClick={updateBasket}>
            Add to Basket - {(data.currentFood.totalPrice || 0).toFixed(2)}
          </Button>
        )}
        {(data.currentFood.multiplier || 0) > 0 && data.currentFood.inBasket && (
          <Button type="primary" onClick={updateBasket}>
            Update Basket - {(data.currentFood.totalPrice || 0).toFixed(2)}
          </Button>
        )}
        {(data.currentFood.multiplier || 0) === 0 && (
          <Button type="primary" onClick={removeFromBasket}>
            Remove From Basket
          </Button>
        )}
      </AddToCart>
    </IonPage>
  );
};

export default FoodPage;
