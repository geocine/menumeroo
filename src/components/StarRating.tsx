import { Rate } from 'antd';
import styled from '@emotion/styled/macro';

const StarRating = styled(Rate)`
  font-size: 14px;
  color: var(--ion-color-primary);
  .ant-rate-star-zero svg {
    color: var(--ion-color-medium);
  }
  .ant-rate-star-full svg {
    color: var(--ion-color-primary);
  }
`;

export default StarRating;
