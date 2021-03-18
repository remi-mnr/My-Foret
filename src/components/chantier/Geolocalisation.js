import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Hidden from '@material-ui/core/Hidden';
import ClearIcon from '@material-ui/icons/Clear';


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
    switch: {
        padding: "0 !important",
    },
    switchText: {
        fontWeight: 500,
    }
}));

function Geolocalisation( props ) {
    const classes = useStyles();
    const [autoTab, setAutoTab] = useState(true)
    const [gpsStatus, setGpsStatus] = useState(0)
    const [gpsModeSelector, setGpsModeSelector] = useState(false) // 1=coord , 0=lien

    useEffect(() => {
        if(autoTab) {
            if(props.lienMaps !== "") {
                setGpsModeSelector(false)
            } else if (props.latitude !== "" || props.longitude !== "") {
                setGpsModeSelector(true)
            }
        }
    }, [props.latitude, props.longitude, props.lienMaps])

    const getGeolocalisation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                setGpsStatus(1)
                changeLatitude(position.coords.latitude)
                changeLongitude(position.coords.longitude)
            },
            (msg) => {
                console.log("Veuillez activer votre GPS", msg)
                setGpsStatus(-1)
            },
            {
                maximumAge:10000,
                timeout:5000,
                enableHighAccuracy: true
            });
        } else {
            console.log("Géolocalisation non disponible sur cet appareil")
            setGpsStatus(-2)
        }
    }

    const changeLatitude = (latitude) => {
        props.getLatitude(latitude)
    }

    const changeLongitude = (longitude) => {
        props.getLongitude(longitude)
    }

    const changeLien = (lien) => {
        props.getLienMaps(lien)
    }

    const changeGpsModeSelector = (mode) => {
        setAutoTab(false)
        setGpsModeSelector(mode)
    }

    const errorMessage = () => {
        switch(gpsStatus) {
            case -1:
                return <Typography variant="caption" style={{color: "#FF1744", fontWeight: "500"}}>Veuillez activer votre GPS.</Typography>
            case -2:
                return <Typography variant="caption" style={{color: "#FF1744", fontWeight: "500"}}>Géolocalisation non disponible sur cet appareil.</Typography>
            default:
        }
    }

	return (
		<Grid container spacing={2}>
            <Grid item xs={12} container spacing={2}>
                <Grid item>
                    <Typography variant="h6">Position GPS</Typography>
                </Grid>
                {/* Selector */}
                <Hidden xsDown>
                    <Grid item xs container spacing={2} justify="flex-end">
                        <Grid item>
                            <ButtonGroup size="small" disableElevation color="primary">
                                <Button 
                                    variant={!gpsModeSelector ? "contained" : "outlined"}
                                    onClick={() => changeGpsModeSelector(false)}
                                >Lien Google</Button>
                                <Button 
                                    variant={gpsModeSelector ? "contained" : "outlined"}
                                    onClick={() => changeGpsModeSelector(true)}
                                >Géolocalisation</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Grid item xs>
                        <ButtonGroup size="small" disableElevation color="primary">
                            <Button 
                                variant={!gpsModeSelector ? "contained" : "outlined"}
                                onClick={() => changeGpsModeSelector(false)}
                            >Lien Google</Button>
                            <Button 
                                variant={gpsModeSelector ? "contained" : "outlined"}
                                onClick={() => changeGpsModeSelector(true)}
                            >Géolocalisation</Button>
                        </ButtonGroup>
                    </Grid>
                </Hidden>
            </Grid>

            {/* Geolocalisation */}
            {gpsModeSelector && 
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth type="number" label="Latitude" value={props.latitude} onChange={(e) => changeLatitude(e.target.value)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth type="number" label="Longitude" value={props.longitude} onChange={(e) => changeLongitude(e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                    {errorMessage()}
                </Grid>
                <Grid container spacing={2} item xs={12}>
                    <Grid item>
                        <Button 
                        variant="contained"
                        color="primary"
                        onClick={() => getGeolocalisation()}
                        startIcon={<LocationOnIcon />}>
                            Position
                        </Button>
                    </Grid>
                    {props.latitude !== "" && props.longitude !== "" &&
                    <Grid item>
                        <Button 
                        variant="contained"
                        onClick={() => {
                            changeLatitude("")
                            changeLongitude("")
                        }}
                        startIcon={<ClearIcon />}>
                            Effacer
                        </Button>
                    </Grid>}
                </Grid>
            </Grid>}

            {/* Lien Google */}
            {!gpsModeSelector && 
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        label="Lien Google Maps"
                        value={props.lienMaps}
                        onChange={(e) => changeLien(e.target.value)}
                    />
                </Grid>
            </Grid>}

        </Grid>
	);
}
	
export default Geolocalisation