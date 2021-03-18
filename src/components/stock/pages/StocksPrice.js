import React, { useState, useEffect } from 'react';
import { stocksDB, priceTableDB } from '../../utils/fakeDB';
import { navigate } from "@reach/router"
import { getRefTable, getUnit } from '../../utils/woodtools'

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Snackbar from '@material-ui/core/Snackbar';
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
    woodName: {
        textTransform: 'capitalize',
        fontSize: '1.05rem'
    },
    card: {
        padding: '10px 16px'
    },
    inStock: {
        fontWeight: "800"
    },
    settingIcon: {
        marginLeft: '7px'
    },
	tableHead: {
		backgroundColor: "#f1f1f1"
    },
}));

function StocksPrice() {
    const classes = useStyles();

    const [volumeInit, setVolumeInit] = useState(false);
    const [stock, setStock] = useState(false);
    const [prices, setPrices] = useState(priceTableDB);

    const [openDialog, setOpenDialog] = useState(false);
    const [currentType, setCurrentType] = useState("");
    const [currentPrice, setCurrentPrice] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(true)

    useEffect(() => {
        const onHashChange = () => {
            switch(window.location.hash) {
                case "#dialog" :
                    setOpenDialog(true)
                    break;
                default :
                    setOpenDialog(false)
            }
        }
        window.addEventListener("hashchange", onHashChange);

        let stock = [];
        Object.entries(stocksDB).map(([chantier, stocks]) => {
            Object.entries(stocks).map(([key, value]) => {
                stock.push(value)
            })
        })
        setStockAndVolumeInitial(stock)


		return () => {
            window.removeEventListener("hashchange", onHashChange);
        }
        
    }, []);

    const setStockAndVolumeInitial = (stock) => {
        let volumeInit = {}
        let volumeRestant = {}
        stock && stock.map((stock) => {
            if(volumeInit[stock.type] === undefined){
                volumeInit[stock.type] = 0
            }
            volumeInit[stock.type] += Number(stock.volumeInitial)
            
            if(volumeRestant[stock.type] === undefined){
                volumeRestant[stock.type] = 0
            }
            volumeRestant[stock.type] += Number(stock.stock)
        })
        setVolumeInit({...volumeInit})
        setStock({...volumeRestant})
    }

    const openDialogType = (type) => {
        window.location.hash = "#dialog";
        setOpenDialog(true)
        setCurrentType(type)
        setCurrentPrice(prices[type])
    }
    
    const closeDialog = () => {
        setOpenDialog(false)
        window.history.back();
    }

    const buildTable = () => {
        let stockJsx = []
        let volumeInitM = 0
        let volumeInitSt = 0
        let stockM = 0
        let stockSt = 0
        let prixInit = 0
        let prixStock = 0
        
        Object.entries(getRefTable()).map(([wood, data], index) => {
            if(getUnit(wood, true) === "St") {
                stockSt += stock[wood] || 0
                volumeInitSt += volumeInit[wood] || 0
            } else {
                stockM += stock[wood] || 0
                volumeInitM += volumeInit[wood] || 0
            }

            prixInit += volumeInit[wood] ? Number((Math.round((volumeInit[wood] * prices[wood]) * 100) / 100).toFixed(2)) : 0
            prixStock += stock[wood] ? Number((Math.round(((Math.round((stock[wood] + Number.EPSILON) * 100) / 100) * prices[wood]) * 100) / 100).toFixed(2)) : 0

            stockJsx.push(
                <TableRow key={wood} hover style={{ backgroundColor: data.color ? data.color : "" }}>
                    <TableCell component="th" scope="row">[{wood}] - {data.name}</TableCell>
                    <TableCell align="right">{volumeInit[wood] ? Math.round((volumeInit[wood] + Number.EPSILON) * 100) / 100+" "+getUnit(wood) : "-"}</TableCell>
                    <TableCell align="right">{stock[wood] ? Math.round((stock[wood] + Number.EPSILON) * 100) / 100+" "+getUnit(wood) : "-"}</TableCell>
                    <TableCell align="right">
                        {prices[wood] ? prices[wood]+" € / "+getUnit(wood, true) : "-"}
                        <IconButton onClick={() => openDialogType(wood)} size="small" className={classes.settingIcon}>
                            <SettingsIcon fontSize="small" />
                        </IconButton>
                    </TableCell>
                    <TableCell align="right">{volumeInit[wood] ? Math.round((volumeInit[wood] * prices[wood] + Number.EPSILON) * 100) / 100 +" €" : "-"}</TableCell>
                    <TableCell align="right">{stock[wood] ? Math.round((stock[wood] * prices[wood] + Number.EPSILON) * 100) / 100 +" €" : "-"}</TableCell>
                </TableRow>
            )
        })

        return [
            <TableBody>
                {stockJsx}
            </TableBody>,
            <TableHead className={classes.tableHead} key="footer">
                <TableRow>
                    <TableCell component="th" scope="row">Total</TableCell>
                    <TableCell align="right">{Math.round((volumeInitSt + Number.EPSILON) * 100) / 100} St<br/>
                        {Math.round((volumeInitM + Number.EPSILON) * 100) / 100} m³</TableCell>
                    <TableCell align="right">{Math.round((stockSt + Number.EPSILON) * 100) / 100} St<br/>
                        {Math.round((stockM + Number.EPSILON) * 100) / 100} m³</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">{(Math.round((prixInit + Number.EPSILON) * 100) / 100)} €</TableCell>
                    <TableCell align="right">{(Math.round((prixStock + Number.EPSILON) * 100) / 100)} €</TableCell>
                </TableRow>
            </TableHead>
        ]
    }

	return (
		<Container maxWidth="lg" className={classes.root}>
            <Hidden smUp>
                <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                    }}
                    autoHideDuration={5000}
                    open={snackbarOpen}
                    message="Attention, affichage du tableau non adapté sur mobile !"
                    action={
                        <Button color="secondary" size="small" onClick={() => {
                            setSnackbarOpen(false)
                        }}>
                            fermer
                        </Button>
                    }
                />
            </Hidden>
            
            <Grid container spacing={2}>
                <Grid item>
                    <Button onClick={() => navigate('/stocks')} color="primary">
                        Revenir au tableau des stocks
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography variant="h6" gutterBottom>Stocks</Typography>
                        <TableContainer component={Paper} variant="outlined">
                            <Table size="small" className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Produit</TableCell>
                                        <TableCell align="right">Volume Initial</TableCell>
                                        <TableCell align="right">Stock</TableCell>
                                        <TableCell align="right">Valeur Unitaire</TableCell>
                                        <TableCell align="right">Valeur Initial</TableCell>
                                        <TableCell align="right">Valeur Stock</TableCell>
                                    </TableRow>
                                </TableHead>
                                {buildTable()}
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>


            {/* Dialog Info Pile*/}
            <Dialog 
                open={openDialog}
                onClose={() => closeDialog()}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Prix bois {currentType}</DialogTitle>
                <DialogContent>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField 
                                    type="number" 
                                    fullWidth
                                    label="Prix"
                                    value={currentPrice}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">€</InputAdornment>,
                                        inputProps: { min: 0, step: ".1"},
                                    }}
                                    onChange={(e) => setCurrentPrice(e.target.value)}/>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => closeDialog()} 
                    color="primary">
                        Annuler
                    </Button>
                    <Button 
                    onClick={() => {
                        closeDialog()
                        dispatchNotification("Le prix a été modifié !")
                    }} 
                    color="primary">
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
		</Container>
	);
}
	
export default StocksPrice