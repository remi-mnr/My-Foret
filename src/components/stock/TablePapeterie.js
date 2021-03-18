import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"
import { getRefTable, getUnit, getPapeterieTable } from '../utils/woodtools'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

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
    tableRow: {
        cursor: 'pointer'
    }
}));

function TablePapeterie({ volumeInit, stock }) {
    const classes = useStyles();

    const buildTable = () => {
        let stockJsx = []
        let globalVolume = 0
        let globalStock = 0
        
        Object.entries(getPapeterieTable()).map(([wood, data], index) => {
            if(volumeInit[wood])
                globalVolume += Math.round((volumeInit[wood] + Number.EPSILON) * 100) / 100
            if(stock[wood])
                globalStock += Math.round((stock[wood] + Number.EPSILON) * 100) / 100

            stockJsx.push(
                <TableRow key={wood} hover className={classes.tableRow} style={{ backgroundColor: data.color ? data.color : "" }} onClick={() => navigate("/show-stock/"+wood)}>
                    <Hidden xsDown>
                        <TableCell component="th" scope="row">[{wood}]</TableCell>
                    </Hidden>
                    {/* <Hidden xsDown> */}
                        <TableCell component="th" scope="row">{data.name}</TableCell>
                    {/* </Hidden> */}
                    <Hidden xsDown>
                        <TableCell align="right">{volumeInit[wood] ? Math.round((volumeInit[wood] + Number.EPSILON) * 100) / 100+" "+getUnit(wood) : "-"}</TableCell>
                    </Hidden>
                    <Hidden smUp>
                        <TableCell align="right">{volumeInit[wood] ? Math.round((volumeInit[wood] + Number.EPSILON) * 100) / 100+" "+getUnit(wood, true) : "-"}</TableCell>
                    </Hidden>

                    <Hidden xsDown>
                        <TableCell align="right">{stock[wood] ? Math.round((stock[wood] + Number.EPSILON) * 100) / 100+" "+getUnit(wood) : "-"}</TableCell>
                    </Hidden>
                    <Hidden smUp>
                        <TableCell align="right">{stock[wood] ? Math.round((stock[wood] + Number.EPSILON) * 100) / 100+" "+getUnit(wood, true) : "-"}</TableCell>
                    </Hidden>
                </TableRow>
            )
        })

        return (
            <TableBody>
                {stockJsx}
                <TableRow>
                    <TableCell component="th" scope="row">Total</TableCell>
                    <Hidden xsDown>
                        <TableCell component="th" scope="row"></TableCell>
                    </Hidden>
                    <TableCell align="right">{Math.round((globalVolume + Number.EPSILON) * 100) / 100} St</TableCell>
                    <TableCell align="right">{Math.round((globalStock + Number.EPSILON) * 100) / 100} St</TableCell>
                </TableRow>
            </TableBody>
        )
    }

	return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>Papeterie</Typography>
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small" className={classes.table} aria-label="simple table">
                        {buildTable()}
                    </Table>
                </TableContainer>
            </Grid>

            <Grid item xs={12}>
                <TableContainer component={Paper} variant="outlined">
                    <Table size="small" className={classes.table} aria-label="simple table">
                        <TableBody>
                            <TableRow hover className={classes.tableRow} style={{ backgroundColor: getRefTable()["GROPA"].color ? getRefTable()["GROPA"].color : "" }} onClick={() => navigate("/show-stock/GROPA")}>
                                <Hidden xsDown>
                                    <TableCell component="th" scope="row">[GROPA]</TableCell>
                                </Hidden>
                                <TableCell component="th" scope="row">{getRefTable()["GROPA"].name}</TableCell>
                                <TableCell align="right">{volumeInit["GROPA"] ? Math.round((volumeInit["GROPA"] + Number.EPSILON) * 100) / 100+" "+getUnit("GROPA") : "-"}</TableCell>
                                <TableCell align="right">{stock["GROPA"] ? Math.round((stock["GROPA"] + Number.EPSILON) * 100) / 100+" "+getUnit("GROPA") : "-"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
	);
}
	
export default TablePapeterie