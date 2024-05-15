import { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import LinearProgress from '@mui/material/LinearProgress';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const [porady, nastavPorady] = useState([]);
    const [vybranyPorad, nastavVybranyPorad] = useState("");
    const [otazkaZodpovezena, nastavOtazkaZodpovezena] = useState(false);
    const [spravnaOdpoved, nastavSpravnaOdpoved] = useState(false);

    useEffect(() => {
        axios.get('https://api.sampleapis.com/cartoons/cartoons2D')
            .then(odpoved => {
                nastavPorady(odpoved.data);
            });
    }, []);

    const zkontrolujOdpoved = (odpoved) => {
        const jeSpravna = (odpoved === "Ano"); 
        nastavSpravnaOdpoved(jeSpravna);
        nastavOtazkaZodpovezena(true);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ p: 3 }}>
                <Typography variant="h3" marginLeft={90} fontWeight={100}>VÝBĚR POŘADU</Typography> <br />
                <LinearProgress color="secondary" /> <br></br>
                {vybranyPorad !== "" && (
                    <>
                        <Typography variant="h6">Vybraný pořad je: {vybranyPorad}</Typography> <br />
                        <Typography variant="h6">Líbí se vám tento pořad?</Typography>
                        <Button variant="contained" color="primary" onClick={() => zkontrolujOdpoved("Ano")} style={{ marginRight: 10 }}>Ano</Button>
                        <Button variant="contained" color="secondary" onClick={() => zkontrolujOdpoved("Ne")}>Ne</Button>
                        <br /><br />
                        {otazkaZodpovezena && (
                            <Alert variant="filled" severity={spravnaOdpoved ? "success" : "error"}>
                                {spravnaOdpoved ? "Správně!" : "Špatně!"}
                            </Alert>
                        )}
                        <LinearProgress color="secondary" /> <br></br>
                    </>
                )}
                <Grid container spacing={2}>
                    {porady.map(porad => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={porad.id} style={{ listStyle: "none" }}>
                            <Paper elevation={4} onClick={() => {
                                nastavVybranyPorad(porad.title);
                                nastavOtazkaZodpovezena(false); 
                            }} style={{ textAlign: "center", cursor: "pointer", padding: 10 }}>
                                <img src={porad.image} alt={porad.title} style={{ width: "100px" }} /> <br />
                                <Typography variant="overline">{porad.title}</Typography> <br />
                                <Typography variant="overline">{porad.year}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default App;