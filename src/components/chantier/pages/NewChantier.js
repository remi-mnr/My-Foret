import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"
import {getCoupeurs,
    getDebardeurs} from "../../utils/woodtools"
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DoneIcon from '@material-ui/icons/Done';

import Geolocalisation from '../Geolocalisation';
import FormPiles from "../FormPiles";
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
    paperTypeBois: {
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            padding: '15px 9px'
        },
    },
    buttonPile: {
        padding: '5px',
        width: "100%"
    },
    commentairePile: {
        color: "#0876ce",
        marginTop: "3px"
    },
    formControl: {
        width: "100%",
    },
    title: {
        marginBottom: '15px',
    },
    cardPile: {
        padding: '5px',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '16px'
        },
    },
    cardTotalPile: {
        padding: '5px',
    }
}));

function NewChantier() {
    const classes = useStyles();
    const [responsable, setResponsable] = React.useState("A");

    const [numeroChantier, setNumeroChantier] = React.useState(1);
    const [proprietaire, setProprietaire] = React.useState("");
    const [localisation, setLocalisation] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [telephone, setTelephone] = React.useState("");
    let today = moment().format("YYYY-MM-DD")
    const [date, setDate] = React.useState(today);
    const [pefc, setPefc] = React.useState(false);
    const [codePefc, setCodePefc] = React.useState("");
    const [selectCoupeur, setSelectCoupeur] = React.useState("");
    const [coupeur, setCoupeur] = React.useState("");
    const [selectDebardeur, setSelectDebardeur] = React.useState("");
    const [debardeur, setDebardeur] = React.useState("");
    const [autre, setAutre] = React.useState("");
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
                    dispatchNotification("Le chantier a été enregistré !")
                }}>
                <Grid container spacing={2}>
                    {/* INFOS */}
                    <Grid item xs={12} lg={8}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>Coordonnées du chantier</Typography>
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
                                        <TextField
                                        fullWidth
                                        variant="outlined"
                                        required
                                        label="Numéro chantier"
                                        type="number"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start">{responsable}-{(new Date().getFullYear()).toString().substring(2, 4)}-</InputAdornment>,
                                            }}
                                        value={numeroChantier}
                                        onChange={(e) => setNumeroChantier(e.target.value)}/>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth required label="Propriétaire" value={proprietaire} onChange={(e) => setProprietaire(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth multiline label="Localisation" value={localisation} onChange={(e) => setLocalisation(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth type="tel"
                                    InputProps={{
                                        inputProps: { inputMode: "tel"}
                                    }}
                                    label="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)}/>
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
                                    label="Date du Chantier"
                                    type="date"
                                    // defaultValue="2017-05-24"
                                    value={date}
                                    onChange={(e) => {
                                        setDate(e.target.value)
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
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
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* EQUIPE */}
                    <Grid item xs={12} lg={4}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>Équipe</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm lg={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Coupeur</InputLabel>
                                        <Select
                                            native
                                            name="Coupeur"
                                            value={selectCoupeur}
                                            onChange={(e) => setSelectCoupeur(e.target.value)}
                                            >
                                                <option value="" />
                                                {getCoupeurs().map((coupeur, index) => {
                                                    return <option key={index} value={coupeur} default>{coupeur}</option>
                                                })}
                                                <option value="autre">Autre</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {selectCoupeur === "autre" && 
                                [<Grid item xs={12} sm={8} lg={12}>
                                    <TextField fullWidth label="Nom du Coupeur" value={coupeur} onChange={(e) => setCoupeur(e.target.value)}/>
                                </Grid>,
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>]}
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm lg={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Débardeur</InputLabel>
                                        <Select
                                            native
                                            name="Debardeur"
                                            value={selectDebardeur}
                                            onChange={(e) => setSelectDebardeur(e.target.value)}
                                            >
                                                <option value="" />
                                                {getDebardeurs().map((debardeur, index) => {
                                                    return <option key={index} value={debardeur} default>{debardeur}</option>
                                                })}
                                                <option value="autre">Autre</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {selectDebardeur === "autre" && 
                                [<Grid item xs={12} sm={8} lg={12}>
                                    <TextField fullWidth label="Nom du Debardeur" value={debardeur} onChange={(e) => setDebardeur(e.target.value)}/>
                                </Grid>,
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>]}

                                <Grid item xs={12}>
                                    <TextField fullWidth label="Autre" value={autre} onChange={(e) => setAutre(e.target.value)}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* GPS */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Geolocalisation 
                            getLatitude={(e) => setLatitude(e)}
                            latitude={latitude}
                            getLongitude={(e) => setLongitude(e)} 
                            longitude={longitude}
                            lienMaps={lienMaps}
                            getLienMaps={(e) => setLienMaps(e)} />
                        </Paper>
                    </Grid>

                    {/* CONTEXTE */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth multiline label="Servitude / Dépôt" value={servitude} onChange={(e) => setServitude(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth multiline label="Délais" value={delais} onChange={(e) => setDelais(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth multiline label="Observations" value={observations} onChange={(e) => setObservations(e.target.value)}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth multiline label="Condition d'achat" value={condition} onChange={(e) => setCondition(e.target.value)}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    

                    {/* BOIS */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>Réception chantier</Typography>
                            <FormPiles listeBois={listeBois} getListeBois={(e) => setListeBois(e)}/>
                        </Paper>
                    </Grid>
                    
                    <Grid item xs={12} container justify="flex-end">
                        <Button type="submit" color="primary" startIcon={<DoneIcon />} variant="contained">Valider le chantier</Button>
                    </Grid>
                </Grid>
            </form>

            
		</Container>
	);
}
	
export default NewChantier