import styled from '@emotion/styled/macro';
import { IonCheckbox } from '@ionic/react';
import dayjs from 'dayjs';
import { Discount } from '../store/types';
import { IcnClock } from './Icon/Icon';

const DiscountImage = styled.div<{ size: number; borderRadius: number }>`
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
  position: relative;
`;

const Food = styled.div<{ compact: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.compact ? 'row' : 'column')};
`;

const DiscountDetails = styled.div<{ margin: number; compact: boolean }>`
  margin-left: ${(props) => (props.compact ? `${props.margin}px` : 0)};
  display: flex;
  flex-direction: column;

  h1 {
    font-family: 'AvenirLTStd';
    font-size: 16px;
    line-height: 21px;
    font-weight: 800;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0;
  }
  span {
    color: var(--ion-color-primary);
    font-family: 'AvenirLTStd-Heavy';
    font-size: 14px;
  }
`;

const DiscountDetailIcon = styled.div`
  display: flex;
  align-items: center;
  min-height: 16px;
  margin-bottom: 5px;

  svg {
    overflow: visible;
    color: var(--ion-color-medium);
    font-size: 12px;
    width: 12px;
    height: 12px;
  }
  h2 {
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 2px;
    font-family: 'AvenirLTStd';
    margin-left: 10px;
    color: var(--ion-color-medium);
    font-weight: 400;
  }
`;

const DiscountSelection = styled.div`
  flex-grow: 1;
  display: flex;
  ion-checkbox {
    margin-left: auto;
    align-self: center;
  }
`;

interface DiscountItemProps {
  discount: Discount;
  size?: number;
  margin?: number;
  borderRadius?: number;
  compact?: boolean;
  isChecked?: boolean;
  onClick?: (id: number) => void;
}

const DiscountItem = ({
  discount,
  size = 100,
  margin = 20,
  borderRadius = 20,
  compact = true,
  isChecked = false,
  onClick = () => {}
}: DiscountItemProps) => {
  const { id, name, src, dateFrom, dateTo } = discount;
  return (
    <Food onClick={() => onClick(id)} compact={compact}>
      <DiscountImage size={size} borderRadius={borderRadius}>
        {src && <img src={src} alt={name}></img>}
      </DiscountImage>
      <DiscountDetails margin={margin} compact={compact}>
        <h1>{name}</h1>
        <DiscountDetailIcon>
          <IcnClock />
          <h2>
            {dayjs(dateFrom).format('MMM D')} - {dayjs(dateTo).format('MMM D')}
          </h2>
        </DiscountDetailIcon>
        <span>{dayjs(dateTo).toNow()}</span>
      </DiscountDetails>
      <DiscountSelection>
        <IonCheckbox
          slot="end"
          color="primary"
          mode="ios"
          checked={isChecked}
        />
      </DiscountSelection>
    </Food>
  );
};

export default DiscountItem;
