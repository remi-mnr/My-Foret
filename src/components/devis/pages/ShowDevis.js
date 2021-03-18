import React, { useState, useEffect } from 'react';
import { devisDB } from '../../utils/fakeDB';
import { navigate } from "@reach/router"
import { getRefName, 
    getUnit, 
    getBackgroundColor,
    convertTimestampToHumandeDate } from "../../utils/woodtools"

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Hidden from '@material-ui/core/Hidden';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { PDFDownloadLink, StyleSheet } from '@react-pdf/renderer';
import DevisPDF from '../../pdf/devisPDF'
import LiensGPS from '../../chantier/LiensGPS';
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
	tableHead: {
		backgroundColor: "#f1f1f1"
    },
    link: {
        textDecoration: 'none'
    },
}));

const styles = StyleSheet.create({
    link: {
        color: 'black',
        textDecoration: 'none'
    }
});

function ShowDevis(params) {
    const classes = useStyles();
    const [devis, setDevis] = useState(false)
    const [openDialogPDF, setOpenDialogPDF] = useState(false)
    const [openDialogDelete, setOpenDialogDelete] = useState(false)
    
    useEffect(()=> {
        const onHashChange = () => {
            switch(window.location.hash) {
                case "#dialogDelete" :
                    setOpenDialogDelete(true)
                    break;
                default :
                    setOpenDialogDelete(false)
            }
        }
        window.addEventListener("hashchange", onHashChange);

        setDevis(devisDB[params.idDevis]);
        return () => {
            window.removeEventListener("hashchange", onHashChange);
        }
    }, []);

	return (
		<Container maxWidth="lg" className={classes.root}>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={1} alignItems="center">
                            { devis.idDocChantier !== "" ? 
                            <Grid item>
                                <CheckCircleIcon style={{ color: "#f50057" }}/>
                            </Grid> : null}
                            <Grid item xs>
                                <Typography variant="h6" gutterBottom>Devis n°{devis.numeroDevis}</Typography>
                            </Grid>
                        </Grid>
                        
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="subtitle2">Propriétaire</Typography>
                                        <Typography variant="body1">{devis.proprietaire || "-"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="subtitle2">Localisation</Typography>
                                        <Typography variant="body1">{devis.localisation || "-"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="subtitle2">Email</Typography>
                                        <Typography variant="body1">{devis.email || "-"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="subtitle2">Téléphone</Typography>
                                        <Typography variant="body1">{devis.telephone || "-"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Typography variant="subtitle2">Date du Devis</Typography>
                                        <Typography variant="body1">{convertTimestampToHumandeDate(devis.date) || "-"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Grid container spacing={1} alignItems="center">
                                            {devis.pefc ? 
                                            <Grid item><CheckCircleIcon fontSize="small" /></Grid> :
                                            <Grid item><CancelIcon fontSize="small"/></Grid>}
                                            <Grid item><Typography variant="subtitle2">PEFC</Typography></Grid>
                                        </Grid>
                                        {devis.pefc ? 
                                        <Typography variant="body1">{devis.codePefc || "-"}</Typography> : ""}
                                        
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <LiensGPS latitude={devis.latitude} longitude={devis.longitude} lienMaps={devis.lienMaps}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="subtitle2">Servitude / Depôt</Typography>
                                        <Typography variant="body1">{devis.servitude || "-"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="subtitle2">Délais</Typography>
                                        <Typography variant="body1">{devis.delais || "-"}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="subtitle2">Observations</Typography>
                                        <Typography variant="body1">{devis.observations || "-"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle2">Condition d'achat</Typography>
                                        <Typography variant="body1">{devis.condition || "-"}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>


                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>Produits</Typography>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small" aria-label="a dense table">
                                        <TableHead className={classes.tableHead}>
                                            <TableRow>
                                                <TableCell component="th" scope="row">Produit</TableCell>
                                                <TableCell align="right">Prix HT</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {devis.produits && devis.produits.map((bois, index) => {
                                                return (
                                                    <TableRow key={index} style={{ backgroundColor: getBackgroundColor(bois.type) }}>
                                                        <TableCell component="th" scope="row">
                                                            <span>[{bois.type}] - {getRefName(bois.type)}<br/><i>{bois.cahierDesCharges}</i></span>
                                                        </TableCell>
                                                        {bois.isPrixGlobal ? <TableCell align="right">{bois.prixUnitaireHT} €</TableCell> :
                                                        <TableCell align="right">{bois.prixUnitaireHT} € / {getUnit(bois.type, true)}</TableCell>}
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid container item justify="flex-end" xs={12} spacing={1}>
                                <Grid item>
                                    <Button startIcon={<PictureAsPdfIcon />} variant="contained" color="primary" disableElevation onClick={() => setOpenDialogPDF(true)}>PDF</Button>
                                </Grid>
                                <Grid item>
                                    {devis.idDocChantier !== "" ? 
                                    <Button variant="outlined" color="primary" disabled>Modifier</Button> : 
                                    <Button variant="outlined" color="primary" onClick={() => navigate('/edit-devis/'+params.idDevis)}>Modifier</Button>}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} container justify="flex-end" spacing={1}>
                    {devis.idDocChantier !== "" ?
                        null :
                        <Grid item>
                            <Button color="primary" startIcon={null} variant="outlined" onClick={() => {
                                window.location.hash = "#dialogDelete";
                            }}>Supprimer</Button>
                        </Grid>}
                    {devis.idDocChantier !== "" ?
                    <Grid item>
                        <Button color="secondary" startIcon={null} variant="contained" onClick={() => {navigate('/show-chantier/'+devis.idDocChantier)}}>Consulter le Chantier</Button>
                    </Grid> :
                    <Grid item>
                        <Button color="primary" startIcon={null} variant="contained" onClick={() => {navigate('/chantier-from-devis/'+params.idDevis)}}>Transformer en Chantier</Button>
                    </Grid>}
                </Grid>
            </Grid>


            {/* Dialog Download */}
            <Dialog 
                open={openDialogPDF} 
                onClose={() => {setOpenDialogPDF(false)}}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Devis PDF</DialogTitle>
                <DialogContent>
					{devis != false ? (
						<PDFDownloadLink document={<DevisPDF devis={devis} />} fileName={"Devis "+devis.numeroDevis+" - "+devis.proprietaire+".pdf"} style={styles.link}>
							{({ _blob, _url, loading, _error }) => (loading ? ( <CircularProgress /> ) : (<Button variant="contained" color="primary" onClick={() => setOpenDialogPDF(false)}>Télécharger le PDF</Button>) )}
						</PDFDownloadLink> 
					) : ""}
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => {setOpenDialogPDF(false)}}
                    color="primary">
                        Annuler
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog Delete */}
            <Dialog 
                open={openDialogDelete}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Supprimer le Devis</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Voulez-vous vraiment supprimer de Devis ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => {setOpenDialogDelete(false); window.history.back()}}
                    color="primary">
                        Annuler
                    </Button>
                    <Button 
                    onClick={() => {
                        setOpenDialogDelete(false)
                        navigate('/liste-devis')
                        dispatchNotification("Le devis a été supprimé !")
                    }}
                    color="primary">
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>

		</Container>
	);
}
	
export default ShowDevis