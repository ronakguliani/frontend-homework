const backgroundColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
  'rgba(78, 52, 199, 0.8)',
];

const borderColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(159, 159, 159, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(40, 159, 64, 1)',
  'rgba(210, 199, 199, 1)',
  'rgba(78, 52, 199, 1)',
];

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

// Create a map for quick lookups for fixing names
const nameFixMap = {
  Targaryn: 'Targaryen',
  Targaryan: 'Targaryen',
  Lanister: 'Lannister',
  Ukown: 'Unknown House',
  Unkown: 'Unknown House',
  Unknown: 'Unknown House',
};

// Fix typos in character family names
// Source: https://stackoverflow.com/questions/64506764/javascript-replace-using-key-mappings-and-regex and copilot
const fixNames = (data) => {
  return data.map((character) => {
    Object.keys(nameFixMap).forEach((key) => {
      character.family = character.family.replace(
        new RegExp(key, 'g'),
        nameFixMap[key]
      );
    });
    // Special case for Lorath with word boundaries
    character.family = character.family.replace(
      /\bLorath\b/g,
      'Lorathi'
    );
    return character;
  });
};

// Count the number of characters in each house
const countCharactersByHouse = (data) => {
  const houseCountMap = {};

  data.forEach((character) => {
    const house = character.family.replace('House ', '');

    if (house && house !== 'Unknown' && house !== 'None') {
      houseCountMap[house] = (houseCountMap[house] || 0) + 1;
    }
  });

  return houseCountMap;
};

const renderChart = (houseData) => {
  const donutChart = document.querySelector('.donut-chart');
  const houses = Object.keys(houseData);
  const houseCounts = Object.values(houseData);

  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: houses,
      datasets: [
        {
          label: 'Game of Throne Houses',
          data: houseCounts,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
    options: {
      layout: {
        padding: { top: 30, bottom: 20 },
      },
      legend: { position: 'bottom' },
    },
  });
};

const createChart = async () => {
  try {
    const response = await fetch(url);
    let data = await response.json();
    data = fixNames(data);
    const houseData = countCharactersByHouse(data);
    renderChart(houseData);
  } catch (error) {
    console.error(error);
  }
};

createChart();
