import React, { useState, useEffect } from 'react';
import {getWoodsGroupByCategories,
    getVolumePile,
    getBackgroundColor,
    getUnit,
    getPriceStack,
    getCahierDesCharges} from "../utils/woodtools"

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import CommentIcon from '@material-ui/icons/Comment';
import Hidden from '@material-ui/core/Hidden';
// select
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';

import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CahierDesChargesInput from '../devis/CahierDesChargesInput';


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
    // formControl: {
    //     width: "100%",
    // },
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
    const [openDialogCommentaire, setOpenDialogCommentaire] = React.useState(false);
    const [currentPileId, setCurrentPileId] = React.useState(false);
    const [currentBoisId, setCurrentBoisId] = React.useState(1);
    const [currentCommentaire, setCurrentCommentaire] = React.useState();

    const [openDialogDoublon, setOpenDialogDoublon] = React.useState(false);

    useEffect(()=> {
        const onHashChange = () => {
            switch(window.location.hash) {
                case "#dialogDoublon" :
                    setOpenDialogDoublon(true)
                    break;
                case "#dialogCommentaire" :
                    setOpenDialogCommentaire(true)
                    break;
                default :
                    setOpenDialogCommentaire(false)
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

    const handleChangeNumeroPile = (value, indexBois, indexPile) => {
        let newListeBois = [...props.listeBois]
        newListeBois[indexBois].piles[indexPile].numeroPile = value
        props.getListeBois(newListeBois)
    }
    const handleChangeLongeur = (value, indexBois, indexPile) => {
        let newListeBois = [...props.listeBois]
        newListeBois[indexBois].piles[indexPile].longeur = value
        props.getListeBois(newListeBois)
    }
    const handleChangeLargeur = (value, indexBois, indexPile) => {
        let newListeBois = [...props.listeBois]
        newListeBois[indexBois].piles[indexPile].largeur = value
        props.getListeBois(newListeBois)
    }
    const handleChangeHauteur = (value, indexBois, indexPile) => {
        let newListeBois = [...props.listeBois]
        newListeBois[indexBois].piles[indexPile].hauteur = value
        props.getListeBois(newListeBois)
    }
    const handleChangeCommentaire = (value, indexBois, indexPile) => {
        let newListeBois = [...props.listeBois]
        newListeBois[indexBois].piles[indexPile].commentaire = value
        props.getListeBois(newListeBois)
    }

    const dialogCommentaire = (indexBois, indexPile) => {
        window.location.hash = "#dialogCommentaire"
        setCurrentBoisId(indexBois)
        setCurrentPileId(indexPile)
        setCurrentCommentaire(props.listeBois[indexBois].piles[indexPile].commentaire)
        setOpenDialogCommentaire(true)
    }

    const addBois = () => {
        let newBois = {
            type: "",
            piles: [],
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

    const addPile = (indexBois) => {
        let nouvelleListe = [...props.listeBois]
        let newPile = {
            numeroPile: "",
            longeur: "",
            largeur: "",
            hauteur: "",
            commentaire: "",
        }
        nouvelleListe[indexBois].piles.push(newPile)
        props.getListeBois(nouvelleListe)
    }

    const deletePile = (indexBois, indexPile) => {
        let nouvelleListe = [...props.listeBois]
        nouvelleListe[indexBois].piles.splice(indexPile, 1)
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

                        <Grid item xs={12} sm>
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

                        {/* Piles */}
                        <Grid item xs={12} container spacing={2} className={classes.gridXs}>
                            <Grid item xs={12}><Divider /></Grid>
                            {bois.piles.map((pile, indexPile) => {
                                volumeTotal += getVolumePile(pile, bois.type)
                                prixTotal += getPriceStack(pile, bois.type, bois.prixUnitaireHT)
                                return <Grid container item xs={12} spacing={2} key={indexPile} className={classes.gridXs}>
                                    {/* BIG */}
                                    <Hidden smDown>
                                        <Grid item xs container spacing={2} alignItems="center" className={classes.gridXs}>
                                            <Grid item xs>
                                                <TextField type="number" fullWidth
                                                value={pile.numeroPile}
                                                onChange={(e) => handleChangeNumeroPile(e.target.value, indexBois, indexPile)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">Pile</InputAdornment>,
                                                    inputProps: { min: 0, step: "1", inputMode: "numeric"},
                                                }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField type="number" fullWidth
                                                onChange={(e) => handleChangeLongeur(e.target.value, indexBois, indexPile)}
                                                value={pile.longeur}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">L</InputAdornment>,
                                                    inputProps: { min: 0, step: "any", inputMode: "decimal"},
                                                }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField type="number" fullWidth
                                                onChange={(e) => handleChangeLargeur(e.target.value, indexBois, indexPile)}
                                                value={pile.largeur}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">l</InputAdornment>,
                                                    inputProps: { min: 0, step: "any", inputMode: "decimal"},
                                                }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField type="number" fullWidth
                                                onChange={(e) => handleChangeHauteur(e.target.value, indexBois, indexPile)}
                                                value={pile.hauteur}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">H</InputAdornment>,
                                                    inputProps: { min: 0, step: "any", inputMode: "decimal"},
                                                }}
                                                />
                                            </Grid>
                                        </Grid>
                                    
                                        <Grid
                                        item
                                        sm={bois.isPrixGlobal ? 2 : 4}
                                        md={bois.isPrixGlobal ? 2 : 4}
                                        lg={bois.isPrixGlobal ? 2 : 3}
                                        xl={bois.isPrixGlobal ? 1 : 2}
                                        container spacing={2} alignItems="center">
                                            <Grid item xs>
                                                <Typography noWrap align="right" variant="body2">{getVolumePile(pile, bois.type)} {getUnit(bois.type, true)}</Typography>
                                            </Grid>
                                            {bois.isPrixGlobal ? null :
                                            <Grid item xs>
                                                <Typography noWrap align="right" variant="body2">{getPriceStack(pile, bois.type, bois.prixUnitaireHT)} € H.T</Typography>
                                            </Grid>}
                                            
                                        </Grid>
                                        
                                    </Hidden>

                                    {/* SMALL */}
                                    <Hidden mdUp>
                                        <Grid item xs={12} container spacing={2} alignItems="center" className={classes.gridPileSmall}>
                                            <Grid item xs>
                                                <TextField type="number" fullWidth
                                                value={pile.numeroPile}
                                                onChange={(e) => handleChangeNumeroPile(e.target.value, indexBois, indexPile)}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">Pile</InputAdornment>,
                                                    inputProps: { min: 0, step: "1", inputMode: "numeric"},
                                                }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography noWrap align="right" variant="body2">{getVolumePile(pile, bois.type)} {getUnit(bois.type, true)}</Typography>
                                            </Grid>
                                            {bois.isPrixGlobal ? null :
                                            <Grid item>
                                                <Typography noWrap align="right" variant="body2">{getPriceStack(pile, bois.type, bois.prixUnitaireHT)} € H.T</Typography>
                                            </Grid>}
                                        </Grid>
                                        <Grid item xs={12} container spacing={1} alignItems="center" className={classes.gridPileSmall}>
                                            <Grid item xs>
                                                <TextField type="number" fullWidth
                                                onChange={(e) => handleChangeLongeur(e.target.value, indexBois, indexPile)}
                                                value={pile.longeur}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">L</InputAdornment>,
                                                    inputProps: { min: 0, step: "any", inputMode: "decimal" },
                                                }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField type="number" fullWidth
                                                onChange={(e) => handleChangeLargeur(e.target.value, indexBois, indexPile)}
                                                value={pile.largeur}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">l</InputAdornment>,
                                                    inputProps: { min: 0, step: "any", inputMode: "decimal" },
                                                }}
                                                />
                                            </Grid>
                                            <Grid item xs>
                                                <TextField type="number" fullWidth
                                                onChange={(e) => handleChangeHauteur(e.target.value, indexBois, indexPile)}
                                                value={pile.hauteur}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">H</InputAdornment>,
                                                    inputProps: { min: 0, step: "any", inputMode: "decimal" },
                                                }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Hidden>

                                    {/* COMMENTAIRE - SMALL */}
                                    <Hidden lgUp>
                                        {pile.commentaire !== "" ? <Grid item xs={12} container alignItems="center" spacing={1} className={classes.commentairePile}>
                                            <Grid item className={classes.iconCommentaire}>
                                                <InfoIcon />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography style={{whiteSpace: 'pre-line'}} variant="caption">Commentaire pile : {pile.commentaire}</Typography>
                                            </Grid>
                                        </Grid> : null}
                                    </Hidden>
                                    
                                    <Grid item xs={12} md={12} lg={2} container spacing={2} justify="center" style={{padding: "0"}}>
                                        <Grid item>
                                            <IconButton size="medium" onClick={() => {
                                                dialogCommentaire(indexBois, indexPile);
                                            }}>
                                                <CommentIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton size="medium" onClick={() => {
                                                deletePile(indexBois, indexPile);
                                            }}>
                                                <ClearIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>

                                    {/* COMMENTAIRE - BIG */}
                                    <Hidden mdDown>
                                        {pile.commentaire !== "" ? <Grid item xs={12} container alignItems="center" spacing={1} className={classes.commentairePile}>
                                            <Grid item className={classes.iconCommentaire}>
                                                <InfoIcon />
                                            </Grid>
                                            <Grid item xs>
                                                <Typography style={{whiteSpace: 'pre-line'}} variant="caption">Commentaire pile : {pile.commentaire}</Typography>
                                            </Grid>
                                        </Grid> : null}
                                    </Hidden>
                                    <Grid item xs={12}><Divider /></Grid>
                                    
                                </Grid>
                            })}
                            <Grid container item xs={12} align="center" spacing={3} className={classes.gridXs}>
                                <Grid item xs={12}>
                                    <IconButton size="medium" onClick={() => {
                                        addPile(indexBois);
                                    }}>
                                        <AddIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs>
                                    <Typography align="right" variant="body2" style={{fontWeight: "bold"}}>Total</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography noWrap variant="body2">{Math.round((volumeTotal + Number.EPSILON) * 100) / 100} {getUnit(bois.type)}</Typography>
                                </Grid>
                                <Grid item>
                                    {bois.isPrixGlobal ? 
                                    <Typography noWrap align="right" variant="body2">{Math.round((bois.prixUnitaireHT + Number.EPSILON) * 100) / 100} € H.T</Typography> :
                                    <Typography noWrap align="right" variant="body2">{Math.round((prixTotal + Number.EPSILON) * 100) / 100} € H.T</Typography>}
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        })}

        <Grid item xs={12}><Divider /></Grid>
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

        {/* Dialog Info Pile*/}
        <Dialog 
            fullWidth={true}
            maxWidth="sm"
            open={openDialogCommentaire}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Commentaire de la Pile</DialogTitle>
            <DialogContent>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField fullWidth autoFocus multiline label="Commentaire" value={currentCommentaire} onChange={(e) => setCurrentCommentaire(e.target.value)}/>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button 
                onClick={() => {
                    setOpenDialogCommentaire(false);
                    setCurrentPileId(false);
                    setCurrentCommentaire("");
                    window.history.back();
                }}
                color="primary">
                    Annuler
                </Button>
                <Button 
                onClick={() => {
                    setOpenDialogCommentaire(false);
                    handleChangeCommentaire(currentCommentaire, currentBoisId, currentPileId);
                    setCurrentCommentaire("");
                    window.history.back();
                }} 
                color="primary">
                    Valider
                </Button>
            </DialogActions>
        </Dialog>

    </Grid>  
	);
}
	
export default FormPiles