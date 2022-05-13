import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { CardActionArea } from "@mui/material";

const rows = 10;
const cols = 10;

function App() {
  const [grid, setGrid] = useState(() => {
    const gridArray = Array.from({ length: rows }, () =>
      Array.from( { length: cols}, () => false)
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
  })

  const handleRunningChange = (isRunning) => {
    setRunning(isRunning);
  }

  const selectTile = (row, col) => {
    let newGrid = [...grid];
    newGrid[row][col] = !grid[row][col];
    setGrid(newGrid);
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
          handleRunningChange(!running);
        }}
      >
      {running ? 'Pause' : 'Start'}
      </Button>
      <Button
        onClick={() => { clearGrid() }}
      >
        Clear
      </Button>
      <Button
        onClick={() => { getRandomGrid() }}
      >
        Random
      </Button>
    </div>
  );
}

export default App;
