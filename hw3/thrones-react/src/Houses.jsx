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

const Houses = () => {
  const [houseData, setHouseData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        let data = await response.json();
        data = fixNames(data);
        const houseCounts = countCharactersByHouse(data);
        setHouseData(houseCounts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (houseData) {
      // Check if houseData exists before setting chartData. This is necessary
      // because useEffect is called on the initial render before houseData is
      setChartData({
        labels: Object.keys(houseData),
        datasets: [
          {
            label: 'Game of Thrones Houses',
            data: Object.values(houseData),
            backgroundColor: backgroundColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      });
    }
  }, [houseData]);

  return (
    <div className="donut-chart">
      {chartData && <Doughnut data={chartData} />}{' '}
    </div>
  );
};

export default Houses;
