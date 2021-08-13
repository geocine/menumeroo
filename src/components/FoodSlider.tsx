import { IonSlides, IonSlide } from '@ionic/react';
import styled from '@emotion/styled/macro';
import { useState } from 'react';

const slideOpts = {
  // Default parameters
  slidesPerView: 'auto',
  autoHeight: true,
  freeMode: true,
  freeModeSticky: false,
  freeModeMomentumBounce: false,
  observer: true,
  observeParents: true,
  observeSlideChildren: true
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

const Slides = styled(IonSlides)<{ size: number }>`
  padding: 10px 0;
  min-height: ${(props) => `${props.size + 10}px`};
`;

const Slide = styled(IonSlide)<{ size: number; margin: number }>`
  width: ${(props) => `${props.size}px`};
  &:first-of-type {
    width: ${(props) => `${props.size + props.margin}px`};
  }
  &:last-of-type {
    width: ${(props) => `${props.size + props.margin}px`};
  }
  &:first-of-type > div {
    width: ${(props) => `${props.size + props.margin}px`};
    margin-left: ${(props) => `${props.margin}px`};
  }
  &:last-of-type > div {
    width: ${(props) => `${props.size + props.margin}px`};
    margin-right: ${(props) => `${props.margin}px`};
  }
`;

const Card = styled.div<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  background: var(--ion-color-light);

  img {
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    object-fit: cover;
    border-radius: 20px;
  }
`;

interface FoodCardProps {
  src?: string;
  label?: string;
  price?: number;
  size: number;
  onClick: () => void;
}

const StyledFoodCard = styled.div<{ size: number }>`
  width: ${(props) => `${props.size}px`};
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

const FoodCard = ({ size, label, price, src, onClick }: FoodCardProps) => {
  return (
    <StyledFoodCard onClick={onClick} size={size}>
      <Card size={size}>
        <img src={src} alt={label}></img>
      </Card>
      {price && <span>{`PHP ${price.toFixed(2)}`}</span>}
      <h2 className={price ? '' : 'no-price'}>{label}</h2>
    </StyledFoodCard>
  );
};

interface FoodSliderProps {
  size?: number;
  spaceBetween?: number;
  margin?: number;
}

const FoodSlider = ({
  size = 125,
  margin = 30,
  spaceBetween = 20
}: FoodSliderProps) => {
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
    <Slides options={{ ...slideOpts, spaceBetween }} size={size}>
      {foodList.map((food: any, idx) => {
        return (
          <Slide key={idx} size={size} margin={margin}>
            <FoodCard
              size={size}
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
