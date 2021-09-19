import styled from '@emotion/styled/macro';
import { useEffect, useState } from 'react';
import { GoDash, GoPlus } from 'react-icons/go';

const CounterButton = styled.button<{ count: number; min?: number }>`
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
      prop.count > (prop.min || 0)
        ? 'var(--ion-color-primary)'
        : 'var(--ion-color-medium)'};
  }
`;

const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 15px;
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
  value: number;
  min: number;
}

const Counter = ({ onChange, value, min = 0 }: CounterProps) => {
  const [counter, setCounter] = useState<number>(value);

  useEffect(() => {
    setCounter(value);
  }, [value]);

  const count = (isAdd: boolean = true) => {
    let newCount = counter + 1 * (isAdd ? 1 : -1);
    if (newCount < min) {
      newCount = min;
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
        min={min}
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
