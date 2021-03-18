import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import ChantierListItem from "./ChantierListItem"

/**
 * Insert text at cursor position.
 * @param {object} chantiers liste brute de firebase
 * @param {object} stocks stocks triés par chantiers
 */
function ListeDeChantiers({chantiers, stocks}) {
	
	return (
        <Grid container spacing={2} justify="space-around" alignItems="stretch">
            {chantiers.map((chantier, index) => {
                return(
                    <ChantierListItem
                    chantier={chantier}
                    stock={stocks[chantier.id]}
                    idDoc={chantier.id}
                    key={chantier.id}/>
                )
            })}
        </Grid>
	);
}

export default ListeDeChantiers;
		