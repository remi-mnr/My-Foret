import React, {useState, useEffect} from 'react';
import { Page, Text, Image, View, Document } from '@react-pdf/renderer';
import { 
	getRefName, 
	getUnit, 
	convertTimestampToHumandeDate, 
	sortStackByCategory, 
	getVolumePileWithCotes } from '../utils/woodtools'

import logo from '../images/logo.png';

import {styles} from './stylesheetPDF'

// Create Document Component
function ReceptionChantierPDF (props) {

	const chantier = props.chantier

	const piles = props.piles

	const sortedWoods = sortStackByCategory(piles)

	let globalStere = 0
	let globalm3 = 0

	return (
		<Document
			title={ "Réception Chantier "+chantier.numeroChantier+" - "+chantier.proprietaire+ " | SAS Anthony Austruy" } >
			<Page size="A4" style={styles.page} wrap>
				<View style={styles.header} fixed>
                    <View style={styles.leftHead}>
                        <Image src={logo} style={styles.logo}/>
                        <Text>"Le Cardou" - 47150 GAVAUDUN</Text>
                        <Text>Tél. 06 70 99 07 96</Text>
                        <Text>anthony.austruy47@gmail.com</Text>
                    </View>
                    <View style={styles.rightHead}>
                        <Text style={styles.docTitle}>RÉCEPTION CHANTIER</Text>
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

				<View style={[styles.section, {paddingTop: 0}]}>
                    <View style={styles.phrase}>
                        <Text><Text style={styles.light}>Propriétaire : </Text><Text style={styles.bold}>{chantier.proprietaire}</Text></Text>
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
				</View>

				<View style={styles.section}>
                    <View style={[styles.phrase, {fontSize: 10}]}>
                        <Text><Text style={styles.bold}>Coupeur : </Text>{chantier.coupeur || "-"}</Text>
                    </View>
					<View style={[styles.phrase, {fontSize: 10}]}>
                        <Text><Text style={styles.bold}>Débardeur : </Text>{chantier.debardeur || "-"}</Text>
                    </View>
					{chantier.autre !== "" ? <View style={[styles.phrase, {fontSize: 10}]}>
                        <Text><Text style={styles.bold}>Autre : </Text>{chantier.autre || "-"}</Text>
                    </View> : null}
				</View>

				<View style={[styles.section, {marginBottom: 30}]}>
					<View style={styles.tableHead}>
						<View style={styles.rowHead}>
							<View style={[styles.cell, {width: '51%'}]}>
								<Text style={styles.headText}>Nature</Text>
							</View>
							<View style={[styles.cell, {width: '15%'}]}>
								<Text style={styles.headText}>N° Pile</Text>
							</View>
							<View style={[styles.cell, {width: '19%'}]}>
								<Text style={styles.headText}>LxlxH</Text>
							</View>
							<View style={[styles.cell, {width: '15%'}]}>
								<Text style={styles.headText}>Volume</Text>
							</View>
						</View>
					</View>

					{Object.entries(sortedWoods).map(([refType, dataType], index) =>
					<View style={styles.table} key={index} wrap>
						<View style={[styles.table, styles.category]} break>
							{Object.entries(dataType).map(([refPile, dataPile], i) => {
								let volume = getVolumePileWithCotes(dataPile.longeur, dataPile.largeur, dataPile.hauteur, refType)
								if(getUnit(refType, true) === "St") {
									globalStere += volume
								} else {
									globalm3 += volume
								}

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
											{ i === 0 ? 
											<View style={[styles.cellColumn, {width: '51%'}]}>
												<Text style={styles.cellTextSmall}>{i==0 ? getRefName(refType, true) : " "}</Text>
												{dataPile.commentaire !== "" ?
												<Text style={[styles.italic, {marginTop: 2}]}>Commentaire Pile : {dataPile.commentaire}</Text> : null}
											</View>
											: 
											<View style={[styles.cell, {width: '51%'}]}>
												{dataPile.commentaire !== "" ?
												<Text style={styles.italic}>Commentaire Pile : {dataPile.commentaire}</Text> : null}
											</View> }
											
											<View style={[styles.cell, {width: '15%'}]}>
												<Text style={styles.cellTextSmall}>{dataPile.numeroPile || "-"}</Text>
											</View>
											<View style={[styles.cell, {width: '19%'}]}>
												<Text style={styles.cellTextSmall}>{dataPile.longeur||"_"}x{dataPile.largeur||"_"}x{dataPile.hauteur||"_"}m {getUnit(refType, true) !== "St" ? "x0.7" : ""}</Text>
											</View>
											<View style={[styles.cell, {width: '15%'}]}>
												<Text style={styles.cellTextSmall}>{
													((Math.round((volume) * 100) / 100) % 1 ) === 0 ?
													(Math.round((volume) * 100) / 100) :
													(Math.round((volume) * 100) / 100).toFixed(2)} {getUnit(refType)}</Text>
											</View>
										</View>
									</View>
								)
							})}
						</View>
					</View>
					)}


					<View style={styles.tableFooter}>
						{globalStere !== 0  ?
						<View style={styles.row}>
							<View style={[styles.cell, {width: '60%'}]}>
								<Text style={styles.headText}></Text>
							</View>
							<View style={[styles.cell, {width: '5%'}]}>
								<Text style={styles.headText}>Total</Text>
							</View>
							<View style={[styles.cell, {width: '20%', textAlign: 'right'}]}>
								<Text style={styles.headText}>{
									((Math.round((globalStere) * 100) / 100) % 1 ) === 0 ?
									(Math.round((globalStere) * 100) / 100) :
									(Math.round((globalStere) * 100) / 100).toFixed(2)} Stères</Text>
							</View>
						</View> : null}
						
						{globalm3 !== 0  ? 
						<View style={styles.row}>
							<View style={[styles.cell, {width: '60%'}]}>
								<Text style={styles.headText}></Text>
							</View>
							<View style={[styles.cell, {width: '5%'}]}>
								<Text style={styles.headText}>{globalStere === 0 ? "Total" : " "}</Text>
							</View>
							<View style={[styles.cell, {width: '20%', textAlign: 'right'}]}>
								<Text style={styles.headText}>{
									((Math.round((globalm3) * 100) / 100) % 1 ) === 0 ?
									(Math.round((globalm3) * 100) / 100) :
									(Math.round((globalm3) * 100) / 100).toFixed(2)} m³</Text>
							</View>  
						</View> : null}
					</View>
					<View style={styles.divider}/>
				</View>

			</Page>
		</Document>
		)
		
	}
	
	export default ReceptionChantierPDF