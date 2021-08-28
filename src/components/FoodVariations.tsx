import { IonItem, IonLabel, IonCheckbox, IonList } from '@ionic/react';
import styled from '@emotion/styled/macro';
import React from 'react';
import { Food } from '../store/types';
import { CheckboxChangeEventDetail } from '@ionic/core';
import { vstore } from '../store/store';

const VariationList = styled(IonList)`
  padding: 0;
`;
const VariationItem = styled(IonItem)`
  /* font-family: 'AvenirLTStd'; */
  --padding-start: 0;
  --inner-padding-end: 0;
  border-bottom: 1px solid #efefef;
  ion-checkbox {
    --size: 14px;
    margin-right: 15px;
  }
  .price,
  ion-label {
    font-family: 'AvenirLTStd' !important;
    font-size: 14px !important;
    line-height: 16px;
  }
  ion-label {
    margin-top: 11px;
  }
`;

const FoodVariations = ({
  variations,
  choiceType = 'single',
  onChange = () => {}
}: {
  variations: Food[];
  choiceType?: string;
  onChange: () => void;
}) => {
  if (choiceType === 'multi') {
  }

  return (
    <VariationList lines="none">
      {variations.map((variation) => (
        // <StyledFoodVariationItem>
        <VariationItem key={variation.id}>
          <IonCheckbox
            slot="start"
            value={variation.id.toString()}
            onIonChange={(event: CustomEvent<CheckboxChangeEventDetail>) => {
              vstore.setSelectedVariation(variation.id, event.detail.checked);
              onChange();
            }}
          />
          <IonLabel>{variation.name}</IonLabel>
          <span slot="end" className="price">
            {variation.price?.toFixed(2)}
          </span>
        </VariationItem>
        // </StyledFoodVariationItem>
      ))}
    </VariationList>
  );
};

export default FoodVariations;
