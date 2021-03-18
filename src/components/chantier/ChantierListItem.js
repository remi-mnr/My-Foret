import React, { useState, useEffect } from 'react';
import { convertTimestampToHumandeDate, getRefName, getUnit, getBackgroundColor } from "../utils/woodtools"
import { navigate } from "@reach/router"
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const useStyles = makeStyles((theme) => ({
	tableHead: {
		backgroundColor: "#f1f1f1"
	},
	collapseButton: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	collapseButtonExpanded: {
		transform: 'rotate(180deg)',
    },
    cardTable : {
        padding: "5px 16px !important",
        [theme.breakpoints.down('xs')]: {
            padding: "5px 10px !important",
        },
    }
}));


/**
 * Insert text at cursor position.
 * @param {object} chantiers liste brute de firebase
 * @param {object} stock
 * @param {string} idDoc id document firebase
 */
function ChantierListItem({ chantier, stock, idDoc }) {
    const classes = useStyles();
    const [openAccordion, setOpenAccordion] = useState(false);

	return (
        <Grid item xs={12} sm={11} lg={7}>
            <Card elevation={openAccordion ? 7 : 1} 
            style={chantier.soldOut ? {borderLeft: "4px solid #f50057"} : {borderLeft: "4px solid #1a8e56"}}>

                <CardContent>
                    <Grid container justify="space-between">
                        {chantier.soldOut ? <Grid item>
                            <CheckCircleIcon style={{ color: "#f50057", fontSize: "1.5rem", margin: "4px 8px 0 0" }}/>
                        </Grid> : null}
                        <Grid item xs>
                            <Typography variant="h6" component="h2">
                                {chantier.numeroChantier} | {chantier.proprietaire}
                            </Typography>
                            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                                {chantier.localisation} - {convertTimestampToHumandeDate(chantier.date)}
                            </Typography>
                        </Grid>
                        <Grid item>
                        {(stock !== undefined) ?
                            <IconButton 
                            className={clsx((openAccordion ? classes.collapseButtonExpanded : ""),  classes.collapseButton )}
                            onClick={() => setOpenAccordion(!openAccordion)}>
                                <ExpandMoreIcon />
                            </IconButton> 
                        : null }
                        </Grid>
                    </Grid>
                </CardContent>

                { (stock !== undefined) ? 
                <Collapse in={openAccordion} unmountOnExit>
                    <CardContent className={classes.cardTable}>
                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                            Stock initial
                        </Typography>
                        <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Produit</TableCell>
                                        <TableCell align="right">Volume Initial</TableCell>
                                        <TableCell align="right">Stock</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {Object.entries(stock).map(([stockType, stockData], i) => (
                                    <TableRow key={i} style={{backgroundColor: getBackgroundColor(stockType)}}>
                                        <TableCell component="th" scope="row">{stockType} -  {getRefName(stockType)}</TableCell>
                                        <TableCell align="right">{stockData.volumeInitial} {getUnit(stockType, true)}</TableCell>
                                        <TableCell align="right">{stockData.stock} {getUnit(stockType, true)}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Collapse>
                : null}

                <CardActions disableSpacing>
                    <Button size="small" color="primary" onClick={() => navigate('/show-chantier/'+idDoc)}>Consulter</Button>
                </CardActions>
            </Card>
        </Grid>
	);
}

export default ChantierListItem;
		