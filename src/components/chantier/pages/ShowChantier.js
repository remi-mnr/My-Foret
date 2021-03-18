import React, { useState, useEffect } from 'react';
import {chantiersDB, pilesDB, stocksDB, devisDB} from '../../utils/fakeDB';
import { navigate } from "@reach/router"
import { sortStackByCategory,
    getRefName, 
    getUnit, 
    getBackgroundColor,
    convertDateToTimestamp } from "../../utils/woodtools"

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';
import EditIcon from '@material-ui/icons/Edit';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';
import ReceptionChantierPDF from '../../pdf/ReceptionChantierPDF'
import ContratAchatPDF from '../../pdf/ContratAchatPDF'
import InfosChantier from '../InfosChantier'
import StockManager from '../StockManager'


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
	tableHead: {
		backgroundColor: "#f1f1f1"
    },
    iconInit: {
        color: "#00E676"
    },
    iconDebit: {
        color: "#FF1744"
    },
    iconFinal: {
        color: "#2979FF"
    },
    rowIcon: {
        display: "flex"
    },
    stockEmpty: {
        color: "#00b0ff"
    },
    inStock: {
        color: "#f57c00"
    },
    collapseContent: {
        paddingTop: "0px",
        paddingBottom: "15px !important"
    },
    cardContent: {
        padding: "10px 16px"
    },
    toRightButton: {
        display: "flex",
        marginLeft: "auto"
    },
    tableTransaction: {
        borderCollapse: "inherit"
    },
    subRowPile: {
        borderBottomColor: "#f1f1f1",
    },
    subResultRow: {
        backgroundColor: "#fafafa"
    }
}));

function ShowChantier(params) {
    const classes = useStyles();
    const [chantier, setChantier] = useState(chantiersDB[params.idChantier])
    const [stock, setStock] = useState(false)
    const [unsortedWoods, setUnsortedWoods] = useState(false)
    const [sortedWoods, setSortedWoods] = useState(false)

    useEffect(()=> {
        setUnsortedWoods(pilesDB[params.idChantier])
        setSortedWoods(sortStackByCategory(pilesDB[params.idChantier]))

        setStock(stocksDB[params.idChantier])
    }, []);

	return (
		<Container maxWidth="lg" className={classes.root}>

            {/* INFOS */}
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <InfosChantier chantier={chantier} piles={unsortedWoods} idDocChantier={params.idChantier}/>
                </Grid>
                
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>Stock initial</Typography>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead className={classes.tableHead}>
                                            <TableRow>
                                                <Hidden xsDown>
                                                    <TableCell component="th" scope="row">Code</TableCell>
                                                </Hidden>
                                                <TableCell component="th" scope="row">Produit</TableCell>
                                                <Hidden xsDown>
                                                    <TableCell align="left">Prix H.T</TableCell>
                                                </Hidden>
                                                <TableCell align="right">N° Pile</TableCell>
                                                <Hidden xsDown>
                                                    <TableCell align="right">Cotes</TableCell>
                                                </Hidden>
                                                <TableCell align="right">Quantité</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {Object.entries(sortedWoods).map(([reference, bois], index) => {
                                            let globalVolume = 0
                                            let unit = ""
                                            let piles = Object.entries(bois).map(([refPile, pile], i) => {
                                                globalVolume += pile.volume
                                                unit = getUnit(pile.type)
                                                return (
                                                <TableRow key={i} style={{ backgroundColor: getBackgroundColor(reference) }}>
                                                    <Hidden xsDown>
                                                        <TableCell component="th" scope="row" className={classes.subRowPile}>{i==0 ? reference :''}</TableCell>
                                                    </Hidden>
                                                    <TableCell component="th" scope="row" className={classes.subRowPile}>
                                                        {i==0 ? <span>{getRefName(reference)}<br/><i>{pile.cahierDesCharges}</i></span>:''}
                                                        {i==0 && pile.commentaire ? <br/> : null}
                                                        {pile.commentaire ? <Typography variant="caption" style={{color: "#0876ce"}}>Commentaire pile : {pile.commentaire}</Typography> : null}
                                                    </TableCell>
                                                    <Hidden xsDown>
                                                        {pile.isPrixGlobal ?
                                                            <TableCell align="left" className={classes.subRowPile}>{i==0 && pile.prixUnitaireHT ? pile.prixUnitaireHT+" €" :'-'}</TableCell> :
                                                            <TableCell align="left" className={classes.subRowPile}>{i==0 && pile.prixUnitaireHT ? pile.prixUnitaireHT+" € / " + getUnit(pile.type, true) :'-'}</TableCell>}
                                                        {/* <TableCell align="left" className={classes.subRowPile}>{i==0 ? pile.prixUnitaireHT+" €" :''}</TableCell> */}
                                                    </Hidden>
                                                    <TableCell align="right" className={classes.subRowPile}>{pile.numeroPile || "-"}</TableCell>
                                                    <Hidden xsDown>
                                                        <TableCell align="right" className={classes.subRowPile}>{pile.longeur}x{pile.largeur}x{pile.hauteur}m</TableCell>
                                                    </Hidden>

                                                    <Hidden xsDown>
                                                        <TableCell align="right" className={classes.subRowPile}>{pile.volume} {getUnit(reference)}</TableCell>
                                                    </Hidden>
                                                    <Hidden smUp>
                                                        <TableCell align="right" className={classes.subRowPile}>{pile.volume} {getUnit(reference, true)}</TableCell>
                                                    </Hidden>
                                                </TableRow>)
                                            })
                                            return [ piles ,
                                            <TableRow key={index} className={classes.subResultRow}>
                                                <Hidden xsDown>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell><TableCell></TableCell>
                                                </Hidden>
                                                <TableCell align="right"></TableCell>
                                                <TableCell align="right">Total</TableCell>
                                                <Hidden xsDown>
                                                    <TableCell align="right">{Math.round((globalVolume + Number.EPSILON) * 100) / 100} {getUnit(reference)}</TableCell>
                                                </Hidden>
                                                <Hidden smUp>
                                                    <TableCell align="right">{Math.round((globalVolume + Number.EPSILON) * 100) / 100} {getUnit(reference, true)}</TableCell>
                                                </Hidden>
                                            </TableRow>]
                                        })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid container justify="flex-end" item xs={12} spacing={1}>
                                <Grid item>
                                    <Button variant="outlined" color="primary" onClick={() => navigate('/edit-chantier-piles/'+params.idChantier)}>Modifier</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <StockManager stock={stock} />
                </Grid>
            </Grid>
		</Container>
	);
}
	
export default ShowChantier