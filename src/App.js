import { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

function App() {
    
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      
    </ThemeProvider>

    const [porady, nastavPorady] = useState([])
    const [vybranyPorad, nastavVybranyPorad] = useState("")


    useEffect(() => {
        axios.get('https://api.sampleapis.com/cartoons/cartoons2D')
            .then(odpoved => {
                nastavPorady(odpoved.data)
            }

            )

    }, [])

    return (
        <>  
        <Typography variant="h3" marginLeft={90}>VÝBĚR POŘADU</Typography> <br></br>
           {vybranyPorad != "" && <Typography variant="h6">Vybraný pořad je: {vybranyPorad}</Typography>} <br></br>
            <Grid container spacing={2}>
                {porady.map(porad => (
                    <>




                        <Grid item xs={1} key={porad.id} style={{ listStyle: "none" }}>
                            <Paper elevation={4} onClick={() => nastavVybranyPorad(porad.title)} style={{textAlign: "center"}}>
                                <img src={porad.image} style={{ width: "100px" }} ></img> <br></br>
                                <Typography variant="overline">{porad.title}</Typography> <br></br>
                                <Typography variant="overline">{porad.year}</Typography>
                                </Paper>
                        </Grid>


                    </>
                ))}
            </Grid>
        </>
    );
}

export default App;