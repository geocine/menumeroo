import styled from '@emotion/styled/macro';
import { Food as FoodType } from '../store/types';

const FoodImage = styled.div<{ size: number; borderRadius: number }>`
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  border-radius: ${(props) => `${props.borderRadius}px`};
  background: var(--ion-color-light);
  flex-shrink: 0;
  img {
    width: ${(props) => `${props.size}px`};
    height: ${(props) => `${props.size}px`};
    object-fit: cover;
    border-radius: ${(props) => `${props.borderRadius}px`};
  }
`;

const Food = styled.div<{ compact: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.compact ? 'row' : 'column')};
`;

const FoodDetails = styled.div<{ margin: number; compact: boolean }>`
  margin-left: ${(props) => (props.compact ? `${props.margin}px` : 0)};
  display: flex;
  flex-direction: column;

  h1 {
    font-family: 'AvenirLTStd';
    font-size: 16px;
    line-height: 21px;
    font-weight: 800;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }
  p {
    font-size: 12px;
    margin-bottom: 0;
    font-family: 'AvenirLTStd';
    color: var(--ion-color-medium);
    font-weight: 400;
  }
  span {
    color: var(--ion-color-primary);
    font-family: 'AvenirLTStd-Heavy';
    font-size: 14px;
  }
`;

interface FoodMenuItemProps {
  food: FoodType;
  size?: number;
  margin?: number;
  borderRadius?: number;
  compact?: boolean;
  onClick?: (id: number) => void;
}

const FoodMenuItem = ({
  food,
  size = 100,
  margin = 20,
  borderRadius = 20,
  compact = true,
  onClick = () => {}
}: FoodMenuItemProps) => {
  const { src, name, description, price, id } = food;
  return (
    <Food onClick={() => onClick(id)} compact={compact}>
      <FoodImage size={size} borderRadius={borderRadius}>
        <img src={src} alt={name}></img>
      </FoodImage>
      <FoodDetails margin={margin} compact={compact}>
        <h1>{name}</h1>
        <p>{description}</p>
        {price && <span>{`PHP ${price.toFixed(2)}`}</span>}
      </FoodDetails>
    </Food>
  );
};

export default FoodMenuItem;
