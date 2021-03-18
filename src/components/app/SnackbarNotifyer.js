import React , { useEffect, useState } from "react"
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar'

const SnackbarNotifyer = () => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(() => {
        const showNotification = (e) => {
            setOpen(true)
            setMessage(e.detail.message)
        }

        document.addEventListener('userAction', showNotification, false)
        return () => {
			document.removeEventListener('userAction', showNotification);
		}
    })

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            open={open}
            onClose={handleClose}
            autoHideDuration={3000}
            message={message}
            action={
                <IconButton
                color="inherit"
                size="small"
                onClick={handleClose} >
                    <CloseIcon />
                </IconButton>
            }
        />
    )
}

export default SnackbarNotifyer