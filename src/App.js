import React, { useState, useEffect } from 'react'
import * as serviceWorker from './serviceWorker'
import { Router } from "@reach/router"
import 'fontsource-roboto'

import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Layout from "./components/app/Layout"
import PrivateRoute from "./components/app/PrivateRoute"
import SnackbarNotifyer from "./components/app/SnackbarNotifyer"

//Stocks
import Stocks from "./components/stock/pages/Stocks"
import StocksPrice from "./components/stock/pages/StocksPrice"
import ShowStock from "./components/stock/pages/ShowStock"
//Chantier
import NewChantier from "./components/chantier/pages/NewChantier"
import EditChantierPiles from "./components/chantier/pages/EditChantierPiles"
import ChantierFromDevis from "./components/chantier/pages/ChantierFromDevis"
import EditChantier from "./components/chantier/pages/EditChantier"
import ListeChantiers from "./components/chantier/pages/ListeChantiers"
import SearchChantiers from "./components/chantier/pages/SearchChantiers"
import ShowChantier from "./components/chantier/pages/ShowChantier"
//Devis
import ListeDevis from "./components/devis/pages/ListeDevis"
import SearchDevis from "./components/devis/pages/SearchDevis"
import NewDevis from "./components/devis/pages/NewDevis"
import ShowDevis from "./components/devis/pages/ShowDevis"
import EditDevis from "./components/devis/pages/EditDevis"

import DebugPage from "./components/utils/debugPage"

function App() {
	
	const [newVersionAvailable, setNewVersionAvailable] = useState(false)
	const [waitingWorker, setWaitingWorker] = useState({})

	const onServiceWorkerUpdate = (registration) => {
		setWaitingWorker(registration.waiting)
		setNewVersionAvailable(true)
	}

	const updateServiceWorker = () => {
        waitingWorker && waitingWorker.postMessage({ type: 'SKIP_WAITING' })
        setNewVersionAvailable(false)
        window.location.reload()
	}

	useEffect(() => {
		serviceWorker.register({ onUpdate: onServiceWorkerUpdate})
	}, []);
	
	return (
		<Layout>
			<SnackbarNotifyer />
			<Snackbar
				anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
				}}
				open={newVersionAvailable}
				message="Nouvelle version disponible !"
				action={
					<Button color="secondary" size="small" onClick={() => {
						updateServiceWorker() 
						}}>
						Mettre à jour
					</Button>
				}
			/>

			<Router>
				{/* Routes */}
				<PrivateRoute path="/new-chantier" component={NewChantier} />
				<PrivateRoute path="/chantier-from-devis/:idDevis" component={ChantierFromDevis} />
				<PrivateRoute path="/edit-chantier/:idChantier" component={EditChantier} />
				<PrivateRoute path="/edit-chantier-piles/:idChantier" component={EditChantierPiles} />
				<PrivateRoute path="/liste-chantiers" component={ListeChantiers} />
				<PrivateRoute path="/search-chantiers" component={SearchChantiers} />
				<PrivateRoute path="/show-chantier/:idChantier" component={ShowChantier} />

				<PrivateRoute path="/stocks-price" component={StocksPrice} />
				<PrivateRoute default path="/stocks" component={Stocks} />
				<PrivateRoute path="/show-stock/:refBois" component={ShowStock} />

				<PrivateRoute path="/liste-devis" component={ListeDevis} />
				<PrivateRoute path="/search-devis" component={SearchDevis} />
				<PrivateRoute path="/new-devis" component={NewDevis} />
				<PrivateRoute path="/edit-devis/:idDevis" component={EditDevis} />
				<PrivateRoute path="/show-devis/:idDevis" component={ShowDevis} />
				
				<PrivateRoute path="/debugPage" component={DebugPage} />
			</Router>

		</Layout>
	);
}
		
export default App;


