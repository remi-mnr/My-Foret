import React, {useState, useEffect} from 'react';
import { Page, Text, Image, View, Document, StyleSheet } from '@react-pdf/renderer';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import logo from '../images/log512.png';

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#ffffff'
	},
	section: {
		margin: 10,
		padding: 10,
		// flexGrow: 1
	},
	divider: {
		flexGrow: 1,
		borderTopWidth: 1,
	},
	dividerLight: {
		flexGrow: 1,
		borderTopWidth: 1,
		borderColor: "#ededed",
	},

	//Header
	header: {
		margin: 10,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: '65px',
		height: 'auto',
		marginBottom: '5px'
	},

	//Table Head
	tableHead: {
		display: "table",
		width: "auto",
		backgroundColor: "#c0c8f1"
	},
	rowHead: {
		flexDirection: "row",
		flexGrow: 1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		justifyContent: "space-between"
    },
	headText: {
		fontSize: 9
	},
	//Table Row
	table: {
        display: "table",
		width: "auto",
	},
    row: {
		flexDirection: "row",
		flexGrow: 1,
		justifyContent: "space-between"
    },
    cell: {
		// padding: '3px'
		display: "flex",
		flexDirection: "row",
		minWidth: 50,
		flexGrow: 1,
		// borderLeftWidth: 1,
		// borderRightWidth: 1,
		justifyContent: "center",
		padding: '2px 0px'
	},
	cellText: {
		// fontSize: 12
		fontSize: 9
	},
	//Table Foot
	tableHead: {
		display: "table",
		width: "auto",
		backgroundColor: "#c0c8f1"
	},
});

// Create Document Component
function MyDocument (props) {
	return (
		<Document
			title={ "Résumé - Chantier "+ props.chantier.numeroChantier +".pdf" } >
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<Image src={logo} style={styles.logo}/>
					<Text>WoodStack</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.headText}>Numéro de Chantier : {props.chantier.numeroChantier}</Text>
					<Text style={styles.headText}>Propriétaire : {props.chantier.proprietaire}</Text>
					<Text style={styles.headText}>Coupeur : {props.chantier.coupeur}</Text>
					<Text style={styles.headText}>Débardeur : {props.chantier.debardeur}</Text>
				</View>

				<View style={styles.section}>
					<View style={styles.tableHead}>
						<View style={styles.rowHead}>
							<View style={styles.cell}>
								<Text style={styles.headText}>Code</Text>
							</View>
							<View style={[styles.cell, {minWidth: '100px'}]}>
								<Text style={styles.headText}>Catégorie</Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.headText}>N° Pile</Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.headText}>Longeur</Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.headText}>Largeur</Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.headText}>Hauteur</Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.headText}>Conversion</Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.headText}>Stères</Text>
							</View>
						</View>
					</View>

					{props.chantier.listeBois.map((bois, index) =>
					<View style={styles.table} key={index}>
						<View style={styles.table}>
							{bois.piles.map((pile, i) => {
								let divider;
								if (i != 0) {
									divider = <View style={styles.dividerLight}/>;
								} else {
									divider = null;
								}
								return (
									<View key={i}>
										{divider}
										<View style={styles.row}>
											<View style={styles.cell}>
												<Text style={styles.cellText}>{i==0 ? ("[#CODE]") : ""}</Text>
											</View>
											<View style={[styles.cell, {minWidth: '100px'}]}>
												<Text style={styles.headText}>{i==0 ? bois.type : ""}</Text>
											</View>
											<View style={styles.cell}>
												<Text style={styles.cellText}>{pile.numeroPile}</Text>
											</View>
											<View style={styles.cell}>
												<Text style={styles.cellText}>{pile.longeur}</Text>
											</View>
											<View style={styles.cell}>
												<Text style={styles.cellText}>{pile.largeur}</Text>
											</View>
											<View style={styles.cell}>
												<Text style={styles.cellText}>{pile.hauteur}</Text>
											</View>
											<View style={styles.cell}>
												<Text style={styles.cellText}>0.7</Text>
											</View>
											<View style={styles.cell}>
												<Text style={styles.cellText}>25.5</Text>
											</View>
										</View>
									</View>
									
									
								)
							})}
						</View>

						<View style={styles.divider}/>
					</View>
					)}

					<View style={styles.tableHead}>
						<View style={styles.row}>
							<View style={styles.cell}>
								<Text style={styles.cellText}></Text>
							</View>
							<View style={[styles.cell, {minWidth: '100px'}]}>
								<Text style={styles.cellText}></Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.cellText}></Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.cellText}></Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.cellText}></Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.cellText}>Total</Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.cellText}>50 Stères</Text>
							</View>
							<View style={styles.cell}>
								<Text style={styles.cellText}>50 m³</Text>
							</View>
						</View>
					</View>

				</View>
			</Page>
		</Document>
		)
		
	}
	
	export default MyDocument