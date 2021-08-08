import Search from './Search';
import styled from '@emotion/styled/macro';
import { IonHeader } from '@ionic/react';
import { IcnBack, IcnFilter } from './Icon/Icon';
import LocationHeader from './LocationHeader';

const StyledIonHeader = styled(IonHeader)`
  display: flex;
  flex-direction: column;

  &::after {
    background: transparent;
  }
  .search-header {
    display: flex;
    padding: 10px;
  }

  .back-button {
    width: 13px;
    height: 22px;
    padding: 20px;
    align-self: center;
    box-sizing: content-box;
    color: var(--ion-color-secondary);
  }

  .filter-button {
    font-size: 22px;
    width: 29.8px;
    padding: 20px;
    align-self: center;
    box-sizing: content-box;
    color: var(--ion-color-secondary);
  }
`;

const SearchHeader = () => {
  return (
    <StyledIonHeader>
      <div className="search-header">
        <IcnBack className="back-button" />
        <Search />
        <IcnFilter className="filter-button" />
      </div>
      <div className="location-header">
        <LocationHeader location="San Juan" />
      </div>
    </StyledIonHeader>
  );
};

export default SearchHeader;
