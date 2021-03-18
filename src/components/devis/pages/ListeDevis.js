import React, { useState, useEffect } from 'react';
import { devisDB } from '../../utils/fakeDB';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from "@reach/router"

import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import ListeDeDevis from "../ListeDeDevis"

const useStyles = makeStyles((theme) => ({
    root: {
		marginBottom: '150px',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '6px',
            paddingRight: '12px',
        },
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

function ListeDevis() {
    const classes = useStyles();
	
	return (
		<Container maxWidth="lg" className={classes.root}>

			<Hidden smUp>
				<Fab color="primary" size="medium" aria-label="add" className={classes.fabSearch} onClick={() => navigate('/search-devis')}>
					<SearchIcon />
				</Fab>
			</Hidden>
			<Hidden xsDown>
				<Fab color="primary" aria-label="search" className={classes.fabSearch} onClick={() => navigate('/search-devis')}>
					<SearchIcon />
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

			<ListeDeDevis devis={devisDB} />

		</Container>
	);
}
	
export default ListeDevis