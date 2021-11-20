import { IonItem, IonLabel, IonCheckbox, IonList } from '@ionic/react';
import styled from '@emotion/styled/macro';
import React from 'react';
import { Food } from '../store/types';
import { vstore } from '../store/store';

const VariationList = styled(IonList)`
  padding: 0;
  background: #f5f5f561;
`;
const VariationItem = styled(IonItem)`
  --padding-start: 0;
  --inner-padding-end: 0;
  --ripple-color: transparent;
  border-bottom: 1px solid #efefef;
  &:last-of-type {
    border-bottom: 0;
  }
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
  &.item-checkbox-checked ion-label {
    font-weight: bold;
  }
`;

const FoodVariations = ({
  variations,
  choiceType = 'single'
}: {
  variations: Food[];
  choiceType?: string;
}) => {
  return (
    <VariationList lines="none">
      {variations.map((variation) => (
        <VariationItem key={variation.id}>
          {}
          <IonCheckbox
            slot="start"
            value={variation.id.toString()}
            onClick={() => {
              vstore.currentFood.setSelectedVariation(variation.id);
            }}
            checked={variation.chosen}
          />
          <IonLabel>{variation.name}</IonLabel>
          <span slot="end" className="price">
            {variation.price?.toFixed(2)}
          </span>
        </VariationItem>
      ))}
    </VariationList>
  );
};

export default FoodVariations;
