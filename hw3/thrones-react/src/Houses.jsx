import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

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

// Create a map for quick lookups for fixing names
const nameFixMap = {
  Targaryn: 'Targaryen',
  Targaryan: 'Targaryen',
  Lanister: 'Lannister',
  Ukown: 'Unknown House',
  Unkown: 'Unknown House',
};

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

const Houses = ({ characters }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (characters.length > 0) {
      const fixedCharacters = fixNames(characters);
      const houseCounts = countCharactersByHouse(fixedCharacters);
      setChartData({
        labels: Object.keys(houseCounts),
        datasets: [
          {
            label: 'Game of Thrones Houses',
            data: Object.values(houseCounts),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [characters]);

  return (
    <div className="donut-chart">
      {chartData && <Doughnut data={chartData} />}
    </div>
  );
};

export default Houses;
