import { IonSlides, IonSlide } from '@ionic/react';
import styled from '@emotion/styled/macro';
import React from 'react';
import { Category } from '../store/types';
import { IcnCoffee, IcnChicken, IcnMuffin, IcnFood } from './Icon/Icon';

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

const Slides = styled(IonSlides)`
  padding: 10px 0;
`;

const Slide = styled(IonSlide)<{ width: number; margin: number }>`
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

interface CardProps {
  icon?: React.ReactNode;
  selected?: boolean;
  width: number;
  height: number;
  borderRadius: number;
}

const Card = styled.div<CardProps>`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border-radius: ${(props) => `${props.borderRadius}px`};
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

interface CategoryCardProps extends CardProps {
  label: string;
  onClick: () => void;
}

const StyledCategoryCard = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
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
  width,
  height,
  borderRadius
}: CategoryCardProps) => {
  return (
    <StyledCategoryCard onClick={onClick} width={width}>
      <Card
        selected={selected}
        width={width}
        height={height}
        borderRadius={borderRadius}
      >
        {icon}
      </Card>
      <h2>{label}</h2>
    </StyledCategoryCard>
  );
};

interface CategorySliderProps {
  size?: number;
  width?: number;
  height?: number;
  spaceBetween?: number;
  margin?: number;
  borderRadius?: number;
  categories: Category[];
  onSelect: (id: number) => void;
}

const CategorySlider = ({
  size = 70,
  margin = 30,
  spaceBetween = 30,
  width,
  height,
  borderRadius = 20,
  categories = [],
  onSelect = () => {}
}: CategorySliderProps) => {
  const lWidth = width || size;
  const lHeight = height || size;

  const CategoryIcon = ({ name }: { name: string }) => {
    const categoryIcon: { [key: string]: React.ReactElement | null } = {
      coffee: <IcnCoffee />,
      chicken: <IcnChicken />,
      muffin: <IcnMuffin />,
      food: <IcnFood />
    };

    return categoryIcon[name];
  };

  return (
    <Slides options={{ ...slideOpts, spaceBetween }}>
      {categories.map((category: Category) => {
        return (
          <Slide key={category.id} width={lWidth} margin={margin}>
            <CategoryCard
              borderRadius={borderRadius}
              width={lWidth}
              height={lHeight}
              label={category.name}
              icon={<CategoryIcon name={category.icon} />}
              selected={category.selected}
              onClick={() => onSelect(category.id)}
            />
          </Slide>
        );
      })}
    </Slides>
  );
};

export default CategorySlider;
