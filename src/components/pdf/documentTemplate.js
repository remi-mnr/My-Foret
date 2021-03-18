import React, {useState, useEffect} from 'react';
import { Page, Text, Image, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EmailIcon from '@material-ui/icons/Email';
import logo from '../images/logo.png';
import Raleway from './Raleway-SemiBold.ttf'

Font.register({ family: 'Raleway', src: Raleway });

// Create styles
const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#ffffff'
	},
	section: {
        // margin: 10,
        paddingTop: 20,
        // paddingBottom: 20,
        paddingLeft: 35,
		paddingRight: 35,
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
		// margin: 10,
        padding: 35,
        flexDirection: "row",
		alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#3f51b5',
        color: "white"
    },
    leftHead: {
        fontSize: 10,
        lineHeight: 1.3,
        width: "50%"
    },
    rightHead: {
        fontSize: 12,
        width: "50%",
    },
    docTitle: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: 'Raleway'
    },
	logo: {
		width: '155px',
		height: 'auto',
		marginBottom: '15px'
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
    
    //divers
    row: {
        flexDirection: "row",
        fontSize: 12,
        fontWeight: "normal",
        marginBottom: 5
    },
    bold: {
        fontWeight: "bold",
        fontFamily: 'Raleway'
    }
});

// Create Document Component
function MyDocumentTemplate (props) {

	return (
		<Document
			title={ "Résumé - Chantier 50.pdf" } >
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
                    <View style={styles.leftHead}>
                        <Image src={logo} style={styles.logo}/>
                        <Text>"Le Cardou" - 47150 GAVAUDUN</Text>
                        <Text>Tél. 06 70 99 07 96</Text>
                        <Text>contact@my-foret.com</Text>
                    </View>
                    <View style={styles.rightHead}>
                        <Text style={styles.docTitle}>CONTRAT D'ACHAT</Text>
                        <Text style={styles.docTitle}>DE BOIS</Text>
                        <Text style={{marginTop: "7px"}}>N°: 00125</Text>
                    </View>
				</View>

				<View style={styles.section}>
                    <View style={styles.row}>
                        <Text><Text style={styles.bold}>M Austruy Anthony</Text> représentant la SAS <Text style={styles.bold}>My Forêt</Text></Text>
                    </View>
					<View style={[styles.row, {fontSize: 10}]}>
                        <Text>achète à</Text>
                    </View>
                    <View style={styles.row}>
                        <Text><Text style={styles.bold}>M Austruy Anthony</Text> domicilié à <Text style={styles.bold}>La Lande 24390</Text></Text>
                    </View>
                    <View style={[styles.row, {fontSize: 10}]}>
                        <Text>un lot de bois aux conditions définies ci-dessous :</Text>
                    </View>
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
	
	export default MyDocumentTemplate