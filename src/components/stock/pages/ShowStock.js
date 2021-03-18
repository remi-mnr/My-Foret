import React, { useState, useEffect } from 'react';
import { stocksDB } from '../../utils/fakeDB';
import { navigate } from "@reach/router"
import { getUnit } from "../../utils/woodtools"

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableFooter from '@material-ui/core/TableFooter';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';


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
    },
    tableRow: {
        cursor: 'pointer',
        borderBottomColor: "#f1f1f1"
    }
}));

function ShowStock(params) {
    const classes = useStyles();
    const refBois = params.refBois
    const [stock, setStock] = useState(false)

    useEffect(()=> {
        let docs = [];
        Object.entries(stocksDB).map(([chantier, stocks]) => {
            Object.entries(stocks).map(([key, value]) => {
                if (key === refBois) {
                    docs.push({
                        idDoc: chantier,
                        ...value
                    })
                }
            })
        })
        docs.sort(compare)
        setStock(docs)
    }, []);

    const buildStockTable = () => {
        let VolumeInitial = 0
        let AvailableVolume = 0
        let unit = getUnit(refBois)
        let stockJsx = []
        stock && stock.map((chantier,index) => {
            VolumeInitial += Number(chantier.volumeInitial)
            AvailableVolume += Number(chantier.stock)
            stockJsx.push(
                <TableRow key={chantier.idDoc} className={classes.tableRow} hover onClick={() => navigate("/show-chantier/"+chantier.idDoc)}>
                    <TableCell style={chantier.stock>0 ? {fontWeight: 'bold'}:null} component="th" scope="row">{chantier.numeroChantier} | {chantier.proprietaire}</TableCell>
                    <TableCell style={chantier.stock>0 ? {fontWeight: 'bold'}:null} align="right">{chantier.volumeInitial || "0"} {getUnit(chantier.type, true)}</TableCell>
                    <TableCell style={chantier.stock>0 ? {fontWeight: 'bold'}:null} align="right">{chantier.stock} {getUnit(chantier.type, true)}</TableCell>
                </TableRow>
            )
        })

        return [
            <TableBody key="body">
                {stockJsx}
            </TableBody>,
            <TableFooter className={classes.tableHead} key="footer">
                <TableRow>
                    <TableCell component="th" scope="row">Total</TableCell>
                    <Hidden smUp>
                        <TableCell align="right">{((Math.round((VolumeInitial) * 100) / 100) % 1 ) === 0 ?
													(Math.round((VolumeInitial) * 100) / 100) :
													(Math.round((VolumeInitial) * 100) / 100).toFixed(2) +" "+ getUnit(refBois, true)}</TableCell>
                        <TableCell align="right">{((Math.round((AvailableVolume) * 100) / 100) % 1 ) === 0 ?
													(Math.round((AvailableVolume) * 100) / 100) :
													(Math.round((AvailableVolume) * 100) / 100).toFixed(2) +" "+ getUnit(refBois, true)}</TableCell>
                    </Hidden>
                    <Hidden xsDown>
                        <TableCell align="right">{((Math.round((VolumeInitial) * 100) / 100) % 1 ) === 0 ?
													(Math.round((VolumeInitial) * 100) / 100) :
													(Math.round((VolumeInitial) * 100) / 100).toFixed(2) +" "+ unit}</TableCell>
                        <TableCell align="right">{((Math.round((AvailableVolume) * 100) / 100) % 1 ) === 0 ?
													(Math.round((AvailableVolume) * 100) / 100) :
													(Math.round((AvailableVolume) * 100) / 100).toFixed(2) +" "+ unit}</TableCell>
                    </Hidden>
                </TableRow>
            </TableFooter>
        ]
    }

	return (
		<Container maxWidth="lg" className={classes.root}>

            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant="h6">Stock {refBois}</Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead className={classes.tableHead}>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Chantier</TableCell>
                                                <TableCell align="right">Volume Initial</TableCell>
                                                <TableCell align="right">Stock</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {buildStockTable()}
                                    </Table>
                                </TableContainer>
                            </Grid>

                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

		</Container>
	);
}
	
export default ShowStock


function compare(a, b) {
    const stockA = a.stock;
    const stockB = b.stock;

    //compare stock
    if (stockA > stockB) {
        return -1
    } else if (stockA < stockB) {
        return 1
    } else {
        //compare numero
        const numA = Number(a.date)
        const numB = Number(b.date)
        if (numA > numB) {
            return -1
        } else if (numA < numB) {
            return 1
        } else {
            return 0
        }
    }
}