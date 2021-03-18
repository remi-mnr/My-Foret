import React , { useEffect, useState } from "react"
import { navigate } from "@reach/router"

import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import MUIDrawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	drawer: {
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	version: {
		textAlign: "center",
		padding: "20px 10px",
		textDecoration: "underline",
		marginTop: "auto",
		[theme.breakpoints.down('md')]: {
			padding: "10px",
		},
	}
}));

const Drawer = ({ openDrawer , setOpenDrawer }) => {
	const classes = useStyles();
	const [update, setUpdate] = useState(false)

	useEffect(() => {
		const myFunc = () => {
			setUpdate(!update)
		}
		document.addEventListener('loginStatusChange', myFunc, false)
		return () => {
			document.removeEventListener("loginStatusChange", myFunc);
		}
	})

	// MENU BAR
    const makeDrawer = () => {
		return (
			<div>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					<ListItem button key="Stocks" onClick={() => {navigate('/stocks'); setOpenDrawer(false)}}>
						<ListItemIcon><InsertChartIcon /></ListItemIcon>
						<ListItemText primary="Stocks"/>
					</ListItem>
					<ListItem button key="Chantiers" onClick={() => {navigate('/liste-chantiers'); setOpenDrawer(false)}}>
						<ListItemIcon><AssignmentIcon /></ListItemIcon>
						<ListItemText primary="Chantiers"/>
					</ListItem>
					<ListItem button key="Devis" onClick={() => {navigate('/liste-devis'); setOpenDrawer(false)}}>
						<ListItemIcon><InsertDriveFileIcon /></ListItemIcon>
						<ListItemText primary="Devis"/>
					</ListItem>
				</List>
			</div>
		)
	}

	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
		<nav className={classes.drawer}>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Hidden mdUp>
				<SwipeableDrawer
				disableBackdropTransition={!iOS}
				classes={{
					paper: classes.drawerPaper
				}}
				anchor="left"
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
				disableDiscovery={iOS}
				>
					{makeDrawer()}
				</SwipeableDrawer>
			</Hidden>
			<Hidden smDown>
				<MUIDrawer
				classes={{
					paper: classes.drawerPaper
				}}
				variant="permanent"
				open>
					{makeDrawer()}
				</MUIDrawer>
			</Hidden>
			
		</nav>
    )
}
export default Drawer
