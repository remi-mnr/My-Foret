import React, { useState, useEffect } from 'react';
import {getWoodsGroupByCategories,
    getBackgroundColor,
    getCahierDesCharges} from "../utils/woodtools"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// select
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CahierDesChargesInput from './CahierDesChargesInput';


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
    },
    gridXs: {
        flexGrow: 1,
        maxWidth: '110% !important'
    },
    gridPileSmall: {
        padding: "5px 8px !important",
    },
    commentairePile: {
        color: "#0876ce",
        padding: "0px 8px !important",
        paddingTop: "5px !important"
    },
    iconCommentaire: {
        marginBottom: "-4px"
    }
}));

function FormPiles(props) {
    const classes = useStyles();
    const [openDialogDoublon, setOpenDialogDoublon] = React.useState(false);

    useEffect(()=> {
        const onHashChange = () => {
            switch(window.location.hash) {
                case "#dialogDoublon" :
                    setOpenDialogDoublon(true)
                    break;
                default :
                    setOpenDialogDoublon(false)
            }
        }
        window.addEventListener("hashchange", onHashChange);

        return () => {
            window.removeEventListener("hashchange", onHashChange);
        }
    }, []);


    const changeTypeBois = (newType, indexBois) => {
        let nbType = 0
        props.listeBois.map((bois) => {
            if (bois.type == newType)
                nbType++
        })
        if(nbType == 0) {
            let nouvelleListe = [...props.listeBois]
            nouvelleListe[indexBois].type = newType;
            nouvelleListe[indexBois].cahierDesCharges = getCahierDesCharges(nouvelleListe[indexBois].type) || ""
            props.getListeBois(nouvelleListe)
        } else {
            setOpenDialogDoublon(true);
            window.location.hash = "#dialogDoublon"
        }
    }

    const setCahierDesCharges = (newCdc, indexBois) => {
        let newListeBois = [...props.listeBois]
        newListeBois[indexBois].cahierDesCharges = newCdc
        props.getListeBois(newListeBois)
    }

    const setPrixUnitaireHT = (newPrix, indexBois) => {
        let newListeBois = [...props.listeBois]
        newListeBois[indexBois].prixUnitaireHT = newPrix
        props.getListeBois(newListeBois)
    }

    const setIsPrixGlobal = (value, indexBois) => {
        let newListeBois = [...props.listeBois]
        newListeBois[indexBois].isPrixGlobal = value
        props.getListeBois(newListeBois)
    }

    const addBois = () => {
        let newBois = {
            type: "",
            cahierDesCharges: "",
            prixUnitaireHT: false,
            isPrixGlobal: false
        }
        props.getListeBois([...props.listeBois, newBois])
    }

    const removeBois = (indexBois) => {
        let nouvelleListe = [...props.listeBois]
        nouvelleListe.splice(indexBois, 1)
        props.getListeBois(nouvelleListe)
    }

	return (
        <Grid container spacing={2}>
                                
        {props.listeBois.map((bois, indexBois) => {
            let volumeTotal = 0;
            let prixTotal = 0;
            return <Grid item xs={12} key={bois.type || indexBois}>
                <Paper className={classes.paperTypeBois} variant="outlined" style={{borderLeft: "4px solid ", borderLeftColor: getBackgroundColor(bois.type)}}>
                    <Grid container spacing={2}>
                        {/* Select */}
                        <Grid item xs={12} container spacing={1} alignItems="center">
                            <Grid item xs>
                                <FormControl fullWidth>
                                    <InputLabel>Type de bois</InputLabel>
                                    <Select
                                    native
                                    name="type"
                                    value={bois.type}
                                    onChange={(e) => changeTypeBois(e.target.value, indexBois)}
                                    >
                                        <option aria-label="None" value="" />
                                        {Object.entries(getWoodsGroupByCategories()).map(([categorieName, categorieContent], index) => (
                                            <optgroup label={categorieName} key={categorieName}>
                                                {Object.entries(categorieContent).map(([woodName, data]) => (
                                                    <option value={woodName} key={woodName}>{woodName} - {data.name}</option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <IconButton size="medium" onClick={() => {
                                    removeBois(indexBois);
                                }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <CahierDesChargesInput 
                            cahierDesCharges={bois.cahierDesCharges} 
                            setCahierDesCharges={(e) => setCahierDesCharges(e, indexBois)}/>
                        </Grid>

                        <Grid item xs>
                            <TextField type="number" fullWidth
                            label={bois.isPrixGlobal ? "Prix Global H.T" : "Prix Unitaire H.T"}
                            value={bois.prixUnitaireHT}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                inputProps: { min: 0, step: "any", inputMode: "decimal"},
                            }}
                            onChange={(e) => setPrixUnitaireHT(e.target.value, indexBois)}
                            />
                        </Grid>

                        <Grid item>
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={bois.isPrixGlobal}
                                    onChange={(e) => setIsPrixGlobal(e.target.checked, indexBois)}
                                    name="prix global"
                                    color="primary"
                                />
                                }
                                label="Prix Global"
                            />
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        })}

        {/* <Grid item xs={12}><Divider /></Grid> */}
        <Grid item xs={12}>
            <Button variant="contained" color="secondary" fullWidth onClick={() => addBois()}>
                Nouveau Produit
            </Button>
        </Grid>
        


        {/* Dialog doublon */}
        <Dialog 
            open={openDialogDoublon}
            aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    Vous avez déja une entrée pour ce type de bois.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                onClick={() => {setOpenDialogDoublon(false); window.history.back()}} 
                color="primary">
                    ok
                </Button>
            </DialogActions>
        </Dialog>

        {/* Dialog delete bois */}
        {/* <Dialog 
            open={openDialogDelete} 
            aria-labelledby="form-dialog-title">
            <DialogContent>
                <DialogContentText>
                    Voulez-vous vraiment supprimer les données renseignées pour ce type de bois ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                onClick={() => {setOpenDialogDelete(false); window.history.back()}} 
                color="primary">
                    Annuler
                </Button>
                <Button 
                onClick={() => {setOpenDialogDelete(false); removeBois(); window.history.back()}} 
                color="primary">
                    Valider
                </Button>
            </DialogActions>
        </Dialog> */}

    </Grid>  
	);
}
	
export default FormPiles