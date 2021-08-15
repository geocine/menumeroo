import styled from '@emotion/styled/macro';
import { StarRating } from '.';
import { Store as StoreType } from '../store/types';
import { IcnClock, IcnLocation } from './Icon/Icon';

const StoreDetailIcon = styled.div`
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

const Store = styled.div`
  display: flex;
  margin: 10px 30px;
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
  .star-rating {
    margin-top: 5px;
  }
`;

interface StoreCardProps {
  store: StoreType;
  size?: number;
  margin?: number;
  borderRadius?: number;
  onClick?: (id: number) => void;
}

const StoreCard = ({
  store,
  size = 100,
  margin = 20,
  borderRadius = 20,
  onClick = () => {}
}: StoreCardProps) => {
  const { src, name, location, time, distance, id, rating } = store;
  return (
    <Store onClick={() => onClick(id)}>
      <StoreImage size={size} borderRadius={borderRadius}>
        <img src={src} alt={name}></img>
      </StoreImage>
      <StoreDetails margin={margin}>
        <h1>{name}</h1>
        <StoreDetailIcon>
          <IcnLocation />
          <h2>{location}</h2>
        </StoreDetailIcon>
        <StoreDetailIcon>
          <IcnClock />
          <h2>
            {time} - {distance}
          </h2>
        </StoreDetailIcon>
        <StarRating className="star-rating" defaultValue={rating} disabled />
      </StoreDetails>
    </Store>
  );
};

export default StoreCard;
