import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DevisListItem from "./DevisListItem"

/**
 * @param {object} devis liste brute de firebase
 */
function ListeDeDevis(props) {
    
	return (
        <Grid container spacing={2} justify="space-around" alignItems="stretch">
            {Object.entries(props.devis).map(([key, value]) => {
                return(
                    <DevisListItem
                    devis={value}
                    idDoc={key}
                    key={key}/>
                )
            })}
        </Grid>
	);
}

export default ListeDeDevis;
		