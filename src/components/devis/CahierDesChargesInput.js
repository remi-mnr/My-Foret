import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function CahierDesChargesInput({ cahierDesCharges, setCahierDesCharges}) {
    const inputRef = React.useRef();
    const [selectionStart, setSelectionStart] = React.useState(-1);
    const updateSelectionStart = () => setSelectionStart(inputRef.current.selectionStart);
    const [buttonVisibility, setButtonVisibility] = useState(false)

	return (     
        <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
                <TextField
                fullWidth
                inputRef={inputRef}
                label="Cahier des Charges"
                onSelect={() => {
                    setButtonVisibility(true)
                    updateSelectionStart()
                }}
                value={cahierDesCharges}
                onChange={(e) => setCahierDesCharges(e.target.value)}
                />
            </Grid>
            
            <Grid item xs={12} sm="auto">
                <Button
                fullWidth
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => {
                    if(selectionStart === -1) {
                        setCahierDesCharges(cahierDesCharges+"Ø")
                    } else {
                        let str = cahierDesCharges
                        setCahierDesCharges(str.slice(0, selectionStart)+"Ø"+str.slice(selectionStart, str.length))
                    }
                    let newSelect = selectionStart
                    newSelect++
                    setSelectionStart(newSelect)
                }}>Ø</Button>
            </Grid>
        </Grid>
	);
}
	
export default CahierDesChargesInput