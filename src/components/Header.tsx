import styled from '@emotion/styled/macro';
import { IonHeader } from '@ionic/react';
import { IcnBack, IcnClose } from './Icon/Icon';
import { useHistory } from 'react-router';

const StyledIonHeader = styled(IonHeader)`
  display: flex;
  flex-direction: column;
  background: #fffc;

  &::after {
    background: transparent;
  }

  .header {
    display: flex;
    padding: 10px 0px;
    width: calc(100% - 60px);
    align-self: center;
  }

  &.back .button {
    width: 12px;
    height: 22px;
    padding: 20px 35px 20px 0;
  }

  &.close .button {
    width: 16px;
    height: 16px;
    padding: 20px 35px 20px 0;
  }

  .button {
    overflow: visible;
    align-self: center;
    box-sizing: content-box;
    color: var(--ion-color-secondary);
    cursor: pointer;
  }

  h1 {
    font-family: 'AvenirLTStd';
    font-size: 24px;
    align-self: center;
    margin-bottom: 0;
    margin-top: 6px;
    font-weight: 800;
    color: var(--ion-color-secondary);
  }
`;
type ButtonType = 'back' | 'close';

interface HeaderProps {
  title?: string;
  showButton?: boolean;
  type?: ButtonType;
}

const Header = ({
  title,
  showButton = true,
  type = 'back',
  children,
  style
}: HeaderProps &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) => {
  const history = useHistory();

  const getButton = (type: ButtonType) => {
    switch (type) {
      case 'back':
        return <IcnBack className="button" onClick={history.goBack} />;
      case 'close':
        return <IcnClose className="button" onClick={history.goBack} />;
    }
    return null;
  };

  return (
    <StyledIonHeader className={type} style={style}>
      <div className="header">
        {showButton && getButton(type)}
        <h1>{title}</h1>
        {children}
      </div>
    </StyledIonHeader>
  );
};

export default Header;
