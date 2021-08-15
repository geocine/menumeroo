import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { Header, FoodMenuCategory, FoodMenuItem } from '../components';

const HeaderImage = styled.div`
  background-color: #eae8e8;
  height: 300px;
  margin-top: -82px;
`;

const Store = () => {
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
        <FoodMenuCategory title="Breakfast">
          <FoodMenuItem
            food={{
              id: 1,
              name: 'Chicken',
              description: 'Chicken fried in oil',
              src: '/assets/images/foods/Food1.jpeg',
              price: 200
            }}
            size={70}
            margin={10}
          />
          <FoodMenuItem
            food={{
              id: 1,
              name: 'Chicken',
              src: '/assets/images/foods/Food1.jpeg',
              price: 200
            }}
            size={70}
            margin={10}
          />
        </FoodMenuCategory>
        <FoodMenuCategory title="Breakfast">
          <FoodMenuItem
            food={{
              id: 1,
              name: 'Chicken',
              description: 'Chicken fried in oil',
              src: '/assets/images/foods/Food1.jpeg',
              price: 200
            }}
            size={70}
            margin={10}
          />
          <FoodMenuItem
            food={{
              id: 1,
              name: 'Chicken',
              src: '/assets/images/foods/Food1.jpeg',
              price: 200
            }}
            size={70}
            margin={10}
          />
        </FoodMenuCategory>
      </IonContent>
    </IonPage>
  );
};

export default Store;
