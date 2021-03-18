import React, { useState, useEffect } from 'react';
import { getUnit, 
    getBackgroundColor,
    convertTimestampToHumandeDate,
    convertDateToTimestamp } from "../utils/woodtools"
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Hidden from '@material-ui/core/Hidden';
import EditIcon from '@material-ui/icons/Edit';

import { dispatchNotification } from "../utils/notification"


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

function StockManager({ stock }) {
    const classes = useStyles();
    const [dialogSortie, setDialogSortie] = useState(false)
    const [currentType, setCurrentType] = useState(false)
    const [currentNumFacture, setCurrentNumFacture] = useState("")
    const [currentDate, setCurrentDate] = useState("")
    const [currentQuantite, setCurrentQuantite] = useState("")

    const resetCurrent = () => {
        setCurrentNumFacture("")
        setCurrentDate("")
        setCurrentQuantite("")
        setCurrentType(false)
    }

    const facturesOrderByDate = (factures) => {
        const compare = (a, b) => {
            const dateA = a.date;
            const dateB = b.date;
        
            //compare stock
            if (dateA > dateB) {return 1} 
            else if (dateA < dateB) {return -1} 
            else {return 0}
        }

        let sortedFactures = []
        Object.entries(factures).map(([idFacture, dataFacture]) => {
            sortedFactures.push({
                date: idFacture,
                ...dataFacture
            })
        })
        return sortedFactures.sort(compare)
    }

	return (
        <div>
            <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom>Gestion du Stock</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer component={Paper} variant="outlined">
                            <Table size="small" className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow className={classes.tableHead}>
                                        <TableCell component="th" scope="row">Produit</TableCell>
                                        <Hidden xsDown>
                                            <TableCell align="right">Volume Initial</TableCell>
                                        </Hidden>
                                        <TableCell align="right">Stock</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {Object.entries(stock).map(([refWood, dataWood], index) => (
                                    <TableRow key={refWood} className={classes.tableRow}
                                    style={{ backgroundColor: getBackgroundColor(refWood) }}>
                                        <TableCell component="th" scope="row">[{refWood}]</TableCell>
                                        <Hidden smUp>
                                            {/* <TableCell align="right">{(dataWood.volumeInitial || "-") +" "+getUnit(refWood)}</TableCell> */}
                                            <TableCell align="right">{(dataWood.stock || "0") +" "+getUnit(refWood)}</TableCell>
                                        </Hidden>
                                        <Hidden xsDown>
                                            <TableCell align="right">{(dataWood.volumeInitial || "0") +" "+getUnit(refWood, true)}</TableCell>
                                            <TableCell align="right">{(dataWood.stock) +" "+getUnit(refWood, true)}</TableCell>
                                        </Hidden>
                                        <TableCell align="right">
                                            {/* {dataWood.stock === 0 ? null : */}
                                                <IconButton
                                                aria-label="delete"
                                                size="small"
                                                onClick={() => {
                                                    setDialogSortie(true)
                                                    setCurrentType(refWood)
                                                    setCurrentQuantite(0)
                                                    setCurrentDate(moment().unix())
                                                }}>
                                                    <EditIcon fontSize="inherit"/>
                                                </IconButton>
                                            {/* } */}
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="overline" gutterBottom>Historique des mouvements de stock</Typography>
                        <TableContainer component={Paper} variant="outlined">
                            <Table size="small" aria-label="a dense table">
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Date</TableCell>
                                        <TableCell component="th" scope="row">Bois</TableCell>
                                        <TableCell align="right">Volume</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(stock).map(([refType, dataType]) => {
                                        let factures = facturesOrderByDate(dataType.factures)
                                        return factures && factures.map((dataFacture) => (
                                            <TableRow 
                                            key={dataFacture.date}
                                            style={{ backgroundColor: getBackgroundColor(refType) }}>
                                                <TableCell component="th" scope="row">
                                                    {convertTimestampToHumandeDate(dataFacture.date)}
                                                    {dataFacture.detail ? <br/> : null}
                                                    {dataFacture.detail ? <Typography variant="caption" style={{color: "#0876ce"}}>Détail : {dataFacture.detail}</Typography> : null}
                                                </TableCell>
                                                <TableCell component="th" scope="row"><span>[{refType}]</span></TableCell>
                                                <TableCell align="right"><b>{dataFacture.after}</b> / {dataType.volumeInitial} {getUnit(refType, true)}</TableCell>
                                            </TableRow>
                                        ))
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>


            {/* Dialog Add Transaction*/}
            <Dialog 
                open={dialogSortie} 
                onClose={() => {
                    setDialogSortie(false)
                    resetCurrent()
                    }
                }
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{currentType || "-"}</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={2} justify="space-between">
                            <Grid item xs={12} md={6}>
                                <TextField 
                                fullWidth 
                                type="number" 
                                label="Quantité restante"
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">{currentType && getUnit(currentType)}</InputAdornment>,
                                    inputProps: { min: "0", step: ".1" , max: currentType && stock[currentType].stock },
                                }}
                                value={currentQuantite}
                                onChange={(e) => setCurrentQuantite(e.target.value)}/>
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    label="Date"
                                    type="date"
                                    fullWidth
                                    // defaultValue="2017-05-24"
                                    // className={classes.textField}
                                    value={moment.unix(currentDate).format("YYYY-MM-DD")}
                                    onChange={(e) => {
                                        setCurrentDate(convertDateToTimestamp(e.target.value))
                                    }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth type="text" label="Détail (optionnel)" value={currentNumFacture} onChange={(e) => setCurrentNumFacture(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => {
                        setDialogSortie(false)
                        }
                    }
                    color="primary">
                        Annuler
                    </Button>
                    <Button 
                    onClick={() => {
                        setDialogSortie(false)
                        dispatchNotification("Le stock a été mis à jour !")
                    }} 
                    color="primary">
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>

        </div> 
	);
}
	
export default StockManager