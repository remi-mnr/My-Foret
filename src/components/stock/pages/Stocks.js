import React, { useState, useEffect } from 'react';
import { stocksDB } from '../../utils/fakeDB';
import { navigate } from "@reach/router"

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TablePapeterie from "../TablePapeterie"
import TableBois from "../TableBois"

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
    }
}));

function Stocks() {
    const classes = useStyles();
    const [volumeInit, setVolumeInit] = useState(false);
    const [stock, setStock] = useState(false);

    useEffect(() => {
        let stock = []
        Object.entries(stocksDB).map(([idChantier, chantiers]) => {
            Object.entries(chantiers).map(([key, value]) => {
                stock.push(value)
            })
        })
        setStockAndVolumeInitial(stock)
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

	return (
		<Container maxWidth="lg" className={classes.root}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TableBois volumeInit={volumeInit} stock={stock} />
                            </Grid>
                            <Grid item xs={12}>
                                <TablePapeterie volumeInit={volumeInit} stock={stock} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item>
                    <Button onClick={() => navigate('/stocks-price')} color="primary">
                        Consulter le tableau des prix
                    </Button>
                </Grid>
                
            </Grid>
		</Container>
	);
}
	
export default Stocks