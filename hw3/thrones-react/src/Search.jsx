import React, { useState } from 'react';
import {
  ListGroup,
  InputGroup,
  FormControl,
  Container,
} from 'react-bootstrap';

const Search = ({ characters }) => {
  // Store the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle the input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter the characters based on the search term
  const filteredCharacters = characters.filter((character) =>
    character.fullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
          placeholder="Search for a character"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </InputGroup>

      <ListGroup>
        {filteredCharacters.length === 0 ? (
          <ListGroup.Item>No characters found</ListGroup.Item>
        ) : (
          // Display ALL matching characters
          // Used https://stackoverflow.com/questions/55153873/warning-each-child-in-a-list-should-have-a-unique-key-prop and
          // Copilot for help
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
