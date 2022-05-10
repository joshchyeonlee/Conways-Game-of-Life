import React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { CardActionArea, Typography } from "@mui/material";

const rows = 10;
const cols = 10;

function App() {
  const [grid, setGrid] = useState(() => {
    const gridArray = Array.from({ length: rows }, () =>
      Array.from( { length: cols}, () => false)
    );
    return gridArray;
  });

  const handleChange = (row, col, event) => {
    let copy = [...grid];
    copy[row][col] = !grid[row][col];
    setGrid(copy);
  }

  return (
    <Grid container columns={10}
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
                onClick = {(e) => { handleChange(i, j, e)}}
              >
              </CardActionArea>  
            </Card>
          </Grid> 
        ))}
    </Grid>
  );
}

export default App;
