import styled from '@emotion/styled/macro';
import { Input as AntInput } from 'antd';
import { IcnProfile } from './Icon/Icon';

const Input = styled(AntInput)`
  &.ant-input-affix-wrapper {
    border-radius: 20px;
    border: 0;
    background: var(--ion-color-light);
    padding: 4px 20px;
    height: 50px;
    max-width: calc(100% - 60px);
    align-self: center;
    flex-grow: 1;
    margin: 0 auto;
  }
  &.ant-input-affix-wrapper-focused {
    border: 0;
    box-shadow: none;
  }
  .ant-input {
    font-size: 16px;
    font-family: 'AvenirLTStd-Medium';
    background: var(--ion-color-light);
  }
  .ant-input-prefix {
    margin-right: 10px;
  }
`;

const StyledIconProfile = styled(IcnProfile)`
  font-size: 12px;
`;

const Search = () => {
  return (
    <Input prefix={<StyledIconProfile />} placeholder="Username" allowClear />
  );
};

export default Search;
