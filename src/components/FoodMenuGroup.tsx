import styled from '@emotion/styled/macro';
import React from 'react';

const StyledFoodMenuGroup = styled.div<{ cols: number }>`
  background: #f5f5f561;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  padding: 15px 30px;
  margin-bottom: 10px;

  .items {
    display: grid;
    grid-row-gap: 20px;
    grid-template-columns: ${(props) => `repeat(${props.cols},1fr)`};
  }

  & > h1 {
    font-size: 24px;
    font-family: 'AvenirLTStd';
  }
`;

interface FoodMenuGroupProps {
  title: string;
  cols?: number;
  children: React.ReactNode;
}

const FoodMenuGroup = ({ children, title, cols = 1 }: FoodMenuGroupProps) => {
  return (
    <StyledFoodMenuGroup cols={cols}>
      <h1>{title}</h1>
      <div className="items">{children}</div>
    </StyledFoodMenuGroup>
  );
};

export default FoodMenuGroup;
