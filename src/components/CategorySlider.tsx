import { IonSlides, IonSlide } from '@ionic/react';
import styled from '@emotion/styled/macro';
import { IcnChicken, IcnCoffee, IcnFood, IcnMuffin } from './Icon/Icon';
import { useState } from 'react';

const slideOpts = {
  // Default parameters
  slidesPerView: 'auto',
  spaceBetween: 30,
  autoHeight: true,
  freeMode: true,
  freeModeSticky: false
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

const Slide = styled(IonSlide)`
  width: 70px;
  &:first-of-type {
    width: 100px;
  }
  &:last-of-type {
    width: 100px;
  }
  &:first-of-type > div {
    width: 100px;
    margin-left: 30px;
  }
  &:last-of-type > div {
    width: 100px;
    margin-right: 30px;
  }
`;

const Card = styled.div<CardProps>`
  width: 70px;
  height: 70px;
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
}

interface CategoryCardProps extends CardProps {
  label: string;
  onClick: () => void;
}

const StyledCategoryCard = styled.div`
  width: 70px;
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
  onClick
}: CategoryCardProps) => {
  return (
    <StyledCategoryCard onClick={onClick}>
      <Card selected={selected}>{icon}</Card>
      <h2>{label}</h2>
    </StyledCategoryCard>
  );
};

const CategorySlider = () => {
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
    <Slides options={slideOpts}>
      {categoryList.map((category: any, idx) => {
        return (
          <Slide key={idx}>
            <CategoryCard
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
