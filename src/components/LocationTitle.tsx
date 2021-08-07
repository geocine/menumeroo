import styled from '@emotion/styled';
import { RiShoppingBasketFill } from 'react-icons/ri';

const Title = styled.div`
  height: 48px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  h1 {
    font-size: 16px;
    line-height: 1;
    margin-bottom: 2px;
    color: var(--ion-color-primary);
    margin-top: 0;
  }
  h2 {
    font-size: 12px;
    margin-bottom: 0;
    margin-top: 0;
  }
`;

const Location = styled.div`
  display: flex;
  height: 48px;
  flex-direction: row;

  svg {
    margin-left: auto;
    font-size: 20px;
    align-self: center;
    margin-right: 20px;
    color: var(--ion-color-primary);
  }
`;

interface LocationTitleProps {
  title: string;
  location: string;
}

const LocationTitle = ({ title, location }: LocationTitleProps) => {
  return (
    <Location>
      <Title>
        <h1>{title}</h1>
        <h2>{location}</h2>
      </Title>
      <RiShoppingBasketFill />
    </Location>
  );
};

export default LocationTitle;
