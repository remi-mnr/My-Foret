import React, { useState, useEffect } from 'react';
import { navigate, useLocation  } from "@reach/router"
import { parse } from "query-string"
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

import ListeDeDevis from '../ListeDeDevis';
import { dispatchNotification } from "../../utils/notification"

const useStyles = makeStyles((theme) => ({
    root: {
		marginBottom: '150px',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '6px',
			paddingRight: '12px',
			marginBottom: '85px',
        },
	},
	paper: {
		padding: '20px',
		[theme.breakpoints.down('xs')]: {
		  padding: '12px 15px'
		}
	},
	fab: {
		position: "fixed",
		bottom: "60px",
		right: "60px",
		zIndex: "999",
		[theme.breakpoints.down('lg')]: {
			bottom: "50px",
			right: "50px",
		},
		[theme.breakpoints.down('md')]: {
			bottom: "40px",
			right: "40px",
		},
		[theme.breakpoints.down('xs')]: {
			bottom: "30px",
			right: "30px",
		},
	},
	fabSearch: {
		position: "fixed",
		bottom: "130px",
		right: "60px",
		zIndex: "999",
		[theme.breakpoints.down('lg')]: {
			bottom: "120px",
			right: "50px",
		},
		[theme.breakpoints.down('md')]: {
			bottom: "110px",
			right: "40px",
		},
		[theme.breakpoints.down('xs')]: {
			bottom: "90px",
			right: "30px",
		},
	}
}));

function SearchDevis() {
	const classes = useStyles();
	const [devis, setDevis] = useState([]);

	const [proprietaire, setProprietaire] = React.useState("");

	const [loading, setLoading] = React.useState(false);
	const [noResult, setNoResult] = React.useState(false);

	const location = useLocation();
	
	useEffect(() => {
		setFormFromUrl()
	}, []);

	const setFormFromUrl = () => {
		let urlProprietaire = parse(location.search).proprietaire

		if(urlProprietaire && urlProprietaire !== "") {
			setProprietaire(urlProprietaire)
		}
	}

	const search = () => {
		dispatchNotification("Recherche désactivée en mode démo !")
	}

	const getUrlSearch = () => {
		let search = {}
		if(proprietaire !== "") search["proprietaire"] = proprietaire

		let url = ""
		url += "proprietaire="+(search["proprietaire"] || "").replaceAll("&", "%26")+"&"
		
		return url
	}
	
	return (
		<Container maxWidth="lg" className={classes.root}>

			<Hidden smUp>
				<Fab size="medium" aria-label="add" className={classes.fabSearch} onClick={() => navigate('/liste-devis')}>
					<CloseIcon />
				</Fab>
			</Hidden>
			<Hidden xsDown>
				<Fab aria-label="search" className={classes.fabSearch} onClick={() => navigate('/liste-devis')}>
					<CloseIcon />
				</Fab>
			</Hidden>

			<Hidden smUp>
				<Fab color="secondary" size="medium" aria-label="add" className={classes.fab} onClick={() => navigate('/new-devis')}>
					<AddIcon />
				</Fab>
			</Hidden>
			<Hidden xsDown>
				<Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => navigate('/new-devis')}>
					<AddIcon />
				</Fab>
			</Hidden>

			<Grid container spacing={3} justify="space-around">

				{/* Search bar */}
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Typography variant="h6" gutterBottom>Paramètres de recherche</Typography>
						<Grid container spacing={2}>

							<Grid item xs={12}>
								<TextField fullWidth label="Propriétaire" value={proprietaire} onChange={(e) => setProprietaire(e.target.value)}/>
							</Grid>

							<Grid item xs={12} container justify="flex-end">
								<Button onClick={() => {
									navigate('/search-devis?'+getUrlSearch());
									search();
								}}
								color="primary" startIcon={<SearchIcon />} variant="contained">Rechercher</Button>
							</Grid>

						</Grid>
					</Paper>
				</Grid>

				{noResult && 
				<Grid item xs={12} container justify="center">
					<Typography variant="body1">Pas de résultats pour cette recherche ...</Typography>
				</Grid>}

				{loading && 
				<Grid item xs={12} container justify="center">
					<CircularProgress />
				</Grid>}


				{devis && 
				<ListeDeDevis devis={devis} />}

			</Grid>
		</Container>
	);
}

export default SearchDevis;

