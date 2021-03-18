import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"
import { sortStackByCategory, getRefName, getUnit, getRefTable, getVolumePileWithCotes } from "../utils/woodtools"

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
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
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InfoIcon from '@material-ui/icons/Info';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import ButtonBase from '@material-ui/core/ButtonBase';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import Hidden from '@material-ui/core/Hidden';
import { FiberSmartRecordSharp, WhereToVote } from '@material-ui/icons';
import { Box } from '@material-ui/core';

import faker from "faker"

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

function DebugPage(params) {
    const classes = useStyles();

    const randomChantier = (numeroChantier, i) => {
        faker.locale = "fr"
        let pefc = faker.random.boolean()
        return {
            autre: Math.random() > 0.6 ? faker.name.findName() : "",
            codePefc: pefc ? faker.random.number() : "",
            condition: faker.lorem.sentence(),
            coupeur: faker.name.findName(),
            date: 1590000000+(i*100000),
            debardeur: faker.name.findName(),
            delais: faker.lorem.sentence(),
            email: faker.internet.email(),
            latitude: faker.address.latitude(),
            lienMaps: "",
            localisation: faker.address.streetAddress(),
            longitude: faker.address.longitude(),
            numeroChantier: numeroChantier,
            observations: Math.random() > 0.7 ? faker.lorem.sentence() : "",
            pefc: pefc,
            proprietaire: faker.name.findName(),
            servitude: faker.lorem.sentence(),
            soldOut: false,
            telephone: faker.phone.phoneNumber()
        }
    }

    const randomPile = (numeroChantier, date, numeroPile, type, cdc, puHT, isPrixGlobal) => {
        let largeur = faker.random.float({max: 10})
        let longueur = faker.random.float({max: 10})
        let hauteur = faker.random.float({max: 10})
        let volume = Math.round((getVolumePileWithCotes(longueur, largeur, hauteur, type) + Number.EPSILON) * 100) / 100
        return {
            cahierDesCharges: cdc,
            commentaire: Math.random() > 0.7 ? faker.lorem.sentence() : "",
            date: date,
            hauteur: hauteur,
            isPrixGlobal: isPrixGlobal,
            largeur: largeur,
            longeur: longueur,
            numeroChantier: numeroChantier,
            numeroPile: numeroPile,
            prixUnitaireHT: puHT,
            soldOut: false,
            type: type,
            volume: volume
        }
    }

    const randomStock = (type, cdc, puHT, isPrixGlobal,date, proprietaire, numeroChantier, volume) => {
        return {
            type: type,
            cahierDesCharges: cdc,
            prixUnitaireHT: puHT,
            isPrixGlobal: isPrixGlobal,
            volumeInitial: Math.round((volume + Number.EPSILON) * 100) / 100,
            stock: Math.round((volume + Number.EPSILON) * 100) / 100,
            factures: {},
            numeroChantier: numeroChantier,
            proprietaire: proprietaire,
            date: date,
        }
    }

    const randomDevis = (numeroDevis, i) => {
        let produits = [];
        [...Array(Math.floor(Math.random() * 4)+1)].map((e, j) => { //types
            let refTable = getRefTable()
            let key = Math.floor(Math.random() * 33)+1
            let type = Object.keys(refTable)[key]
            let cdc = refTable[type].cahierDesCharges;
            produits.push({
                cahierDesCharges: cdc,
                isPrixGlobal: Math.random() > 0.7 ? true : false,
                prixUnitaireHT: faker.random.float({max: 20}),
                type: type
            })
        })

        let pefc = faker.random.boolean()
        return {
            numeroDevis: numeroDevis,
            produits: produits,
            idDocChantier: "",

            autre: Math.random() > 0.6 ? faker.name.findName() : "",
            codePefc: pefc ? faker.random.number() : "",
            condition: faker.lorem.sentence(),
            coupeur: faker.name.findName(),
            date: 1590000000+(i*100000),
            debardeur: faker.name.findName(),
            delais: faker.lorem.sentence(),
            email: faker.internet.email(),
            latitude: faker.address.latitude(),
            lienMaps: "",
            localisation: faker.address.streetAddress(),
            longitude: faker.address.longitude(),
            observations: Math.random() > 0.7 ? faker.lorem.sentence() : "",
            pefc: pefc,
            proprietaire: faker.name.findName(),
            servitude: faker.lorem.sentence(),
            soldOut: false,
            telephone: faker.phone.phoneNumber()
        }
    }

    const randomePriceTable = () => ({
        "CHAPE" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHABS" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHAGS" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHAPI" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHAGP" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHAME" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHABI" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHAGR" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHEPE" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHECA" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHETV" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHETR" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHECH" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHEAV" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHEME" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHPET" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHCAL" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "PINPA" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "PINCA" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "PINCS" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "PINME" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "PINTV" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "PEPAL" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "PESCI" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "PEDER" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "ACAPT" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "ACAPI" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "ACABI" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHAPA" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "PEPAP" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "ACAPA" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "CHPAP" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "GROPA" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1}),
        "AUTRE" : Math.random() > 0.3 ? faker.random.number({max:15}) : faker.random.float({max: 10, precision: 0.1})
    })

    const randomSeller = (chantiers, stocks, piles) => {
        console.log("RANDOM SELLER")

        let soldChantiers = JSON.parse(JSON.stringify(chantiers))
        let soldStocks = JSON.parse(JSON.stringify(stocks))
        let soldPiles = JSON.parse(JSON.stringify(piles))
        Object.entries(chantiers).map(([idChantier, chantier]) => {
            if (Math.random() > 0.6) { //40% entamés
                if (Math.random() > 0.8) { //20% vides
                    //chantier
                    soldChantiers[idChantier].soldOut = true

                    //stock
                    Object.entries(stocks[idChantier]).map(([type, stockData]) => {
                        soldStocks[idChantier][type].stock = 0
                        soldStocks[idChantier][type].factures[faker.time.recent()] = {
                            before: stockData.stock,
                            after: 0
                        }
                    })

                    //piles
                    Object.entries(piles[idChantier]).map(([idDocPile, pileData]) => {
                        soldPiles[idChantier][idDocPile].soldOut = true
                    })
                    console.log(soldChantiers[idChantier], soldStocks[idChantier], soldPiles[idChantier] )
                    console.error("YAYAYA")
                } else { //entamé
                    //stock
                    Object.entries(stocks[idChantier]).map(([type, stockData]) => {
                        [...Array(Math.floor(Math.random() * 2)+1)].map((e, i) => {
                            let newStock = Math.floor(soldStocks[idChantier][type].stock / 2)
                            soldStocks[idChantier][type].factures[Number(faker.time.recent())+i] = {
                                before: soldStocks[idChantier][type].stock,
                                after: newStock
                            };
                            soldStocks[idChantier][type].stock = newStock
                        })
                    })
                }
            }
        })
        console.log(JSON.stringify(soldChantiers))
        console.log(JSON.stringify(soldStocks))
        console.log(JSON.stringify(soldPiles))
    }

    const fakeDB = () => {
        faker.locale = "fr"
        let chantiers = {}
        let stocks = {}
        let piles = {};
        [...Array(20)].map((e, i) => {
            //chantier
            let numeroChantier = "A-20-"+(i+1)
            let uuid = faker.finance.bitcoinAddress()
            let chantier = randomChantier(numeroChantier, i)
            chantiers[uuid] = chantier;

            //piles
            piles[uuid] = {};
            stocks[uuid] = {};
            let numPile = 1;
            [...Array(Math.floor(Math.random() * 4)+1)].map((e, j) => { //types
                let refTable = getRefTable()
                let key = Math.floor(Math.random() * 32)+1
                let type = Object.keys(refTable)[key]
                let cdc = refTable[type].cahierDesCharges;
                let puHT = faker.random.float({max: 20})
                let isPrixGlobal = Math.random() > 0.7 ? true : false;
                let volumeGlobal = 0;
                [...Array(Math.floor(Math.random() * 3)+1)].map((e, k) => { //piles par types
                    let pile = randomPile(numeroChantier, chantier.date, numPile, type, cdc, puHT, isPrixGlobal)
                    volumeGlobal += pile.volume
                    piles[uuid][faker.finance.bitcoinAddress()] = pile
                    numPile++
                })
                stocks[uuid][type] = randomStock(type, cdc, puHT, isPrixGlobal, chantier.date, chantier.proprietaire, numeroChantier, volumeGlobal)
            })
        })
    
        //devis
        let devis = {};
        [...Array(20)].map((e, i) => {
            let numeroDevis = "A-"+(i+1)
            let uuid = faker.finance.bitcoinAddress()
            devis[uuid] = randomDevis(numeroDevis, i)
        })
        
        // console.log(JSON.stringify(chantiers))
        // console.log(JSON.stringify(stocks))
        // console.log(JSON.stringify(piles))
        console.log(JSON.stringify(devis))
        console.log(JSON.stringify(randomePriceTable()))

        randomSeller(chantiers, stocks, piles)
    }

	return (
		<Container maxWidth="lg" className={classes.root}>
            <Box>
                <Button>SAVE ALL FIREBASE</Button>
            </Box>

            <Button onClick={fakeDB} variant="contained" color="primary">Roll</Button>
            

		</Container>
	);
}
	
export default DebugPage
