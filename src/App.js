import { useState, useEffect } from 'react';

const width = 8;
const candyColors = ['blue', 'green', 'orange', 'purple', 'red', 'yellow'];

const App = () => {


  const [currentColorArrangement, setCurrentColorArrangment] = useState([]);


  const checkForColumnOfThree = () => {

    // Index 47 is last place on board where you can get a column of three below
    for (let i = 0; i < 47; i++) {

      // Checks the current square and then the two squares below e.g index 1, 8 + 16 and so on
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArrangement[i];

      // Checks if every square in columnOfThree matches
      if (columnOfThree.every(square => currentColorArrangement[square] === decidedColor)) {

        columnOfThree.forEach(square => currentColorArrangement[square] = '');
      }
    }
  }

  const checkForColumnOfFour = () => {

    // Index 39 is last place on board where you can get a column of Four below
    for (let i = 0; i < 39; i++) {

      // Checks the current square and then the two squares below e.g index 1, 8 + 16 and so on
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArrangement[i];

      // Checks if every square in columnOfFour matches
      if (columnOfFour.every(square => currentColorArrangement[square] === decidedColor)) {

        columnOfFour.forEach(square => currentColorArrangement[square] = '');
      }
    }
  }

  const checkForRowOfThree = () => {

    // Index 47 is last place on board where you can get a row of three below
    for (let i = 0; i < 64; i++) {

      // Checks the current square and then the two squares below e.g index 1, 8 + 16 and so on
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArrangement[i];
      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64];

      if (notValid.includes(i)) continue

      // Checks if every square in rowOfThree matches
      if (rowOfThree.every(square => currentColorArrangement[square] === decidedColor)) {

        rowOfThree.forEach(square => currentColorArrangement[square] = '');
      }
    }
  }

  const checkForRowOfFour = () => {

    // Index 47 is last place on board where you can get a row of Four below
    for (let i = 0; i < 64; i++) {

      // Checks the current square and then the two squares below e.g index 1, 8 + 16 and so on
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArrangement[i];
      const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64];

      if (notValid.includes(i)) continue

      // Checks if every square in rowOfFour matches
      if (rowOfFour.every(square => currentColorArrangement[square] === decidedColor)) {

        rowOfFour.forEach(square => currentColorArrangement[square] = '');
      }
    }
  }

  const createBoard = () => {

    const randomColorArrangement = [];

    for (let i = 0; i < width * width; i++) {


      const randomColor = candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArrangement.push(randomColor);
    }

    setCurrentColorArrangment(randomColorArrangement);
  };

  // On page load, generate the board with random colours
  useEffect(() => {
    createBoard();
  }, []);

  // Schedules a check for three every 100ms from when the react app loads
  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      setCurrentColorArrangment([...currentColorArrangement]);
    }, 100)
    return () => clearInterval(timer)
  }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, currentColorArrangement]);

  console.log(currentColorArrangement);

  return (
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index) => (
          <img
            key={index}
            style={{ backgroundColor: candyColor }}
            alt={candyColor}
          />
        ))}
      </div>

    </div>
  );
};

export default App;
