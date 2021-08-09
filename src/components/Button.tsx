import styled from '@emotion/styled/macro';
import { Button as AntButton } from 'antd';

const StyledButton = styled(AntButton)`
  border-radius: 20px;
  box-shadow: none;
  height: 50px;
  font-family: 'AvenirLTStd-Medium';
  font-size: 16px;
  width: calc(100% - 60px);
  margin: 15px auto;
  display: block;
  text-transform: capitalize;

  &.ant-btn-secondary {
    border: none;
    background: var(--ion-color-light);
    color: var(--ion-color-secondary);
  }

  &.ant-btn-primary {
    background: var(--ion-color-primary);
    border: none;
    color: #ffffff;
    &:hover,
    &:focus,
    &:active {
      background-color: var(--ion-color-primary);
      color: #fff;
      border: none;
    }
    &[disabled],
    &[disabled]:hover,
    &[disabled]:focus,
    &[disabled]:active {
      opacity: 0.8;
      background-color: var(--ion-color-primary);
      color: #fff;
      border: none;
    }
  }
`;

interface ButtonProps {
  [x: string]: any;
  children: React.ReactNode;
}

const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return <StyledButton {...{ ...rest }}>{props.children}</StyledButton>;
};

export default Button;
