import styled from '@emotion/styled/macro';
import { useCallback, useEffect, useState } from 'react';
import { Food, Menu, StoreBasketItem } from '../store/types';

const OrderItemContainer = styled.div`
  display: flex;
  padding: 5px 30px;
  .quantity {
    width: 30px;
    font-weight: bold;
  }
  .price {
    margin-left: auto;
    flex-grow: 0;
    color: var(--ion-color-primary);
    font-weight: bold;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    color: var(--ion-color-medium);
  }
`;

const ButtonLink = styled.a`
  font-size: 12px;
  color: var(--ion-color-primary);
`;

interface OrderItemProps {
  item: StoreBasketItem;
  onClick: (id: number, itemId: number) => void;
}
const OrderItem = ({ item, onClick = () => {} }: OrderItemProps) => {
  const [variations, setVariations] = useState<Food[]>();
  const getSelectedVariation = useCallback(() => {
    return item.variations?.reduce<Food[]>(
      (foods: Food[], currentMenu: Menu) => {
        const currentFoods = currentMenu.foodItems?.filter((foodItem) => {
          return foodItem.chosen;
        });
        return [...foods, ...currentFoods];
      },
      []
    );
  }, [item]);

  useEffect(() => {
    setVariations(getSelectedVariation());
  }, [getSelectedVariation]);

  return (
    <OrderItemContainer onClick={() => onClick(item.food?.id || 0, item.id)}>
      <div className="quantity">{item.multiplier}x</div>
      <div className="details">
        <span className="title">{item.food?.name}</span>
        <ul>
          {variations?.map((variation) => (
            <li>{variation.name}</li>
          ))}
        </ul>
        <ButtonLink>Edit</ButtonLink>
      </div>
      <div className="price">{item.totalPrice}</div>
    </OrderItemContainer>
  );
};

export default OrderItem;
