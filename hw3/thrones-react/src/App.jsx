import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Alert, Nav, Navbar } from 'react-bootstrap';
import axios from 'axios';
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
        const response = await axios.get(url);
        setCharacters(response.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="navbar">
        <Navbar.Brand>Game of Thrones </Navbar.Brand>
        <Nav>
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

      <main className="container p-2 d-flex flex-column justify-content-center">
        {/* Source: https://stackoverflow.com/questions/72074631/error-functions-are-not-valid-as-a-react-child-this-may-happen-if-you-return */}
        {errorMessage && (
          <Alert variant="danger">{errorMessage}</Alert>
        )}

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

      <footer>
        <AvatarList characters={characters.slice(0, 5)} />
      </footer>
    </>
  );
};

const AvatarList = ({ characters }) => {
  return (
    <div className="avatar-footer">
      <div className="row justify-content-center p-5">
        {/* Map over characters to create avatars*/}
        {characters.map((character) => (
          <div className="col-auto" key={character.id}>
            <img
              src={character.imageUrl}
              className="rounded-circle"
              width={80}
              height={80}
              alt={`Avatar of ${character.fullName}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
