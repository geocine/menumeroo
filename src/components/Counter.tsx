import styled from '@emotion/styled/macro';
import { useState } from 'react';
import { GoDash, GoPlus } from 'react-icons/go';

const CounterButton = styled.button<{ count: number }>`
  background: transparent;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 5px;
  min-width: 40px;
  color: var(--ion-color-primary);
  display: flex;
  justify-content: center;
  align-items: center;

  &.dec {
    color: ${(prop) =>
      prop.count > 1 ? 'var(--ion-color-primary)' : 'var(--ion-color-medium)'};
  }
`;

const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  align-items: center;
`;

const CounterNumber = styled.span`
  font-size: 16px;
  font-family: 'AvenirLTStd-Heavy';
  min-width: 40px;
  text-align: center;
`;

interface CounterProps {
  onChange?: (count: number) => void;
}

const Counter = ({ onChange }: CounterProps) => {
  const [counter, setCounter] = useState<number>(1);

  const count = (isAdd: boolean = true) => {
    let newCount = counter + 1 * (isAdd ? 1 : -1);
    if (newCount < 1) {
      newCount = 1;
    }
    setCounter(newCount);
    onChange?.(newCount);
  };

  return (
    <CounterContainer>
      <CounterButton
        onClick={() => count(false)}
        className="dec"
        count={counter}
      >
        <GoDash size={20} />
      </CounterButton>
      <CounterNumber>{counter}</CounterNumber>
      <CounterButton onClick={() => count()} className="inc" count={counter}>
        <GoPlus size={20} />
      </CounterButton>
    </CounterContainer>
  );
};

export default Counter;
