import Search from './Search';
import styled from '@emotion/styled/macro';
import { IonHeader } from '@ionic/react';
import { IcnBack, IcnFilter } from './Icon/Icon';
import LocationHeader from './LocationHeader';
import { useHistory } from 'react-router';

const StyledIonHeader = styled(IonHeader)`
  display: flex;
  flex-direction: column;
  background: #fffc;

  &::after {
    background: transparent;
  }

  .search-header {
    display: flex;
    padding: 10px 0px;
    width: calc(100% - 60px);
    align-self: center;
  }

  .back-button {
    width: 12px;
    height: 22px;
    padding: 20px 20px 20px 0;
    overflow: visible;
    align-self: center;
    box-sizing: content-box;
    color: var(--ion-color-secondary);
    cursor: pointer;
  }

  .filter-button {
    font-size: 22px;
    overflow: visible;
    padding: 20px 0 20px 20px;
    align-self: center;
    box-sizing: content-box;
    color: var(--ion-color-secondary);
    cursor: pointer;
  }
`;

interface SearchHeaderProps {
  showLocation?: boolean;
  showBack?: boolean;
  showFilter?: boolean;
}

const SearchHeader = ({
  showLocation = true,
  showBack = true,
  showFilter = false
}: SearchHeaderProps) => {
  const history = useHistory();
  return (
    <StyledIonHeader>
      <div className="search-header">
        {showBack && (
          <IcnBack className="back-button" onClick={history.goBack} />
        )}
        <Search />
        {showFilter && <IcnFilter className="filter-button" />}
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
