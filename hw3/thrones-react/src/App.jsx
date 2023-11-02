import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Alert, Nav, Navbar, Row, Col, Image } from 'react-bootstrap';
import './App.css';

import Home from './Home';
import Search from './Search';
import Houses from './Houses';

const url = 'https://thronesapi.com/api/v2/Characters';

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        setCharacters(await response.json());
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage('Failed to load character data.');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Game of Thrones </Navbar.Brand>
        <Nav className="mr-auto">
          <LinkContainer to="/home">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/search">
            <Nav.Link>Search</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/houses">
            <Nav.Link>Houses</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>

      <main className="container p-3 d-flex flex-column justify-content-center">
        <Alert
          variant="danger"
          className="mx-auto"
          show={errorMessage !== null}
        >
          {errorMessage}
        </Alert>
        <Routes>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/search"
            element={<Search characters={characters} />}
          />
          <Route
            path="/houses"
            element={<Houses characters={characters} />}
          />
        </Routes>
      </main>

      <footer className="avatar-footer">
        <Row className="justify-content-center">
          {characters.slice(0, 5).map((character) => (
            <Col xs={2} key={character.id}>
              <Image
                src={character.imageUrl}
                roundedCircle
                width={70}
                alt={`Avatar of ${character.fullName}`}
              />
            </Col>
          ))}
        </Row>
      </footer>
    </>
  );
};

export default App;
