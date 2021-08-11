import styled from '@emotion/styled/macro';
import { StarRating } from '.';
import { IcnLocation } from './Icon/Icon';

const Location = styled.div`
  display: flex;
  align-items: center;

  svg {
    overflow: visible;
    color: var(--ion-color-medium);
  }
  h2 {
    font-size: 14px;
    margin-bottom: 0;
    margin-top: 0;
    font-family: 'AvenirLTStd-Roman';
    margin-left: 12px;
    color: var(--ion-color-medium);
  }
`;

const Card = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 20px;
  background: var(--ion-color-light);
  flex-shrink: 0;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 20px;
  }
`;

const Store = styled.div`
  display: flex;
  margin: 10px 30px;
`;

const Details = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;

  h1 {
    font-family: 'AvenirLTStd';
    font-size: 16px;
    line-height: 21px;
    font-weight: 800;
  }
  .star-rating {
    margin-top: 5px;
  }
`;

interface StoreCardProps {
  location?: string;
  name: string;
  src: string;
}

const StoreCard = ({ location, name, src }: StoreCardProps) => {
  return (
    <Store>
      <Card>
        <img src={src} alt={name}></img>
      </Card>
      <Details>
        <h1>{name}</h1>
        <Location>
          <IcnLocation />
          <h2>{location}</h2>
        </Location>
        <StarRating className="star-rating" defaultValue={3} disabled />
      </Details>
    </Store>
  );
};

export default StoreCard;
