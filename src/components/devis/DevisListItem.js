import React, { useState, useEffect } from 'react';
import { convertTimestampToHumandeDate } from "../utils/woodtools"
import { navigate } from "@reach/router"

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

/**
 * @param {object} devis liste brute de firebase
 * @param {string} idDoc id doc firebase 
 */
function DevisListItem(props) {

	return (
        <Grid item xs={12} sm={11} lg={7}>
            <Card elevation={1}
            style={props.devis.idDocChantier ? {borderLeft: "4px solid #f50057"} : {borderLeft: "4px solid #1a8e56"}}>
                <CardContent>
                    <Grid container justify="space-between">
                        <Grid item xs>
                            
                            <Typography variant="h6" component="h2">
                                {props.devis.numeroDevis} | {props.devis.proprietaire}
                            </Typography>
                            <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                                {props.devis.localisation} - {convertTimestampToHumandeDate(props.devis.date)}
                            </Typography>
                        </Grid>
                        <Grid item>
                            { props.devis.idDocChantier ? <CheckCircleIcon style={{ color: "#f50057" }}/>  : null}
                        </Grid>
                    </Grid>
                </CardContent>

                <CardActions>
                    {/* <Button size="small" color="primary">ajouter sortie</Button> className={classes.marginButton}*/}
                    <Button size="small" color="primary" onClick={() => navigate('/show-devis/'+props.idDoc)}>Consulter</Button>
                    { props.devis.idDocChantier ? <Button size="small" color="secondary" onClick={() => navigate('/show-chantier/'+props.devis.idDocChantier)}>Voir chantier</Button>  : null}
                </CardActions>
            </Card>
        </Grid>
	);
}

export default DevisListItem;
		