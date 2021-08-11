import { Rate, RateProps } from 'antd';
import styled from '@emotion/styled/macro';

const RatingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  span.rating-value {
    font-size: 12px;
    margin-top: 4px;
    margin-bottom: -1px;
    font-family: 'AvenirLTStd-Heavy';
    margin-left: 10px;
    color: var(--ion-color-medium);
  }
`;

const Rating = styled(Rate)`
  font-size: 14px;
  color: var(--ion-color-primary);
  .ant-rate-star-zero svg {
    color: var(--ion-color-medium);
  }
  .ant-rate-star-full svg {
    color: var(--ion-color-primary);
  }
`;

const StarRating = (props: RateProps) => {
  const { defaultValue = 0, className, ...rest } = props;
  return (
    <RatingContainer className={className}>
      <Rating {...rest} defaultValue={defaultValue} />
      <span className="rating-value">{`(${defaultValue?.toFixed(1)})`}</span>
    </RatingContainer>
  );
};

export default StarRating;
