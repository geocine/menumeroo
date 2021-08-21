import styled from '@emotion/styled/macro';
import { Input as AntInput } from 'antd';

const Input = styled(AntInput)`
  &.ant-input {
    border-radius: 20px;
    border: 0;
    padding: 4px 20px;
    height: 50px;
    font-size: 16px;
    font-family: 'AvenirLTStd-Medium';
    background: var(--ion-color-light);
    margin: 0 auto;
    display: flex;
    max-width: calc(100% - 60px);

    &:focus {
      border: 0;
      box-shadow: none;
    }
  }
  &.ant-input-affix-wrapper {
    border-radius: 20px;
    border: 0;
    background: var(--ion-color-light);
    color: #bdbdbd;
    padding: 4px 20px;
    height: 50px;
    margin: 0 auto;
    display: flex;
    max-width: calc(100% - 60px);
  }
  &.ant-input-affix-wrapper-focused {
    border: 0;
    box-shadow: none;
  }
  .ant-input {
    font-size: 16px;
    font-family: 'AvenirLTStd-Medium';
    background: var(--ion-color-light);
    margin-top: 6px;
  }
  .ant-input-prefix {
    margin-right: 10px;
  }
`;

export default Input;
