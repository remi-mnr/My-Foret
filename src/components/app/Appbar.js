import React , { useEffect, useState } from "react"
import { navigate, Location } from "@reach/router"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import MUIAppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { dispatchNotification } from "../utils/notification"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('md')]: {
		width: drawerWidth,
		flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('md')]: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
		    display: 'none',
		},
	},
	backButton: {
		marginRight: theme.spacing(2),
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	title: {
		flexGrow: 1
	},
	sup: {
		fontSize: "11px"
	},
	appBarButton: {
		[theme.breakpoints.down('sm')]: {
			padding: "7px",
        },
	},
}));

const Appbar = ({ location, showDrawer }) => {
    const classes = useStyles();

	const [paramAnchor, setParamAnchor] = useState(null);
    const openOptionMenu = Boolean(paramAnchor);

    const getAppbarText = () => {
        switch(location.pathname.split('/')[1]) {
            case "new-chantier" :
                return <Typography variant="h6" noWrap className={classes.title}>Nouveau Chantier</Typography>
            case "show-chantier" :
                return <Typography variant="h6" noWrap className={classes.title}>Infos Chantier</Typography>
            case "edit-chantier" :
                return <Typography variant="h6" noWrap className={classes.title}>Modification Chantier</Typography>
            case "edit-chantier-piles" :
                return <Typography variant="h6" noWrap className={classes.title}>Modification Piles du Chantier</Typography>
            case "search-chantiers" :
                return <Typography variant="h6" noWrap className={classes.title}>Recherche Chantier</Typography>
            case "liste-chantiers" :
                return <Typography variant="h6" noWrap className={classes.title}>Liste des Chantiers</Typography>
            case "chantier-from-devis" :
                return <Typography variant="h6" noWrap className={classes.title}>Nouveau Chantier depuis un Devis</Typography>

            case "new-devis" :
                return <Typography variant="h6" noWrap className={classes.title}>Nouveau Devis</Typography>
            case "show-devis" :
                return <Typography variant="h6" noWrap className={classes.title}>Infos Devis</Typography>
            case "edit-devis" :
                return <Typography variant="h6" noWrap className={classes.title}>Modification Devis</Typography>
            case "liste-devis" :
                return <Typography variant="h6" noWrap className={classes.title}>Liste des Devis</Typography>
            case "search-devis" :
                return <Typography variant="h6" noWrap className={classes.title}>Recherche Devis</Typography>

            default :
                return (
                    <Typography variant="h6" noWrap className={classes.title}>
                        My-Forêt <sup className={classes.sup}>démo</sup>
                    </Typography>
                )
        }
    }

    const getAppbarButton = () => {
        if (
            [
                'new-chantier',
                'show-chantier',
                'edit-chantier',
                'edit-chantier-piles',
                'chantier-from-devis',
                'new-devis',
                'edit-devis',
                'show-devis',
                'show-stock'
            ].includes(location.pathname.split('/')[1])) {
            return (
                <div>
                    <Hidden smUp>
                        <IconButton
                        color="inherit"
                        edge="start"
                        size="small"
                        onClick={() => navigate(-1)}
                        className={clsx(classes.backButton, classes.appBarButton)}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden xsDown>
                        <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => navigate(-1)}
                        className={classes.backButton}
                        >
                            <ArrowBackIcon/>
                        </IconButton>
                    </Hidden>
                </div>
            )
        } else {
            return (
                <div>
                    <Hidden smUp>
                        <IconButton
                        color="inherit"
                        edge="start"
                        size="small"
                        onClick={() => showDrawer(true)}
                        className={clsx(classes.menuButton, classes.appBarButton)}>
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                    <Hidden xsDown>
                        <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => showDrawer(true)}
                        className={classes.menuButton}>
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                </div>
                
            )
        }
    }

	const handleOpenParam = (e) => {
		setParamAnchor(e.currentTarget);
	};
	const handleCloseParam = () => {
		setParamAnchor(null);
	};

	const handleLogout = () => {
        handleCloseParam()
        dispatchNotification("Non disponible en mode démo.")
	}

    return (
        <MUIAppBar position="fixed" className={classes.appBar}>
            <Toolbar>

                {getAppbarButton()}
                
                {getAppbarText()}

                <div>
                    <IconButton
                    onClick={handleOpenParam}
                    color="inherit">
                        <Hidden smUp>
                            <MoreVertIcon />
                        </Hidden>
                        <Hidden xsDown>
                            <AccountCircle />
                        </Hidden>
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={paramAnchor}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={openOptionMenu}
                    onClose={handleCloseParam}>
                        <MenuItem onClick={() => handleLogout()} >Se déconnecter</MenuItem>
                    </Menu>
                </div>

            </Toolbar>
        </MUIAppBar>
    )
}
export default Appbar
