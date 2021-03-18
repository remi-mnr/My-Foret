import { StyleSheet, Font } from '@react-pdf/renderer';

import Raleway from './Raleway-Bold.ttf'
import Rubik from './Rubik-Medium.ttf'
import RubikLight from './Rubik-Light.ttf'
import RubikItalic from './Rubik-LightItalic.ttf'

Font.register({ family: 'Raleway', src: Raleway });
Font.register({ family: 'Rubik', src: Rubik });
Font.register({ family: 'RubikLight', src: RubikLight });
Font.register({ family: 'RubikItalic', src: RubikItalic });

export const styles = StyleSheet.create({
	page: {
		flexDirection: 'column',
		backgroundColor: '#ffffff',
		paddingBottom: 50
	},
	section: {
        // margin: 10,
        // marginTop: 20,
        paddingBottom: 20,
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
        marginTop: -2,
    },
    

	//Header
	header: {
		// margin: 10,
        padding: 35,
        flexDirection: "row",
		alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#81bc02',
		color: "white",
		marginBottom: 25
    },
    leftHead: {
        fontSize: 10,
        lineHeight: 1.3,
        width: "60%"
    },
    rightHead: {
        fontSize: 12,
        width: "40%",
    },
    docTitle: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: 'Rubik'
    },
	logo: {
		width: '155px',
		height: 'auto',
		marginBottom: '15px'
	},

	signature: {
		width: "100px",
		height: 'auto',
		position: "absolute",
		marginTop: "10px",
		left: 340
	},

	//Table Head
	tableHead: {
		display: "table",
		width: "auto",
		// backgroundColor: '#d6dcff',
        backgroundColor: '#81bc02',
		color: "white",
		fontFamily: "Rubik"
	},
	rowHead: {
		flexDirection: "row",
		flexGrow: 1,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		justifyContent: "space-between"
    },
	headText: {
		fontSize: 10
	},
	//Table Row
	table: {
        display: "table",
		width: "auto",
	},
	category: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		marginTop: -1
	},
    row: {
		marginTop: -1,
		flexDirection: "row",
		flexGrow: 1,
		// borderTopWidth: 1,
		// borderBottomWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
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
		alignItems: "center",
		justifyContent: "flex-start",
		padding: '3px 10px'
	},
	cellItem: {
		// padding: '3px'
		display: "flex",
		flexDirection: "row",
		minWidth: 50,
		flexGrow: 1,
		// borderLeftWidth: 1,
		// borderRightWidth: 1,
		justifyContent: "flex-start",
		padding: '5px 10px',
	},
	cellColumn: {
		// padding: '3px'
		display: "flex",
		flexDirection: "column",
		// minWidth: 50,
		flexGrow: 1,
		// borderLeftWidth: 1,
        // borderRightWidth: 1,
		justifyContent: "flex-start",
		padding: '5px 10px'
	},
	cellText: {
		// fontSize: 12
		fontSize: 11
    },
    cellTextSmall: {
		// fontSize: 12
		fontSize: 9
	},
	//Table Footer
	tableFooter: {
		display: "table",
		width: "auto",
		// backgroundColor: '#d6dcff',
		backgroundColor: '#81bc02',
		color: "white",
		fontFamily: "Rubik",
		marginTop: -1,
		borderTopWidth: 1
    },
    




    //divers
    phrase: {
        flexDirection: "row",
        fontSize: 12,
        fontWeight: "normal",
        marginBottom: 5
    },
    bold: {
        fontWeight: "bold",
        fontFamily: 'Rubik'
	},
	light: {
		fontFamily: 'RubikLight'
    },
    italic: {
        fontSize: 8,
        fontFamily: "RubikItalic"
	},
});