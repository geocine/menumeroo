import { IonSlides, IonSlide } from '@ionic/react';
import styled from '@emotion/styled/macro';
import { IcnChicken, IcnCoffee, IcnFood, IcnMuffin } from './Icon/Icon';
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

const categories = [
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

const Slides = styled(IonSlides)`
  padding: 10px 0;
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

const Card = styled.div<CardProps>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  display: flex;

  &:hover {
    background-color: var(--ion-color-primary);

    svg {
      color: var(--ion-color-light);
    }
  }

  background-color: ${(props) =>
    props.selected ? 'var(--ion-color-primary)' : 'var(--ion-color-light)'};

  svg {
    color: ${(props) =>
      props.selected ? 'var(--ion-color-light)' : 'var(--ion-color-dark)'};
  }
`;

interface CardProps {
  icon?: React.ReactNode;
  selected?: boolean;
  size: number;
}

interface CategoryCardProps extends CardProps {
  label: string;
  onClick: () => void;
}

const StyledCategoryCard = styled.div<{ size: number }>`
  width: ${(props) => `${props.size}px`};
  cursor: pointer;

  h2 {
    font-family: 'AvenirLTStd-Medium';
    font-size: 14px;
    text-transform: capitalize;
    margin-top: 10px;
  }
`;

const CategoryCard = ({
  label,
  icon,
  selected = false,
  onClick,
  size
}: CategoryCardProps) => {
  return (
    <StyledCategoryCard onClick={onClick} size={size}>
      <Card selected={selected} size={size}>
        {icon}
      </Card>
      <h2>{label}</h2>
    </StyledCategoryCard>
  );
};

interface CategorySliderProps {
  size?: number;
  spaceBetween?: number;
  margin?: number;
}

const CategorySlider = ({
  size = 70,
  margin = 30,
  spaceBetween = 30
}: CategorySliderProps) => {
  const [categoryList, categoryListSet] = useState(categories);

  const selectCategory = (label: string) => () => {
    const newCategoryList = categoryList.map((category: any) => {
      category.selected = false;
      if (category.label === label) {
        category.selected = true;
      }
      return category;
    });
    categoryListSet(newCategoryList);
  };

  return (
    <Slides options={{ ...slideOpts, spaceBetween }}>
      {categoryList.map((category: any, idx) => {
        return (
          <Slide key={idx} size={size} margin={margin}>
            <CategoryCard
              size={size}
              label={category.label}
              icon={category.icon}
              selected={category.selected}
              onClick={selectCategory(category.label)}
            />
          </Slide>
        );
      })}
    </Slides>
  );
};

export default CategorySlider;
