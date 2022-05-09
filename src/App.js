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
    console.log(gridArray);
    return gridArray;
  });

  const card = (
    <Grid item xs={1}>
      <Card>
        <CardActionArea
          sx={{
            bgcolor: '#373737',
            width: 50,
            height: 50,
            border: 1,
          }}
        >
        </CardActionArea>  
      </Card>
    </Grid> 
  )

  return (
    <Grid container columns={10}
      sx={{
        width: 500,
        height: 500,
      }}
    >
      {grid.map((rows, i) => 
        grid.map((cols, j) =>
          card
        ))}
    </Grid>
  );
}

export default App;
