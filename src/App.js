import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { CardActionArea } from "@mui/material";

const rows = 10;
const cols = 10;

function App() {
  const [grid, setGrid] = useState(() => {
    const gridArray = Array.from({ length: rows }, () =>
      Array.from( { length: cols }, () => false)
    );
    return gridArray;
  });

  const [running, setRunning] = useState(() => {
    const isRunning = false;
    return isRunning;
  });

  const [neighbours, setNeighbours] = useState(() => {
    const neighboursArray = Array.from({ length: rows }, () =>
      Array.from( { length: cols}, () => false)
    );
    return neighboursArray;
  });

  const selectTile = (row, col) => {
    let newGrid = [...grid];
    newGrid[row][col] = !grid[row][col];
    setGrid(newGrid);
  }

  const getNeighbours = () => {
    let newNeighbours = [...neighbours];
    for (let col = 0; col < grid.length; col++) {
      for (let row = 0; row < grid[col].length; row++) {
        let upperBound = (row > 0) ? row - 1 : row;
        let lowerBound = (row < grid[col].length - 1) ? row + 1 : row;
        let leftBound = (col > 0) ? col - 1 : col;
        let rightBound = (col < grid.length - 1) ? col + 1 : col;
        let neighbourCount = 0;

        for(let j = leftBound; j <= rightBound; j++){
          for(let i = upperBound; i <= lowerBound; i++){
            if((i === row) && (j === col)) continue;
            if(grid[i][j]) neighbourCount++;
          }
        }
        newNeighbours[row][col] = neighbourCount;
      }
    }
    setNeighbours(newNeighbours);
  }

  const getNextGeneration = () => {
    const nextGeneration = [...grid];
    
    for(let col in nextGeneration){
      for(let row in nextGeneration[col]){
        if(grid[col][row] === true){
          if(neighbours[col][row] < 2) nextGeneration[col][row] = false;
          if(neighbours[col][row] > 3) nextGeneration[col][row] = false;
          if((neighbours[col][row] === 2) || (neighbours[col][row] === 3)) nextGeneration[col][row] = true;
        }
        else{
          if(neighbours[col][row] === 3) nextGeneration[col][row] = true;
        }
      }
    }
    setGrid(nextGeneration);
  }

  const runningRef = useRef(running);
  runningRef.current = running;

  const handleRunningChange = () => {
    setRunning(!running);
  }

  const runSimulation = () => {
    if(!runningRef.current) return
    getNeighbours();
    getNextGeneration();
    setTimeout(runSimulation, 100)
  }

  const clearGrid = () => {
    const newGrid = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => false)
    );
    setGrid(newGrid);
  }

  const getRandomGrid = () => {
    let newGrid = [...grid];
    for(let row in newGrid) {
      for(let col in newGrid[row]) {
        newGrid[row][col] = Math.random() > 0.8 ? true : false;
      }
    }
    setGrid(newGrid);
  }

  return (
    <div>
      <Grid container columns={cols}
        sx={{
          width: 500,
          height: 500,
        }}
      >
        {grid.map((rows, i) => 
          grid.map((cols, j) =>
            <Grid item xs={1}>
              <Card>
                <CardActionArea
                  sx={{
                    bgcolor: grid[i][j] ? '#373737' : '#474747',
                    width: 50,
                    height: 50,
                    border: 1,
                  }}
                  onClick = {() => { selectTile(i, j) }}
                >
                </CardActionArea>  
              </Card>
            </Grid> 
          ))}
      </Grid>
      <Button
        onClick={() => {
          handleRunningChange();
          if(!running){
            runningRef.current = true;
            runSimulation();
          }
        }}
      >
      {running ? 'Pause' : 'Start'}
      </Button>
      <Button      
        onClick={() => {
          getNeighbours();
          getNextGeneration();
        }}>
        Show Next
      </Button>
      <Button
        onClick={() => { getRandomGrid() }}
      >
        Random
      </Button>
      <Button
        onClick={() => { clearGrid() }}
      >
        Clear
      </Button>
    </div>
  );
}

export default App;
