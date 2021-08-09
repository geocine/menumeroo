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
    width: 12px;
    height: 22px;
    padding: 20px;
    overflow: visible;
    align-self: center;
    box-sizing: content-box;
    color: var(--ion-color-secondary);
  }

  .filter-button {
    font-size: 22px;
    overflow: visible;
    padding: 20px;
    align-self: center;
    box-sizing: content-box;
    color: var(--ion-color-secondary);
  }
`;

interface SearchHeaderProps {
  showLocation?: boolean;
}

const SearchHeader = ({ showLocation = true }: SearchHeaderProps) => {
  return (
    <StyledIonHeader>
      <div className="search-header">
        <IcnBack className="back-button" />
        <Search />
        <IcnFilter className="filter-button" />
      </div>
      {showLocation && (
        <div className="location-header">
          <LocationHeader location="San Juan" />
        </div>
      )}
    </StyledIonHeader>
  );
};

export default SearchHeader;
