import styled from '@emotion/styled/macro';
import { IonContent, IonPage } from '@ionic/react';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useSnapshot } from 'valtio';
import { Header, FoodMenuCard, FoodMenuItem } from '../components';
import { vstore } from '../store/store';

const HeaderImage = styled.div`
  background-color: #eae8e8;
  height: 300px;
  margin-top: -82px;
`;

interface StorePageParams {
  id?: string;
}

const StorePage = () => {
  const { id } = useParams<StorePageParams>();
  const data = useSnapshot(vstore);
  const history = useHistory();

  useEffect(() => {
    const loadStore = async () => {
      if (id) {
        await data.loadStore(parseInt(id));
      }
    };
    loadStore();
  }, [id]);

  const openFood = (id: number) => {
    history.push(`/food/${id}`);
  };

  return (
    <IonPage>
      <Header
        title={`Store ${id}`}
        showButton={true}
        type="back"
        style={{ background: 'transparent' }}
      />
      <IonContent fullscreen>
        <HeaderImage />
        {data.currentStore.menu?.map((menu) => (
          <FoodMenuCard key={menu.id} title={menu.name}>
            {menu.foodItems.map((food) => (
              <FoodMenuItem
                key={food.id}
                food={food}
                onClick={(id) => openFood(id)}
              />
            ))}
          </FoodMenuCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default StorePage;
