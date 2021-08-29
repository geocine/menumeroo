import styled from '@emotion/styled/macro';
import { StoreBasket } from '../store/types';

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
}

const CartItem = ({
  store,
  size = 100,
  margin = 20,
  borderRadius = 20,
  onClick = () => {}
}: CartItemProps) => {
  const { src, name, time, distance, id, orders = [] } = store;
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
    </StoreCard>
  );
};

export default CartItem;
