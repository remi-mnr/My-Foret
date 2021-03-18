import React, { useState, useEffect } from 'react';
import { getCoupeurs,
	getDebardeurs,
	isCoupeur,
	isDebardeur } from "../../utils/woodtools"
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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import ListeDeChantiers from '../ListeDeChantiers';
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
	title: {
		fontWeight: 500,
        marginBottom: '6px',
	},
	link: {
        textDecoration: 'none'
	},
	cardHead: {
		backgroundColor: "#ededed"
	},
	marginButton: {
		marginLeft: '12px'
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

function SearchChantiers() {
	const classes = useStyles();
	const [chantiers, setChantiers] = useState([]);
	const [stocks, setStocks] = useState([]);

	const [proprietaire, setProprietaire] = React.useState("");
	const [selectCoupeur, setSelectCoupeur] = React.useState("");
    const [coupeur, setCoupeur] = React.useState("");
    const [selectDebardeur, setSelectDebardeur] = React.useState("");
    const [debardeur, setDebardeur] = React.useState("");
	const [autre, setAutre] = React.useState("");

	const [loading, setLoading] = React.useState(false);
	const [noResult, setNoResult] = React.useState(false);

	const location = useLocation();
	
	useEffect(() => {
		setFormFromUrl()
	}, []);

	const setFormFromUrl = () => {
		let urlProprietaire = parse(location.search).proprietaire
		let urlCoupeur = parse(location.search).coupeur
		let urlDebardeur = parse(location.search).debardeur
		let urlAutre = parse(location.search).autre

		if(urlProprietaire && urlProprietaire !== "") {
			setProprietaire(urlProprietaire)
		}

		if(urlCoupeur) {
			if(isCoupeur(urlCoupeur)) {
				setSelectCoupeur(urlCoupeur)
			} else {
				if(urlCoupeur !== "") {
					setSelectCoupeur("autre")
					setCoupeur(urlCoupeur)
				}
			}
		}

		if(urlDebardeur) {
			if(isDebardeur(urlDebardeur)) {
				setSelectDebardeur(urlDebardeur)
			} else {
				if(urlDebardeur !== "") {
					setSelectDebardeur("autre")
					setDebardeur(urlDebardeur)
				}
			}
		}

		if(urlAutre && urlAutre !== "") {
			setAutre(urlAutre)
		}
	}

	const search = () => {
		dispatchNotification("Recherche désactivée en mode démo !")
	}

	const getUrlSearch = () => {
		let search = {}
		if(proprietaire !== "") search["proprietaire"] = proprietaire
		if(selectCoupeur === "autre") {
			if(coupeur !== "") search["coupeur"] = coupeur
		} else {
			if(selectCoupeur !== "") search["coupeur"] = selectCoupeur
		}
		if(selectDebardeur === "autre") {
			if(debardeur !== "") search["debardeur"] = debardeur
		} else {
			if(selectDebardeur !== "") search["debardeur"] = selectDebardeur
		}
		if(autre !== "") search["autre"] = autre
		
		let url = ""
		url += "proprietaire="+(search["proprietaire"] || "").replaceAll("&", "%26")+"&"
		url += "coupeur="+(search["coupeur"] || "").replaceAll("&", "%26")+"&" 
		url += "debardeur="+(search["debardeur"] || "").replaceAll("&", "%26")+"&"
		url += "autre="+(search["autre"] || "").replaceAll("&", "%26")
		
		return url
	}
	
	return (
		<Container maxWidth="lg" className={classes.root}>

			<Hidden smUp>
				<Fab size="medium" aria-label="add" className={classes.fabSearch} onClick={() => navigate('/liste-chantiers')}>
					<CloseIcon />
				</Fab>
			</Hidden>
			<Hidden xsDown>
				<Fab aria-label="search" className={classes.fabSearch} onClick={() => navigate('/liste-chantiers')}>
					<CloseIcon />
				</Fab>
			</Hidden>

			<Hidden smUp>
				<Fab color="secondary" size="medium" aria-label="add" className={classes.fab} onClick={() => navigate('/new-chantier')}>
					<AddIcon />
				</Fab>
			</Hidden>
			<Hidden xsDown>
				<Fab color="secondary" aria-label="add" className={classes.fab} onClick={() => navigate('/new-chantier')}>
					<AddIcon />
				</Fab>
			</Hidden>

			<Grid container spacing={3} justify="space-around">

				{/* Search bar */}
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Typography variant="h6" className={classes.title}>Paramètres de recherche</Typography>
						<Grid container spacing={2}>

							<Grid item xs={12}>
								<TextField fullWidth label="Propriétaire" value={proprietaire} onChange={(e) => setProprietaire(e.target.value)}/>
							</Grid>

							<Grid item xs={12} sm={4} container spacing={2}>
								<Grid item xs={12} sm lg={12}>
									<FormControl fullWidth>
										<InputLabel>Coupeur</InputLabel>
										<Select
											native
											name="Coupeur"
											value={selectCoupeur}
											onChange={(e) => setSelectCoupeur(e.target.value)}
											>
												<option value="" />
												{getCoupeurs().map((coupeur, index) => {
													return <option key={index} value={coupeur} default>{coupeur}</option>
												})}
												<option value="autre">Autre</option>
										</Select>
									</FormControl>
								</Grid>
								{selectCoupeur === "autre" && 
								[<Grid key={1} item xs={12}>
									<TextField fullWidth label="Nom du Coupeur" value={coupeur} onChange={(e) => setCoupeur(e.target.value)}/>
								</Grid>,
								<Hidden key={2}smUp>
									<Grid item xs={12}>
										<Divider/>
									</Grid>
								</Hidden>]}
							</Grid>

							<Grid item xs={12} sm={4} container spacing={2}>
								<Grid item xs={12}>
									<FormControl fullWidth>
										<InputLabel>Débardeur</InputLabel>
										<Select
											native
											name="Debardeur"
											value={selectDebardeur}
											onChange={(e) => setSelectDebardeur(e.target.value)}
											>
												<option value="" />
												{getDebardeurs().map((debardeur, index) => {
													return <option key={index} value={debardeur} default>{debardeur}</option>
												})}
												<option value="autre">Autre</option>
										</Select>
									</FormControl>
								</Grid>
								{selectDebardeur === "autre" && 
								[<Grid key={1} item xs={12}>
									<TextField fullWidth label="Nom du Debardeur" value={debardeur} onChange={(e) => setDebardeur(e.target.value)}/>
								</Grid>,
								<Hidden key={2} smUp>
									<Grid item xs={12}>
										<Divider/>
									</Grid>
								</Hidden>]}
							</Grid>

							<Grid item xs={12} sm={4}>
								<TextField fullWidth label="Autre" value={autre} onChange={(e) => setAutre(e.target.value)}/>
							</Grid>

							<Grid item xs={12} container justify="flex-end">
								<Button onClick={() => {
									navigate('/search-chantiers?'+getUrlSearch());
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


				{chantiers && 
				<ListeDeChantiers chantiers={chantiers} stocks={stocks} />}

			</Grid>
		</Container>
	);
}

export default SearchChantiers

