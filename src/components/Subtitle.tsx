import styled from '@emotion/styled/macro';

const Container = styled.div`
  p {
    font-family: 'AvenirLTStd';
    font-size: 14px;
    color: #8A94A3;
    width: calc(100% - 60px);
    margin: 0px auto 30px auto;
  }
`;

const Subtitle = ({ text }: { text: string }) => (
  <Container>
    <p>{text}</p>
  </Container>
);

export default Subtitle;
