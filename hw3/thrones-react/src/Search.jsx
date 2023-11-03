import React, { useState } from 'react';
import {
  ListGroup,
  InputGroup,
  FormControl,
  Container,
} from 'react-bootstrap';

const Search = ({ characters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle the Enter key down event similar to HW 2 Count
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Filter the characters based on the search term
      const matchedCharacters = characters.filter((character) =>
        character.fullName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredCharacters(matchedCharacters);
    }
  };

  return (
    <Container
      style={{
        padding: '2rem',
        backgroundColor: '#f7f7f9',
        borderRadius: '0.3rem',
      }}
    >
      <h1>Search for Characters</h1>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Type query then press enter"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </InputGroup>

      <ListGroup>
        {filteredCharacters.length === 0 ? (
          <ListGroup.Item>No characters found</ListGroup.Item>
        ) : (
          filteredCharacters.map((character) => (
            <ListGroup.Item key={character.id}>
              <h2>{character.fullName}</h2>
              <img
                src={character.imageUrl}
                alt={character.fullName}
                width="100"
              />
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </Container>
  );
};

export default Search;
