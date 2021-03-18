import React , { useEffect, useState } from "react"
import { navigate, Location } from "@reach/router"
import { makeStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Appbar from "./Appbar";
import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(2),
            paddingLeft: '0px',
            paddingRight: '0px',
        },
	}
}));

const Layout = ({ children }) => {
	const classes = useStyles();
	const [openDrawer, setOpenDrawer] = useState(false);

    return (
		<div className={classes.root}>
			<CssBaseline />
			<Location>
				{({location}) => (
					<Appbar location={location} showDrawer={(e) => setOpenDrawer(e)} />
				)}
			</Location>

			<Drawer openDrawer={openDrawer} setOpenDrawer={(e) => setOpenDrawer(e)}/>

			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</div>
    )
}
export default Layout
