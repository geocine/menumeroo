import styled from '@emotion/styled/macro';
import { IcnLocation } from './Icon/Icon';

const Location = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  h2 {
    font-size: 14px;
    margin-bottom: 0;
    margin-top: 0;
    font-family: 'AvenirLTStd-Medium';
    margin-left: 12px;
  }
`;

interface LocationTitleProps {
  location: string;
}

const LocationHeader = ({ location }: LocationTitleProps) => {
  return (
    <Location>
      <IcnLocation />
      <h2>{location}</h2>
    </Location>
  );
};

export default LocationHeader;
