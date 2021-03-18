import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"
import { getUnit, getNormalWoodTable } from '../utils/woodtools'

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

function TableBois({ volumeInit, stock }) {
    const classes = useStyles();

	return (
        <div>
            <Typography variant="h6" gutterBottom>Stocks Bois</Typography>
            <TableContainer component={Paper} variant="outlined">
                <Table size="small" className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <Hidden xsDown>
                                <TableCell>Reference</TableCell>
                            </Hidden>
                            <TableCell>Produit</TableCell>
                            <TableCell align="right">Volume Initial</TableCell>
                            <TableCell align="right">Stock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {Object.entries(getNormalWoodTable()).map(([wood, data], index) => (
                        <TableRow key={wood} hover className={classes.tableRow} style={{ backgroundColor: data.color ? data.color : "" }} onClick={() => navigate("/show-stock/"+wood)}>
                            
                            <Hidden xsDown>
                                <TableCell component="th" scope="row">[{wood}]</TableCell>
                            </Hidden>
                            {/* <Hidden xsDown> */}
                                <TableCell component="th" scope="row">{data.name}</TableCell>
                            {/* </Hidden> */}
                            <TableCell align="right">{volumeInit[wood] ? Math.round((volumeInit[wood] + Number.EPSILON) * 100) / 100+" "+getUnit(wood, true) : "-"}</TableCell>
                            <TableCell align="right">{stock[wood] ? Math.round((stock[wood] + Number.EPSILON) * 100) / 100+" "+getUnit(wood, true) : "-"}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
	);
}
	
export default TableBois