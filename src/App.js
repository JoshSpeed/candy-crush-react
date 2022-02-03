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
      checkForColumnOfThree();
      setCurrentColorArrangment([...currentColorArrangement]);
    }, 100)
    return () => clearInterval(timer)
  }, [checkForColumnOfThree, currentColorArrangement]);

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
