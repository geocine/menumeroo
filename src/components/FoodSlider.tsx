import { IonSlides, IonSlide } from '@ionic/react';
import styled from '@emotion/styled/macro';
import { useState } from 'react';

const slideOpts = {
  // Default parameters
  slidesPerView: 'auto',
  spaceBetween: 20,
  autoHeight: true,
  freeMode: true,
  freeModeSticky: false
};

const foods = [
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

const Slides = styled(IonSlides)`
  padding: 10px 0;
  min-height: 135px;
`;

const Slide = styled(IonSlide)`
  width: 125px;
  &:first-of-type {
    width: 145px;
  }
  &:last-of-type {
    width: 145px;
  }
  &:first-of-type > div {
    width: 145px;
    margin-left: 20px;
  }
  &:last-of-type > div {
    width: 145px;
    margin-right: 20px;
  }
`;

const Card = styled.div`
  width: 125px;
  height: 125px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  background: var(--ion-color-light);

  img {
    width: 125px;
    height: 125px;
    object-fit: cover;
    border-radius: 20px;
  }
`;

interface FoodCardProps {
  src?: string;
  label?: string;
  price?: number;
  onClick: () => void;
}

const StyledFoodCard = styled.div`
  width: 125px;
  text-align: left;

  h2 {
    font-family: 'AvenirLTStd-Roman';
    font-size: 14px;
    text-transform: capitalize;
    margin-top: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    &.no-price {
      margin-top: 8px;
    }
  }

  span {
    color: var(--ion-color-primary);
    font-family: 'AvenirLTStd-Heavy';
    font-size: 14px;
  }
`;

const FoodCard = ({ label, price, src, onClick }: FoodCardProps) => {
  return (
    <StyledFoodCard onClick={onClick}>
      <Card>
        <img src={src} alt={label}></img>
      </Card>
      {price && <span>{`PHP ${price.toFixed(2)}`}</span>}
      <h2 className={price ? '' : 'no-price'}>{label}</h2>
    </StyledFoodCard>
  );
};

const FoodSlider = () => {
  const [foodList, foodListSet] = useState(foods);

  const selectFood = (label: string) => () => {
    const newFoodList = foodList.map((food: any) => {
      food.selected = false;
      if (food.label === label) {
        food.selected = true;
      }
      return food;
    });
    foodListSet(newFoodList);
  };

  return (
    <Slides options={slideOpts}>
      {foodList.map((food: any, idx) => {
        return (
          <Slide key={idx}>
            <FoodCard
              label={food.label}
              src={food.src}
              price={food.price}
              onClick={selectFood(food.label)}
            />
          </Slide>
        );
      })}
    </Slides>
  );
};

export default FoodSlider;
