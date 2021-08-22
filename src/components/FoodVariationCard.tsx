import styled from '@emotion/styled/macro';
import React from 'react';

const StyledFoodVariationCard = styled.div`
  background: #f5f5f561;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 15px 30px;
  margin-bottom: 10px;

  .items {
    font-family: 'AvenirLTStd';
  }

  & > h1 {
    font-size: 16px;
    font-family: 'AvenirLTStd';
    display: inline;
  }
  & > h3 {
    display: inline;
    font-size: 12px;
    font-family: 'AvenirLTStd';
    color: var(--ion-color-medium);
    margin-left: 5px;
  }
`;

interface FoodVariationCardProps {
  title: string;
  children: React.ReactNode;
  sideNote?: string;
}

const FoodVariationCard = ({
  children,
  title,
  sideNote
}: FoodVariationCardProps) => {
  return (
    <StyledFoodVariationCard>
      <h1>{title}</h1>
      {sideNote && <h3>{sideNote}</h3>}
      <div className="items">{children}</div>
    </StyledFoodVariationCard>
  );
};

export default FoodVariationCard;
