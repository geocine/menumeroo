import styled from '@emotion/styled/macro';

const Container = styled.div`
  font-size: 50px;
  display: flex;

  img {
    width: calc(100% - 60px);
    margin: 0 auto;
  }
`;

const WelcomeImage = ({ className }: { className: string }) => (
  <Container className={className}>
    <img src="/assets/images/foods/Rectangle.png" alt="foods" />
  </Container>
);

export default WelcomeImage;
