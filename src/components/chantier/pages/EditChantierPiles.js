import React, { useState, useEffect } from 'react';
import {chantiersDB, devisDB, pilesDB} from '../../utils/fakeDB';
import { navigate } from "@reach/router"
import {getVolumePileWithCotes} from "../../utils/woodtools"

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

import FormPiles from '../FormPiles.js'
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
    title: {
        marginBottom: '15px',
    },
}));

function EditChantierPiles(params) {
    const classes = useStyles();

    const [numeroChantier, setNumeroChantier] = React.useState("");
    const [listeBois, setListeBois] = React.useState([]);

    const [idDocDevis, setIdDocDevis] = React.useState("");
    const [docChantierRecieved, setDocChantierRecieved] = React.useState(false);
    const [docPilesRecieved, setDocPilesRecieved] = React.useState(false);

    useEffect(()=> {
        //chantier
        let data = chantiersDB[params.idChantier]
        setNumeroChantier(data.numeroChantier)
        setIdDocDevis(data.idDocDevis)
        setDocChantierRecieved(true)

        setPilesTest(pilesDB[params.idChantier])
        setDocPilesRecieved(true)

    }, []);
    
    const setPilesTest = (docs) => {
        let piles = []
        Object.entries(docs).map(([key, value]) => {
            piles.push({
                ...value
            })
        })
        
        //sort by categorie
        let oldListeBois = [] //list recup from firebase
        piles.map((pile) => {
            let found = false
            oldListeBois.map((categorie, i) => {
                if(categorie.type === pile.type){
                    found = true
                    //add pile
                    oldListeBois[i].piles.push(pile)
                }
            })
            if(found === false) {
                //new type de bois
                oldListeBois.push({
                    type: pile.type,
                    cahierDesCharges: pile.cahierDesCharges,
                    prixUnitaireHT: pile.prixUnitaireHT,
                    isPrixGlobal: pile.isPrixGlobal,
                    piles : [
                        {...pile}
                    ]
                })
            }
        })

        let newListeBois = [...listeBois] //liste actuelle
        oldListeBois.map((categorie) => {
            newListeBois.map((newListe,i) => {
                if(categorie.type === newListe.type) {
                    newListeBois.splice(i, 1)
                }
            })
            newListeBois.push({...categorie})
        })
        setListeBois(newListeBois)
    }

    useEffect(() => {
        if(docChantierRecieved && docPilesRecieved)
            getDevis()
    }, [docChantierRecieved, docPilesRecieved])

    const getDevis = () => {
        if(idDocDevis !== undefined && devisDB[idDocDevis] !== undefined) {
            let dataDevis = devisDB[idDocDevis]
            let listeBoisDevis = []
            dataDevis.produits.map((produit) => {
                listeBoisDevis.push({
                    ...produit,
                    piles: []
                })
            })

            let newListeBois = [...listeBois]
            listeBoisDevis.map((boisD) => {
                let found = false
                newListeBois.map((bois) => {
                    if(boisD.type === bois.type)
                        found = true
                })
                if(!found) {
                    newListeBois.push({...boisD})
                }
            })
            setListeBois(newListeBois)
        }
    }

    
	return (
		<Container maxWidth="lg" className={classes.root}>
            <form onSubmit={(e) => {
                    e.preventDefault();
                    navigate(-1);
                    dispatchNotification("Le chantier a été modifié !")
                }}>
                <Grid container spacing={2}>

                    {/* BOIS */}
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h6" className={classes.title}>Réception chantier - Chantier {numeroChantier}</Typography>

                            <FormPiles listeBois={listeBois} getListeBois={(e) => setListeBois(e)}/>

                        </Paper>
                    </Grid>


                    <Grid item xs={12}>
                        <Grid container justify="flex-end">
                            <Button color="primary" type="submit" startIcon={<DoneIcon />} variant="contained">Valider les modifications</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </form>
		</Container>
	);
}
	
export default EditChantierPiles