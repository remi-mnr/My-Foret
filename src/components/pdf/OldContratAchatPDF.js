import React, {useState, useEffect} from 'react';
import { Page, Text, Image, View, Document } from '@react-pdf/renderer';
import { 
	getRefName, 
	getUnit, 
	convertTimestampToHumandeDate, 
	sortStackByCategory, 
	getVolumePileWithCotes } from '../utils/woodtools'

import logo from '../images/logo.png';
import signature from '../images/signature.jpg';

import {styles} from './stylesheetPDF'

// Create Document Component
function ContratAchatPDF (props) {

	const chantier = props.chantier

	const piles = props.piles

	const sortedWoods = sortStackByCategory(piles)

	let nbRows = 7

	let globalPrice = 0
	return (
		<Document title={ "Contrat d'achat Chantier "+ chantier.numeroChantier +" - "+chantier.proprietaire+" | SAS Anthony Austruy" }>
			<Page size="A4" style={styles.page} wrap>
				<View style={styles.header} fixed>
                    <View style={styles.leftHead}>
                        <Image src={logo} style={styles.logo}/>
                        <Text>"Le Cardou" - 47150 GAVAUDUN</Text>
                        <Text>Tél. 06 70 99 07 96</Text>
                        <Text>anthony.austruy47@gmail.com</Text>
                    </View>
                    <View style={styles.rightHead}>
                        <Text style={styles.docTitle}>CONTRAT D'ACHAT</Text>
                        <Text style={styles.docTitle}>DE BOIS</Text>
                        <Text style={[styles.docTitle, {marginTop: "7px", fontSize: 15}]}>N°: {chantier.numeroChantier || "-"}</Text>
						<Text style={{marginTop: "2px", fontSize: 10}}>Date : {convertTimestampToHumandeDate(chantier.date) || "-"}</Text>
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
                        <Text><Text style={styles.bold}>M {chantier.numeroChantier.charAt(0)==="D" ? "Dylan Mota" : "Austruy Anthony"}</Text> représentant la <Text style={styles.bold}>SAS Anthony AUSTRUY</Text></Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10}]}>
                        <Text>achète à</Text>
                    </View>
                    <View style={styles.phrase}>
                        <Text style={styles.bold}>{chantier.proprietaire}</Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10, marginLeft: "15px"}]}>
						<Text style={{marginRight: "25px"}}><Text style={styles.light}>Adresse : </Text>{chantier.localisation || "-"}</Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10, marginLeft: "15px"}]}>
						<Text style={{marginRight: "25px"}}><Text style={styles.light}>Tél : </Text>{chantier.telephone || "-"}</Text>
						<Text><Text style={styles.light}>Email : </Text>{chantier.email || "-"}</Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10, marginLeft: "15px"}]}>
						{ chantier.pefc ? 
						<Text><Text style={styles.light}>Adhérant au PEFC - N° d'adhérent : </Text>{chantier.codePefc || "-"}</Text> :
						<Text style={styles.light}>Non adhérent au PEFC</Text>
						}
                    </View>
                    <View style={[styles.phrase, {fontSize: 10}]}>
                        <Text>un lot de bois aux conditions définies ci-dessous :</Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10, marginLeft: "15px"}]}>
						<Text style={styles.bold}>{chantier.condition || "-"}</Text>
                    </View>
				</View>



				<View style={[styles.section, {paddingTop: 10}]}>
					<View style={styles.tableHead}>
						<View style={styles.rowHead}>
							<View style={[styles.cell, {width: '37%'}]}>
								<Text style={styles.headText}>Produit</Text>
							</View>
							<View style={[styles.cell, {width: '19%'}]}>
								<Text style={styles.headText}>LxlxH</Text>
							</View>
							<View style={[styles.cell, {width: '12%'}]}>
								<Text style={styles.headText}>Volume</Text>
							</View>
							<View style={[styles.cell, {width: '20%'}]}>
								<Text style={styles.headText}>Prix Unitaire H.T</Text>
							</View>
							<View style={[styles.cell, {width: '12%'}]}>
								<Text style={styles.headText}>Valeur</Text>
							</View>
						</View>
					</View>

					{Object.entries(sortedWoods).map(([refType, dataType], index) => (
						<View style={styles.table} key={index} wrap>
							<View style={styles.table}>
								{Object.entries(dataType).map(([refPile, dataPile], i) => {
									let volume = getVolumePileWithCotes(dataPile.longeur, dataPile.largeur, dataPile.hauteur, refType)
									if(!dataPile.isPrixGlobal) {
										globalPrice += volume * Number(dataPile.prixUnitaireHT);
									} else {
										if(i === 0) {
											globalPrice += Number(dataPile.prixUnitaireHT);
										}
									}
									nbRows -= 1
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
												<View style={[styles.cell, {width: '37%'}]}>
													<Text style={styles.cellTextSmall}>{i==0 ? getRefName(refType, true) : " "}</Text>
												</View>
												<View style={[styles.cell, {width: '19%'}]}>
													<Text style={styles.cellTextSmall}>{dataPile.longeur}x{dataPile.largeur}x{dataPile.hauteur}m {getUnit(refType, true) !== "St" ? "x0.7" : ""}</Text>
												</View>
												<View style={[styles.cell, {width: '12%'}]}>
													<Text style={styles.cellTextSmall}>{
														((Math.round((volume) * 100) / 100) % 1 ) === 0 ?
														(Math.round((volume) * 100) / 100) :
														(Math.round((volume) * 100) / 100).toFixed(2)} {getUnit(refType, true)}</Text>
												</View>
												{dataPile.isPrixGlobal ?
													[<View style={[styles.cell, {width: '20%'}]}>
													</View>,
													<View style={[styles.cell, {width: '12%'}]}>
														{i === 0 ? <Text style={styles.cellTextSmall}>{dataPile.prixUnitaireHT || "-"} €</Text> : null}
													</View>]
													:
													[<View style={[styles.cell, {width: '20%'}]}>
														<Text style={styles.cellTextSmall}>{dataPile.prixUnitaireHT || "-"} € / {getUnit(refType, true)}</Text>
													</View>,
													<View style={[styles.cell, {width: '12%'}]}>
														<Text style={styles.cellTextSmall}>{
															((Math.round((volume * dataPile.prixUnitaireHT) * 100) / 100) % 1 ) === 0 ?
															(Math.round((volume * dataPile.prixUnitaireHT) * 100) / 100) :
															(Math.round((volume * dataPile.prixUnitaireHT) * 100) / 100).toFixed(2)} €</Text>
													</View>]
												}
											</View>
										</View>
									)
								})}
							</View>
							<View style={styles.divider}/>
						</View>
					))}

					{nbRows >0 &&
					[...Array(nbRows)].map(() => 
						<View style={styles.table}>
							<View style={styles.table}>
								<View>
									<View style={styles.row}>
										<View style={[styles.cell, {width: '37%'}]}>
											<Text style={styles.cellTextSmall}></Text>
										</View>
										<View style={[styles.cell, {width: '19%'}]}>
											<Text style={styles.cellTextSmall}> </Text>
										</View>
										<View style={[styles.cell, {width: '12%'}]}>
											<Text style={styles.cellTextSmall}> </Text>
										</View>
										<View style={[styles.cell, {width: '20%'}]}>
											<Text style={styles.cellTextSmall}> </Text>
										</View>
										<View style={[styles.cell, {width: '12%'}]}>
											<Text style={styles.cellTextSmall}> </Text>
										</View>
									</View>
								</View>
							</View>
							<View style={styles.divider}/>
						</View>
					)}

					<View style={styles.tableFooter}>
						<View style={styles.row}>
							<View style={[styles.cell, {width: '60%'}]}>
								<Text style={styles.headText}></Text>
							</View>
							<View style={[styles.cell, {width: '5%'}]}>
								<Text style={styles.headText}>Total</Text>
							</View>
							<View style={[styles.cell, {width: '20%', textAlign: 'right'}]}>
								<Text style={styles.headText}>{Math.round((globalPrice + Number.EPSILON) * 100) / 100} € H.T</Text>
							</View> 
						</View>
					</View>
					<View style={styles.divider}/>
				</View>

				<View wrap={false}
				style={{paddingBottom: "70px"}}>
					<View style={styles.section}>
						<View style={styles.phrase}>
							<Text style={[styles.bold, {fontSize: 10, borderBottomWidth: 1}]}>Conditions particulières :</Text>
						</View>

						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text><Text style={styles.light}>PAIEMENT : </Text>Le propriétaire fait son affaire du paiement de la contribution volontaire obligatoire à France Bois et décharge en la matière l'exploitant forestier de toutes responsabilités.</Text>
						</View>
						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text><Text style={styles.light}>SERVITUDE / DÉPÔT : </Text>{chantier.servitude || "-"}</Text>
						</View>
						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text><Text style={styles.light}>DÉLAIS : </Text>{chantier.delais || "-"}</Text>
						</View>
						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text><Text style={styles.light}>OBSERVATIONS : </Text>{chantier.observations || "-"}</Text>
						</View>
					</View>

					<View style={[styles.section, {paddingTop: 10}]}>
						<View style={styles.phrase}>
							<Text style={[styles.light, {fontSize: 8}]}>Le propiétaire atteste que les parcelles mentionnées dans ce contrat lui appartiennent et certifie que la vente des coupes, objet de ce contrat, est conforme à la légilation en vigeur et il s'engage à assurer la pérénnité forestière des peuplements exploités.</Text>
						</View>
					</View>

					<View style={[styles.section, {paddingTop: 10}]}>
						<View style={[styles.phrase, {fontSize: 10}]}>
							<Text>Fait à <Text style={styles.bold}>Gavaudun</Text> le <Text style={styles.bold}>{convertTimestampToHumandeDate(chantier.date)}</Text></Text>
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
	
	export default ContratAchatPDF