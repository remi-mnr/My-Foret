import React, { useState, useEffect } from 'react';
import { chantiersDB , stocksDB} from '../../utils/fakeDB';
import { navigate } from "@reach/router"

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import ListeDeChantiers from '../ListeDeChantiers';


const useStyles = makeStyles((theme) => ({
    root: {
		marginBottom: '150px',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '6px',
			paddingRight: '12px',
			marginBottom: '85px',
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

function ListeChantiers() {
	const classes = useStyles();
	const [chantiers, setChantiers] = useState([]);
	
	useEffect(() => {
			let docsChantiers = [];
			Object.entries(chantiersDB).map(([key, value]) => {
				docsChantiers.push({
					id: key,
					...value
				})
			})
			
			setChantiers(docsChantiers)
	}, []);
	
	return (
		<Container maxWidth="lg" className={classes.root}>
			
			<Hidden smUp>
				<Fab color="primary" size="medium" aria-label="add" className={classes.fabSearch} onClick={() => navigate('/search-chantiers')}>
					<SearchIcon />
				</Fab>
			</Hidden>
			<Hidden xsDown>
				<Fab color="primary" aria-label="search" className={classes.fabSearch} onClick={() => navigate('/search-chantiers')}>
					<SearchIcon />
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

			<ListeDeChantiers chantiers={chantiers} stocks={stocksDB} />

		</Container>
	);
}

export default ListeChantiers
		