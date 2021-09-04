import styled from '@emotion/styled/macro';
import { StoreBasket } from '../store/types';
import { RiCloseCircleFill } from 'react-icons/ri';
import { MouseEvent } from 'react';

const StoreImage = styled.div<{ size: number; borderRadius: number }>`
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

const StoreCard = styled.div`
  display: flex;
  padding: 10px 30px;
  border-bottom: 1px solid #efefef;
`;

const StoreDetails = styled.div<{ margin: number }>`
  margin-left: ${(props) => `${props.margin}px`};
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
  }
  h2 {
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 2px;
    font-family: 'AvenirLTStd';
    color: var(--ion-color-medium);
    font-weight: 400;
  }
`;

interface CartItemProps {
  store: StoreBasket;
  size?: number;
  margin?: number;
  borderRadius?: number;
  onClick?: (id: number) => void;
  onRemoveClick?: (id: number) => void;
}

const RemoveButton = styled.a`
  margin-left: auto;
  font-size: 25px;
  color: var(--ion-color-primary);
  width: 40px;
  height: 40px;
  display: flex;
  svg {
    margin: 0 auto;
    align-self: center;
  }
  &:visited,
  &:focus,
  &:hover {
    color: var(--ion-color-primary);
  }
`;

const CartItem = ({
  store,
  size = 100,
  margin = 20,
  borderRadius = 20,
  onClick = () => {},
  onRemoveClick = () => {}
}: CartItemProps) => {
  const { src, name, time, distance, id, orders = [] } = store;

  const removeItem = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    onRemoveClick(id);
  };

  return (
    <StoreCard onClick={() => onClick(id)}>
      <StoreImage size={size} borderRadius={borderRadius}>
        <img src={src} alt={name}></img>
      </StoreImage>
      <StoreDetails margin={margin}>
        <h1>{name}</h1>
        <h2>
          {orders.length} items - {time} - {distance}
        </h2>
      </StoreDetails>
      <RemoveButton onClick={removeItem}>
        <RiCloseCircleFill />
      </RemoveButton>
    </StoreCard>
  );
};

export default CartItem;
