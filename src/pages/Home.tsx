import { IonContent, IonPage } from '@ionic/react';
import {
  Button,
  CategorySlider,
  FoodSlider,
  SearchHeader
} from '../components';
import {
  IcnCoffee,
  IcnChicken,
  IcnMuffin,
  IcnFood
} from '../components/Icon/Icon';
import { Category, Food } from '../store/types';

const foods: Food[] = [
  {
    label: 'Crispy Pata',
    src: '/assets/images/foods/Food1.jpeg',
    price: 535.99
  },
  {
    label: 'Pork Sisig',
    src: '/assets/images/foods/Food2.jpeg',
    price: 185.0
  },
  {
    label: 'Halo-halo',
    src: '/assets/images/foods/Food3.jpeg',
    price: 105.25
  },
  {
    label: 'Pancit Lucban',
    src: '/assets/images/foods/Food4.jpeg',
    price: 600.2
  }
];

const categories: Category[] = [
  {
    label: 'Drinks',
    icon: <IcnCoffee />
  },
  {
    label: 'Food',
    icon: <IcnChicken />
  },
  {
    label: 'Dessert',
    icon: <IcnMuffin />
  },
  {
    label: 'Merienda',
    icon: <IcnFood />
  }
];

const Home = () => {
  return (
    <IonPage>
      <SearchHeader />
      <IonContent fullscreen>
        <CategorySlider categories={categories} />
        <FoodSlider foods={foods} />
        <Button type="primary">Sign In</Button>
        <Button type="secondary">Sign Up</Button>
      </IonContent>
    </IonPage>
  );
};

export default Home;
