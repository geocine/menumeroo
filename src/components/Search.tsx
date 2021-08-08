import styled from '@emotion/styled/macro';
import { Input as AntInput } from 'antd';
import { IcnSearch } from './Icon/Icon';

const Input = styled(AntInput)`
  &.ant-input-affix-wrapper {
    border-radius: 20px;
    border: 0;
    background: var(--ion-color-light);
    padding: 4px 20px;
    height: 56px;
    width: auto;
    align-self: center;
    flex-grow: 1;
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

const StyledIconSearch = styled(IcnSearch)`
  font-size: 16px;
`;

const Search = () => {
  return (
    <Input prefix={<StyledIconSearch />} placeholder="Search" allowClear />
  );
};

export default Search;
