// URL for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

const characterContainer = document.querySelector('#characters');

// Fetch data from Thrones API
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch data from Thrones API');
    }
    return response.json();
  })
  .then((characters) => {
    const characterElements = characters.map((character) => {
      const section = document.createElement('section');
      section.className =
        'text-center character-wrapper m-2 d-inline-block ';
      const img = document.createElement('img');
      img.classList.add('mb-2');
      img.src = character.imageUrl;
      img.alt = character.fullName;
      img.width = 200;
      img.height = 220;

      const p = document.createElement('p');
      p.classList.add('fw-bold');
      p.textContent = character.title;

      const h2 = document.createElement('h2');
      h2.classList.add('fw-bold', 'fs-5');
      h2.textContent = character.fullName;

      section.appendChild(img);
      section.appendChild(h2);
      section.appendChild(p);

      return section;
    });

    characterContainer.replaceChildren(...characterElements);
  })
  .catch((error) => {
    console.error('Failed to fetch data from Thrones API', error);
  });
