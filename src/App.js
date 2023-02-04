import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from '@mui/material/Button';
import { playGrid } from './tone.functions';
import { scaleArray } from "./tone.functions";
import { CardActionArea, Typography, CardContent, Snackbar, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Rows = 10;
const Cols = 10;
let activeCells = 0;
const MaxPolyphony = 25

function App() {
  const [grid, setGrid] = useState(() => {
    const gridArray = Array.from({ length: Rows }, () =>
      Array.from( { length: Cols }, () => false));
    
    return gridArray;
  });

  const [running, setRunning] = useState(() => {
    const isRunning = false;
    
    return isRunning;
  });

  const [empty, setEmpty] = useState(() => {
    const isEmpty = true;
    
    return isEmpty;
  })

  const [neighbours, setNeighbours] = useState(() => {
    const neighboursArray = Array.from({ length: Rows }, () =>
      Array.from( { length: Cols}, () => false));
    
    return neighboursArray;
  });

  const [scale, setScale] = useState(() => {
    const scale = scaleArray[0].notes;
    
    return scale;
  })

  const selectTile = (row, col) => {
    let newGrid = [...grid];
    newGrid[row][col] = !grid[row][col];
    setGrid(newGrid);
    countActive();
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

  const countActive = () => {
    const currentGrid = [...grid];
    activeCells = 0;

    for(let col in currentGrid) {
      for(let row in currentGrid[col]){
        if(grid[col][row]) activeCells++;
      }
    }

    handleEmptyChange();
  }

  const runningRef = useRef(running);
  runningRef.current = running;

  const handleRunningChange = () => {
    setRunning(!running);
    countActive();
  }

  const emptyRef = useRef(empty);
  emptyRef.current = empty;
  
  const handleEmptyChange = () => {
    setEmpty(activeCells === 0);
  }

  const scaleRef = useRef(scale);
  scaleRef.current = scale;

  const handleScaleChange = (e) => {
    setScale(e.target.value);
  }

  const runSimulation = () => {
    
    if(!runningRef.current) return;
    
    getNeighbours();
    getNextGeneration();
    countActive();

    if(activeCells < MaxPolyphony) playGrid(grid, scaleRef.current);
    setTimeout(runSimulation, 1000);
  }

  const clearGrid = () => {
    const newGrid = Array.from({ length: Rows }, () => 
      Array.from({ length: Cols }, () => false));

    setGrid(newGrid);
    activeCells = 0;
    setRunning(false);
    setEmpty(true);
  }

  const getRandomGrid = () => {
    let newGrid = [...grid];
    
    for(let row in newGrid) {
      for(let col in newGrid[row]) {
        newGrid[row][col] = Math.random() > 0.85 ? true : false;
      }
    }

    setGrid(newGrid);
    setEmpty(false);
  }

  return (
    <div>
      <Grid container columns={2} spacing={2} padding>
        <Grid item>
          <Grid container columns={Cols} sx={{ width: 500, height: 500,}}>
            {grid.map((Rows, i) => 
              grid.map((Cols, j) =>
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
        </Grid>
        <Grid item width={350}>
          <Card>
            <CardContent sx={{ bgcolor: `#373737`, border: 1,}} elevation={24}>
              <Grid container columns={1}>
                <Grid item padding height={190}>
                  <Typography variant="h5" color='#E4E4E4'>STATS</Typography>
                  <Typography variant="h6" color='#E4E4E4'>Number of Rows: {Rows}</Typography>
                  <Typography variant="h6" color='#E4E4E4'>Number of Columns: {Cols}</Typography>
                  <Typography variant="h6" color='#E4E4E4'>Active cells: {activeCells}</Typography>
                  <Typography variant="h6" color='#E4E4E4'>Dead cells: {(Rows * Cols) - activeCells}</Typography>
                </Grid>
                <Grid item>
                  <FormControl fullWidth sx={{color: "#E4E4E4"}}>
                  <InputLabel sx={{color: "#E4E4E4"}}>Select Scale</InputLabel>
                  <Select
                    label="Select Scale"
                    variant="filled"
                    onChange={handleScaleChange}
                    value={scale}
                    sx={{color: "#FFFFFF"}}
                  >
                    {scaleArray.map(scaleElem => (
                      <MenuItem value={scaleElem.notes} key={scaleElem.name}>{scaleElem.name}</MenuItem>))}
                  </Select>
                </FormControl>
                <Typography size="16px" color='#E4E4E4' padding>
                  Disclaimer: Simulation works best using the Chromatic Scale. Too many octaves generated using other scales may cause discomfort.
                </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Button
            onClick={() => {
              handleRunningChange();
              if(!running){
                runningRef.current = true;
                playGrid(grid, scaleRef.current);
                runSimulation();
              }
            }}
            disabled={emptyRef.current}
          >
          {running ? 'Pause' : 'Start'}
          </Button>            
          <Snackbar
            open={activeCells >= MaxPolyphony}
            autoHideDuration={4000}
            message="Exceeded maximum polyphony, skipping audio for generation"
          >
          </Snackbar>
          <Button      
            onClick={() => {
              getNeighbours();
              getNextGeneration();
              countActive();
            }}
            
            disabled={runningRef.current || emptyRef.current}
            >
            Show Next
          </Button>
          <Button
            onClick={() => {
              getRandomGrid();
              countActive();
            }}
            disabled={runningRef.current}
          >
            Random
          </Button>
          <Button onClick={() => {clearGrid();}}>Clear</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
