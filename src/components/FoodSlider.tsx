import { IonSlides, IonSlide } from '@ionic/react';
import styled from '@emotion/styled/macro';
import { useState } from 'react';
import { Food } from '../store/types';

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

const Slides = styled(IonSlides)<{ height: number }>`
  padding: 10px 0;
  min-height: ${(props) => `${props.height + 10}px`};
`;

const Slide = styled(IonSlide)<{
  width: number;
  margin: number;
}>`
  width: ${(props) => `${props.width}px`};
  &:first-of-type {
    width: ${(props) => `${props.width + props.margin}px`};
  }
  &:last-of-type {
    width: ${(props) => `${props.width + props.margin}px`};
  }
  &:first-of-type > div {
    width: ${(props) => `${props.width + props.margin}px`};
    margin-left: ${(props) => `${props.margin}px`};
  }
  &:last-of-type > div {
    width: ${(props) => `${props.width + props.margin}px`};
    margin-right: ${(props) => `${props.margin}px`};
  }
`;

const Card = styled.div<{
  width: number;
  height: number;
  borderRadius: number;
}>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: ${(props) => `${props.borderRadius}px`};
  align-items: center;
  justify-content: center;
  display: flex;
  background: var(--ion-color-light);

  img {
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};
    object-fit: cover;
    border-radius: ${(props) => `${props.borderRadius}px`};
  }
`;
const StyledFoodCard = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
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

interface FoodCardProps {
  src?: string;
  label?: string;
  price?: number;
  width: number;
  height: number;
  borderRadius: number;
  onClick: () => void;
}

const FoodCard = ({
  width,
  height,
  label,
  price,
  src,
  onClick,
  borderRadius
}: FoodCardProps) => {
  return (
    <StyledFoodCard onClick={onClick} width={width}>
      <Card width={width} height={height} borderRadius={borderRadius}>
        <img src={src} alt={label}></img>
      </Card>
      {price && <span>{`PHP ${price.toFixed(2)}`}</span>}
      <h2 className={price ? '' : 'no-price'}>{label}</h2>
    </StyledFoodCard>
  );
};

interface FoodSliderProps {
  size?: number;
  width?: number;
  height?: number;
  borderRadius?: number;
  spaceBetween?: number;
  margin?: number;
  foods: Food[];
}

const FoodSlider = ({
  size = 125,
  margin = 30,
  spaceBetween = 20,
  width,
  height,
  borderRadius = 20,
  foods = []
}: FoodSliderProps) => {
  const [foodList, foodListSet] = useState(foods);
  const lWidth = width || size;
  const lHeight = height || size;

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
    <Slides options={{ ...slideOpts, spaceBetween }} height={lHeight}>
      {foodList.map((food: any, idx) => {
        return (
          <Slide key={idx} width={lWidth} margin={margin}>
            <FoodCard
              borderRadius={borderRadius}
              width={lWidth}
              height={lHeight}
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
