import styled from '@emotion/styled/macro';

const Container = styled.div`
  h1 {
    font-family: 'AvenirLTStd';
    font-size: 30px;
    font-weight: 800;
    color: var(--ion-color-secondary);
    width: calc(100% - 60px);
    margin: 30px auto;
  }
`;

const Title = ({ text }: { text: string }) => (
  <Container>
    <h1>{text}</h1>
  </Container>
);

export default Title;
