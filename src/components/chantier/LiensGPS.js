import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import RoomIcon from '@material-ui/icons/Room';
import LinkIcon from '@material-ui/icons/Link';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import MapIcon from '@material-ui/icons/Map';
import ExploreIcon from '@material-ui/icons/Explore';

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

function LiensGPS( props ) {
    const classes = useStyles();
    const [openSnackbar, setOpenSnackbar] = useState(false)

    const copyLink = (link) => {
        navigator.clipboard.writeText(link)
        setOpenSnackbar(true)
    }

    const scrapLinkFromString = (str) => {
        try {
            return str.match(/\bhttp\S+/)[0]
        } catch (e) {
            return false
        }
    }

    const createLinkFromCoordinates = (lat, long) => {
        return ("http://www.google.com/maps/place/"+lat+","+long).replaceAll(" ", "")
    }

    const createButtonsLinks = () => {
        if(props.lienMaps && scrapLinkFromString(props.lienMaps)) {
            return <Grid item xs={12} sm>
                <Link target="_blank" rel="noopener" href={scrapLinkFromString(props.lienMaps)}>
                    <Tooltip title="Ouvrir Google maps">
                        <IconButton color="primary" component="span">
                            <RoomIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
                
                <Tooltip title="Copier le lien">
                    <IconButton color="primary" component="span" onClick={() => copyLink(scrapLinkFromString(props.lienMaps))}>
                        <LinkIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        } else if (props.latitude && props.longitude && createLinkFromCoordinates(props.latitude, props.longitude)) {
            return <Grid item xs={12} sm>
                <Link target="_blank" rel="noopener" href={createLinkFromCoordinates(props.latitude, props.longitude)}>
                    <Tooltip title="Ouvrir Google maps">
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <RoomIcon />
                        </IconButton>
                    </Tooltip>
                </Link>
                <Tooltip title="Copier le lien">
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => copyLink(createLinkFromCoordinates(props.latitude, props.longitude))}>
                        <LinkIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        } else {
            return <Grid item xs={12} sm>
                <Tooltip title="Ouvrir Google maps">
                    <IconButton color="primary" disabled component="span">
                        <RoomIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Copier le lien">
                <IconButton color="primary" disabled component="span">
                        <LinkIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
        }
    }

	return (
		<Grid container spacing={2}>
            <Grid item>
                <Typography variant="subtitle2">Position GPS</Typography>
                {!props.latitude && !props.longitude && !props.lienMaps ? <Typography variant="body1">-</Typography> : null}
                {props.latitude || props.longitude ? <Typography variant="body1">{(props.latitude||"-")+", "+(props.longitude||"-")}</Typography> : null}
                {props.lienMaps ? <Typography style={{whiteSpace: 'pre-line'}} variant="body1">{props.lienMaps}</Typography> : null}
            </Grid>

            {createButtonsLinks()}

            <Snackbar
				open={openSnackbar}
				autoHideDuration={4000}
				onClose={() => setOpenSnackbar(false)}
                message="Lien Google maps copié !"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenSnackbar(false)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
			/>
        </Grid>
	);
}
	
export default LiensGPS