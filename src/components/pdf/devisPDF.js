import React, {useState, useEffect} from 'react';
import { Page, Text, Image, View, Document } from '@react-pdf/renderer';
import { getRefName, getUnit, convertTimestampToHumandeDate } from '../utils/woodtools'

import logo from '../images/logo.png';
import signature from '../images/signature.jpg';

import {styles} from './stylesheetPDF'

// Create Document Component
function DevisPDF (props) {

	const devis = props.devis

	let nbRows = 8
	return (
		<Document
			title={ "Devis "+devis.numeroDevis+" - "+devis.proprietaire+" | SAS Anthony Austruy" } >
			<Page size="A4" style={styles.page} wrap>
				<View style={styles.header} fixed>
                    <View style={styles.leftHead}>
                        <Image src={logo} style={styles.logo}/>
                        <Text>"Le Cardou" - 47150 GAVAUDUN</Text>
                        <Text>Tél. 06 70 99 07 96</Text>
                        <Text>anthony.austruy47@gmail.com</Text>
                    </View>
                    <View style={styles.rightHead}>
                        <Text style={styles.docTitle}>DEVIS</Text>
                        <Text style={[styles.docTitle, {marginTop: "7px", fontSize: 15}]}>N°: {devis.numeroDevis || "-"}</Text>
						<Text style={{marginTop: "2px", fontSize: 10}}>Date : {convertTimestampToHumandeDate(devis.date) || "-"}</Text>
                    </View>
				</View>

				<View style={[ styles.phrase, {position: "absolute", bottom: "20px", left: "285px", fontSize: 10}]} fixed>
					<Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => {
						if(totalPages !== 1){
							return `${pageNumber} / ${totalPages}`
						}
					}} fixed/>
				</View>

				<View style={styles.section}>
					<View style={[styles.phrase, {fontSize: 10}]}>
						<Text><Text style={styles.light}>N° de la chaine de contrôle PEFC : </Text>QUAL/04-029</Text>
                    </View>
                    <View style={styles.phrase}>
                        <Text><Text style={styles.bold}>M. {devis.numeroDevis.charAt(0)==="D" ? "Dylan Mota" : "Austruy Anthony"}</Text> représentant la <Text style={styles.bold}>SAS Anthony AUSTRUY</Text></Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10}]}>
                        <Text>achète à</Text>
                    </View>
                    <View style={styles.phrase}>
                        <Text style={styles.bold}>{devis.proprietaire}</Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10, marginLeft: "15px"}]}>
						<Text style={{marginRight: "25px"}}><Text style={styles.light}>Adresse : </Text>{devis.localisation || "-"}</Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10, marginLeft: "15px"}]}>
						<Text style={{marginRight: "25px"}}><Text style={styles.light}>Tél : </Text>{devis.telephone || "-"}</Text>
						<Text><Text style={styles.light}>Email : </Text>{devis.email || "-"}</Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10, marginLeft: "15px"}]}>
						{ devis.pefc ? 
						<Text><Text style={styles.light}>Adhérant au PEFC - N° d'adhérent : </Text>{devis.codePefc || "-"}</Text> :
						<Text style={styles.light}>Non adhérent au PEFC</Text>
						}
                    </View>
                    <View style={[styles.phrase, {fontSize: 10}]}>
                        <Text>un lot de bois aux conditions définies ci-dessous :</Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10, marginLeft: "15px"}]}>
						<Text style={styles.bold}>{devis.condition || "-"}</Text>
                    </View>
				</View>

				<View style={styles.section}>
					<View style={styles.tableHead}>
						<View style={styles.rowHead}>
							<View style={[styles.cell, {width: '80%'}]}>
								<Text style={styles.headText}>Produit</Text>
							</View>
							<View style={[styles.cell, {width: '20%'}]}>
								<Text style={styles.headText}>Prix H.T</Text>
							</View>
						</View>
					</View>

					{/* Table content */}
					{devis.produits && devis.produits.map((bois, index) => {
						nbRows -= 1
						return (
						<View style={styles.table} key={index} wrap>
							<View style={styles.table}>
								<View style={styles.row}>
									<View style={[styles.cellItem, {width: '80%'}]}>
										<Text style={[styles.cellTextSmall]}>{getRefName(bois.type)} : {bois.cahierDesCharges}</Text>
									</View>
									<View style={[styles.cellItem, {width: '20%'}]}>
										<Text style={styles.cellTextSmall}>{bois.prixUnitaireHT} {bois.isPrixGlobal ? "€" : "€ / "+getUnit(bois.type)}</Text>
									</View>
								</View>
							</View>
							{/* {index !== devis.produits.length-1 ?
							<View style={styles.dividerLight}/> : null}
							<View style={styles.divider}/> */}
							<View style={styles.dividerLight}/>
						</View>)
					})}

					{nbRows > 0 && [...Array(nbRows)].map(() => 
						<View style={styles.table}>
							<View style={styles.table}>
								<View style={styles.row}>
									<View style={[styles.cellItem, {width: '80%'}]}>
										<Text style={[styles.cellTextSmall]}> </Text>
									</View>
									<View style={[styles.cellItem, {width: '20%'}]}>
										<Text style={styles.cellTextSmall}> </Text>
									</View>
								</View>
							</View>
							<View style={styles.dividerLight}/>
						</View>
					)}
					<View style={styles.divider}/>
				</View>

				<View wrap={false} style={{paddingBottom: 35}}>
					<View style={[styles.section, {paddingBottom: 10}]}>
						<View style={styles.phrase}>
							<Text style={[styles.bold, {fontSize: 10, borderBottomWidth: 1}]}>Conditions particulières :</Text>
						</View>

						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text><Text style={styles.light}>PAIEMENT : </Text>Le propriétaire fait son affaire du paiement de la contribution volontaire obligatoire à France Bois et décharge en la matière l'exploitant forestier de toutes responsabilités.</Text>
						</View>
						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text><Text style={styles.light}>SERVITUDE / DÉPÔT : </Text>{devis.servitude || "-"}</Text>
						</View>
						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text><Text style={styles.light}>DÉLAIS : </Text>{devis.delais || "-"}</Text>
						</View>
						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text><Text style={styles.light}>OBSERVATIONS : </Text>{devis.observations || "-"}</Text>
						</View>
					</View>

					<View style={[styles.section, {paddingBottom: 10}]}>
						<View style={styles.phrase}>
							<Text style={[styles.light, {fontSize: 8}]}>Le propiétaire atteste que les parcelles mentionnées dans ce contrat lui appartiennent et certifie que la vente des coupes, objet de ce contrat, est conforme à la légilation en vigeur et il s'engage à assurer la pérénnité forestière des peuplements exploités.</Text>
						</View>
					</View>

					<View style={[styles.section, {paddingBottom: 10}]}>
						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text>Fait à <Text style={styles.bold}>Gavaudun</Text> le <Text style={styles.bold}>{convertTimestampToHumandeDate(devis.date)}</Text></Text>
						</View>
						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text style={{fontSize: 9, marginRight: 270}}>Le Vendeur :</Text>
							<Text style={{fontSize: 9}}>L'Acheteur :</Text>
							<Image src={signature} style={styles.signature}/>
						</View>
					</View>
				</View>

			</Page>
		</Document>
		)
		
	}
	
	export default DevisPDF