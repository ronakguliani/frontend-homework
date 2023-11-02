import React from 'react';
import { Container } from 'react-bootstrap';

const Home = () => (
  <Container
    style={{
      padding: '3rem',
      backgroundColor: '#f7f7f9',
      borderRadius: '0.3rem',
    }}
  >
    <h1>Welcome to my Game of Thrones App!</h1>
    <p>
      Explore the world of Thrones. Get information about characters,
      houses and more!
    </p>
  </Container>
);

export default Home;
