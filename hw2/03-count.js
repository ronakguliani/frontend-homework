const input = document.querySelector('input');
const textDiv = document.querySelector('main > div:last-child');

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    const searchTerm = input.value.trim().toLowerCase();
    const originalText = textDiv.textContent;

    // Mapping over the segments and highlighting the ones that match the search term
    // Used https://stackoverflow.com/questions/28127794/difference-between-split-s-and-split
    // and https://stackoverflow.com/questions/4328500
    const segments = originalText.split(/(\s+|[.,!?;—]+)/g);

    const modifiedSegments = segments.map((segment) => {
      const newSegment = segment
        .toLowerCase()
        .replace(/[.,!?;—]/g, '');
      if (newSegment === searchTerm) {
        return `<span style="background-color:yellow">${segment}</span>`;
      } else {
        return segment;
      }
    });

    // Join segments back together and update the DOM
    const modifiedText = modifiedSegments.join('');
    textDiv.innerHTML = modifiedText;
  }
}

input.addEventListener('keydown', handleKeyDown);
