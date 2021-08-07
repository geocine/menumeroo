import styled from '@emotion/styled';

const Container = styled.div`
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  strong {
    font-size: 20px;
    line-height: 26px;
  }

  p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }

  a {
    text-decoration: none;
  }
`;

const ExploreContainer = () => {
  return (
    <Container>
      <strong>Ready to create an app?</strong>
      <p>
        Start with Ionic{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://ionicframework.com/docs/components"
        >
          UI Components
        </a>
      </p>
    </Container>
  );
};

export default ExploreContainer;
