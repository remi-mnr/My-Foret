import React, { useState, useEffect } from 'react';
import { navigate } from "@reach/router"
import {convertTimestampToHumandeDate} from "../utils/woodtools"
import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
//Icons
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
//Dialog
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ReceptionChantierPDF from '../pdf/ReceptionChantierPDF'
import ContratAchatPDF from '../pdf/ContratAchatPDF'
import LiensGPS from './LiensGPS';
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
}));

const styles = StyleSheet.create({
    link: {
        color: 'black',
        textDecoration: 'none'
    }
});

function InfosChantier( props ) {
    const classes = useStyles();
    const [openDialogReceptionPDF, setOpenDialogReceptionPDF] = useState(false)
    const [openDialogAchatPDF, setOpenDialogAchatPDF] = useState(false)
    
    const [openDialogPreDelete, setOpenDialogPreDelete] = useState(window.location.hash === "#dialogPreDelete")
    const [openDialogDeleteDevis, setOpenDialogDeleteDevis] = useState(window.location.hash === "#dialogDeleteDevis")
    const [isDeleteDevis, setIsDeleteDevis] = useState(false)
    const [openDialogDelete, setOpenDialogDelete] = useState(window.location.hash === "#dialogDelete")

    useEffect(()=> {
        const onHashChange = () => {
            switch(window.location.hash) {
                case "#dialogPreDelete" :
                    setOpenDialogPreDelete(true) //
                    setOpenDialogDeleteDevis(false)
                    setOpenDialogDelete(false)
                    break;
                case "#dialogDeleteDevis" :
                    setOpenDialogPreDelete(false)
                    setOpenDialogDeleteDevis(true) //
                    setOpenDialogDelete(false)
                    break;
                case "#dialogDelete" :
                    setOpenDialogPreDelete(false)
                    setOpenDialogDeleteDevis(false)
                    setOpenDialogDelete(true) //
                    break;
                default :
                    setOpenDialogPreDelete(false)
                    setOpenDialogDeleteDevis(false)
                    setOpenDialogDelete(false)
            }
        }
        window.addEventListener("hashchange", onHashChange);

        return () => {
            window.removeEventListener("hashchange", onHashChange);
        }
    }, []);

	return (
        <Paper className={classes.paper}>
            <Grid container spacing={1} alignItems="center">
                { props.chantier.soldOut ? 
                <Grid item>
                    <CheckCircleIcon style={{ color: "#f50057" }}/>
                </Grid> : null}
                <Grid item xs>
                    <Typography variant="h6" gutterBottom>Chantier {props.chantier.numeroChantier}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2">Propriétaire</Typography>
                            <Typography variant="body1">{props.chantier.proprietaire || "-"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2">Localisation</Typography>
                            <Typography variant="body1">{props.chantier.localisation || "-"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2">Téléphone</Typography>
                            <Typography variant="body1">{props.chantier.telephone || "-"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2">Email</Typography>
                            <Typography variant="body1">{props.chantier.email || "-"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="subtitle2">Date du chantier</Typography>
                            <Typography variant="body1">{convertTimestampToHumandeDate(props.chantier.date) || "-"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Grid container spacing={1} alignItems="center">
                                {props.chantier.pefc ? 
                                <Grid item><CheckCircleIcon fontSize="small" style={{"marginTop": "3px"}}/></Grid> :
                                <Grid item><CancelIcon fontSize="small" style={{"marginTop": "3px"}}/></Grid>}
                                <Grid item><Typography variant="subtitle2">PEFC</Typography></Grid>
                            </Grid>
                            {props.chantier.pefc ? 
                            <Typography variant="body1">{props.chantier.codePefc || "-"}</Typography> : ""}
                        </Grid>
                        {props.chantier.numeroDevis ? <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="body1">
                                <Button variant="outlined"
                                size="small"
                                color="secondary"
                                startIcon={<InsertDriveFileIcon />}
                                onClick={() => navigate('/show-devis/'+props.chantier.idDocDevis)}>Devis n° {props.chantier.numeroDevis || "-"}</Button>
                            </Typography>
                        </Grid> : null}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <LiensGPS latitude={props.chantier.latitude} longitude={props.chantier.longitude} lienMaps={props.chantier.lienMaps}/>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2">Coupeur</Typography>
                            <Typography variant="body1">{props.chantier.coupeur || "-"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2">Débardeur</Typography>
                            <Typography variant="body1">{props.chantier.debardeur || "-"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2">Autre</Typography>
                            <Typography variant="body1">{props.chantier.autre || "-"}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2">Servitude / Dépot</Typography>
                            <Typography variant="body1">{props.chantier.servitude || "-"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2">Délais</Typography>
                            <Typography variant="body1">{props.chantier.delais || "-"}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle2">Observations</Typography>
                            <Typography variant="body1">{props.chantier.observations || "-"}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle2">Condition d'achat</Typography>
                    <Typography variant="body1">{props.chantier.condition || "-"}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider />
                </Grid>

                <Grid container justify="flex-end" item xs={12} spacing={1}>
                    <Grid item>
                        <Button startIcon={<PictureAsPdfIcon />} variant="contained" color="primary" disableElevation onClick={() => setOpenDialogReceptionPDF(true)}>Récpetion Chantier PDF</Button>
                    </Grid>
                    <Grid item>
                        <Button startIcon={<PictureAsPdfIcon />} variant="contained" color="primary" disableElevation onClick={() => setOpenDialogAchatPDF(true)}>Contrat d'Achat PDF</Button>
                    </Grid>
                </Grid>
                <Grid container justify="flex-end" item xs={12} spacing={1}>
                    <Grid item>
                        <Button variant="outlined" color="secondary" onClick={() => {setOpenDialogPreDelete(true);window.location.hash = "#dialogPreDelete";}}>Supprimer</Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" onClick={() => navigate('/edit-chantier/'+props.idDocChantier)}>Modifier</Button>
                    </Grid>
                </Grid>
            </Grid>


            {/* Dialog RECEPTION */}
            <Dialog 
                open={openDialogReceptionPDF} 
                onClose={() => {setOpenDialogReceptionPDF(false)}}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Réception chantier PDF</DialogTitle>
                <DialogContent>
                    <Grid container justify="center">
                        <Grid item>
                            {(props.chantier && props.chantier) != false ? (
                                <PDFDownloadLink document={<ReceptionChantierPDF chantier={props.chantier} piles={props.piles} />} fileName={"Réception Chantier "+props.chantier.numeroChantier+" - "+props.chantier.proprietaire+".pdf"} style={styles.link}>
                                    {({ _blob, _url, loading, _error }) => (loading ? ( <CircularProgress /> ) : (<Button fullWidth variant="contained" color="primary" onClick={() => setOpenDialogReceptionPDF(false)}>Télécharger le PDF</Button>) )}
                                </PDFDownloadLink> 
                            ) : ""}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => {setOpenDialogReceptionPDF(false)}}
                    color="primary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog ACHAT */}
            <Dialog 
                open={openDialogAchatPDF} 
                onClose={() => {setOpenDialogAchatPDF(false)}}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Contrat d'achat PDF</DialogTitle>
                <DialogContent>
                    <Grid container justify="center">
                        <Grid item>
                            {(props.chantier && props.chantier) != false ? (
                                <PDFDownloadLink document={<ContratAchatPDF chantier={props.chantier} piles={props.piles} />} fileName={"Contrat d'Achat "+props.chantier.numeroChantier+" - "+props.chantier.proprietaire+".pdf"} style={styles.link}>
                                    {({ _blob, _url, loading, _error }) => (loading ? ( <CircularProgress /> ) : (<Button fullWidth variant="contained" color="primary" onClick={() => setOpenDialogAchatPDF(false)}>Télécharger le PDF</Button>) )}
                                </PDFDownloadLink> 
                            ) : ""}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => {setOpenDialogAchatPDF(false)}}
                    color="primary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog DELETE CHANTIER  */}
            <Dialog 
                open={openDialogPreDelete}
                aria-labelledby="form-dialog-title">
                <DialogTitle>Suppression du chantier {props.chantier.numeroChantier}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Voulez-vous vraiment supprimer toutes les données de ce chantier ? Cette action est irréversible.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                    // onClick={() => {setOpenDialogDelete(false); window.history.back()}} 
                    color="primary"
                    onClick={() => {
                        setOpenDialogPreDelete(false);
                        window.history.back();
                    }}>
                        Annuler
                    </Button>
                    <Button 
                    onClick={() => {
                        setOpenDialogPreDelete(false);
                        if(props.chantier.idDocDevis) {
                            window.location.hash = "#dialogDeleteDevis"
                        } else {
                            setIsDeleteDevis(false)
                            window.location.hash = "#dialogDelete"
                        }
                    }} 
                    color="primary">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog 
                open={openDialogDeleteDevis}
                aria-labelledby="form-dialog-title">
                <DialogTitle>Suppression du devis {props.chantier.numeroChantier}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Voulez-vous supprimer le devis associé au chantier {props.chantier.numeroChantier} ? Cette action peut être faite plus tard en accédant au devis.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => {setIsDeleteDevis(false); window.location.hash = "#dialogDelete"}} 
                    color="primary">
                        Ignorer
                    </Button>
                    <Button 
                    onClick={() => {setIsDeleteDevis(true); setOpenDialogDeleteDevis(false); window.location.hash = "#dialogDelete"}} 
                    color="primary">
                        Supprimer le devis
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog 
                open={openDialogDelete}
                aria-labelledby="form-dialog-title">
                <DialogTitle>Suppression du chantier {props.chantier.numeroChantier}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vous allez supprimer le chantier {props.chantier.numeroChantier || ""}{isDeleteDevis ? " ainsi que le devis associé" : ""}. Veuillez valider la suppression.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => {
                        setOpenDialogPreDelete(false)
                        setOpenDialogDeleteDevis(false)
                        setOpenDialogDelete(false)
                        navigate('/show-chantier/'+props.idDocChantier)
                    }}
                    color="primary">
                        Annuler
                    </Button>
                    <Button 
                    onClick={() => {
                        setOpenDialogDelete(false);
                        navigate('/liste-chantiers')
                        dispatchNotification("Le chantier a été supprimé !")
                    }} 
                    color="primary">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
	);
}
	
export default InfosChantier