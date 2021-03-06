import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';

import Geolocalisation from '../../chantier/Geolocalisation';
import FormPiles from '../FormPiles';
import { dispatchNotification } from "../../utils/notification"

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '5px',
            paddingRight: '8px',
        },
    },
    paper: {
        padding: '20px',
        [theme.breakpoints.down('xs')]: {
            padding: '12px 15px'
        },
    },
    title: {
        marginBottom: '15px',
    },
    paperTypeBois: {
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 20px'
        },
    },
}));

function NewDevis() {
    const classes = useStyles();

    const [responsable, setResponsable] = React.useState("A");
    const [proprietaire, setProprietaire] = React.useState("");
    const [localisation, setLocalisation] = React.useState("");
    let today = moment().format("YYYY-MM-DD")
    const [date, setDate] = React.useState(today);
    const [pefc, setPefc] = React.useState(false);
    const [codePefc, setCodePefc] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telephone, setTelephone] = React.useState("");
    const [latitude, setLatitude] = React.useState("");
    const [longitude, setLongitude] = React.useState("");
    const [lienMaps, setLienMaps] = React.useState("");
    const [servitude, setServitude] = React.useState("");
    const [delais, setDelais] = React.useState("");
    const [observations, setObservations] = React.useState("");
    const [condition, setCondition] = React.useState("");

    const [listeBois, setListeBois] = React.useState([]);
    
    const togglePefc = (checked) => {
        setPefc(checked);
        if(!checked){
            setCodePefc("");
        }
    }

	return (
		<Container maxWidth="lg" className={classes.root}>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    navigate(-1);
                    dispatchNotification("Le devis a ??t?? enregistr?? !")
                }}>
                <Grid container spacing={2}>

                    {/* INFOS */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>Coordonn??es du vendeur</Typography>
                            <Grid container spacing={2}>
                                <Grid container item xs={12} spacing={2} alignItems="center">
                                    <Grid item xs={6} sm={3}>
                                        <Select
                                        fullWidth
                                        variant="outlined"
                                        native
                                        value={responsable}
                                        onChange={(e) => {
                                            setResponsable(e.target.value)
                                        }}
                                        >
                                            <option value="A" default>Anthony</option>
                                            <option value="D">Dylan</option>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={6} sm={9}>
                                        <Typography variant="subtitle2">Num??ro devis</Typography>
                                        <Typography variant="body1" gutterBottom>N?? {responsable+"-1"}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth required label="Propri??taire" value={proprietaire} onChange={(e) => setProprietaire(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Localisation" multiline value={localisation} onChange={(e) => setLocalisation(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth type="tel"
                                    InputProps={{
                                        inputProps: { inputMode: "tel"}
                                    }}
                                    label="T??l??phone" value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth type="email" 
                                    InputProps={{
                                        inputProps: { inputMode: "email"}
                                    }}
                                    label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                    required
                                    fullWidth
                                    label="Date du Devis"
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                </Grid>
                                <Grid container item xs={12} spacing={2}>
                                    <Grid item xs={4} sm={2}>
                                        <FormControlLabel
                                            control={
                                            <Switch
                                                checked={pefc}
                                                onChange={(e) => togglePefc(e.target.checked)}
                                                name="pefc"
                                                color="primary"
                                            />
                                            }
                                            label="PEFC"
                                        />
                                    </Grid>
                                    <Grid item xs={8} sm={10}>
                                    { pefc ? <TextField fullWidth variant="outlined" size="small" label="Code PEFC" value={codePefc} onChange={(e) => setCodePefc(e.target.value)}/> : ""}
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <Geolocalisation  
                                    getLatitude={(e) => setLatitude(e)}
                                    latitude={latitude}
                                    getLongitude={(e) => setLongitude(e)} 
                                    longitude={longitude}
                                    lienMaps={lienMaps}
                                    getLienMaps={(e) => setLienMaps(e)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Servitude / D??p??t" multiline value={servitude} onChange={(e) => setServitude(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="D??lais" value={delais} onChange={(e) => setDelais(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Observations" multiline value={observations} onChange={(e) => setObservations(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth label="Condition d'achat" multiline value={condition} onChange={(e) => setCondition(e.target.value)}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>


                    {/* BOIS */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>Produits</Typography>
                            <FormPiles listeBois={listeBois} getListeBois={(e) => setListeBois(e)}/>
                        </Paper>
                    </Grid>


                    <Grid item xs={12}>
                        <Grid container justify="flex-end">
                            <Button color="primary" type="submit" startIcon={<DoneIcon />} variant="contained">Valider le devis</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
		</Container>
	);
}
	
export default NewDevis