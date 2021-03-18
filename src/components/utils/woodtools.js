import moment from 'moment';
let refTable = {
    //chataigner
    "CHAPE" : {
        "categorie":"Chataîgner",
        "name": "Châtaignier perche",
        "price": 3,
        "cahierDesCharges": "longueur 2-10m, Ø > 5 cm",
        "stereUnit": 1,
        "color": "#FFEE58"
    },
    "CHABS" : {
        "categorie":"Chataîgner",
        "name": "Châtaignier Bois sec",
        "price": 1,
        "cahierDesCharges": "Petit bois sec, lg : 2m, Ø > 5cm",
        "stereUnit": 1,
        "color": "#FFEE58"
    },
    "CHAGS" : {
        "categorie":"Chataîgner",
        "name": "Châtaignier Gros sec",
        "price": 2,
        "cahierDesCharges": "Gros bois sec, lg : 2m, Ø > 12cm",
        "stereUnit": 1,
        "color": "#FFEE58"
    },
    "CHAPI" : {
        "categorie":"Chataîgner",
        "name": "Châtaignier Piquet",
        "price": 8,
        "cahierDesCharges": "Petit piquet droit, lg 1.8m-3m , Ø : 8-13cm",
        "stereUnit": 1,
        "color": "#FFEE58"
    },
    "CHAGP" : {
        "categorie":"Chataîgner",
        "name": "Châtaignier Gros piquet",
        "price": 8,
        "cahierDesCharges": "Gros piquet droit, lg 1.8m-3m , Ø : 14-25cm",
        "stereUnit": 1,
        "color": "#FFEE58"
    },
    "CHAME" : {
        "categorie":"Chataîgner",
        "name": "Châtaignier Merrain",
        "price": 10,
        "cahierDesCharges": "Bois sain, non roulé, lg 2m, Ø 14-25cm",
        "stereUnit": 1,
        "color": "#FFEE58"
    },
    "CHABI" : {
        "categorie":"Chataîgner",
        "name": "Châtaignier Bille",
        "price": 50,
        "cahierDesCharges": "Bois sain, non roulé, lg 2-3m, Ø > 25cm",
        "stereUnit": 0,
        "color": "#FFEE58"
    },
    "CHAGR" : {
        "categorie":"Chataîgner",
        "name": "Châtaignier Grume",
        "price": 60,
        "cahierDesCharges": "Bois sain, non roulé, droit, lg + 4m, Ø > 35cm",
        "stereUnit": 0,
        "color": "#FFEE58"
    },
    
    //chene
    "CHEPE" : {
        "categorie": "Chêne",
        "name": "Chêne Petit",
        "price": 6,
        "cahierDesCharges": "Petit Chêne et bois tordu, lg 2m, Ø > 7cm",
        "stereUnit": 1,
        "color": "#94f96c"
    },
    "CHECA" : {
        "categorie": "Chêne",
        "name": "Chêne calibré",
        "price": 10,
        "cahierDesCharges": "Chêne calibré droit, lg 2m, Ø > 12cm",
        "stereUnit": 1,
        "color": "#94f96c"
    },
    "CHETV" : {
        "categorie": "Chêne",
        "name": "Chêne tout venant",
        "price": 0, 
        "cahierDesCharges": "Chêne chauffage tout venant, lg 2m, Ø > 7cm",
        "stereUnit": 1,
        "color": "#94f96c"
    },
    "CHETR" : {
        "categorie": "Chêne",
        "name": "Chêne traverse",
        "price": 25,
        "cahierDesCharges": "Bois sain, non gelé, droit, lg 2,6m, Ø > 28cm",
        "stereUnit": 0,
        "color": "#94f96c"
    },
    "CHECH" : {
        "categorie": "Chêne",
        "name": "Chêne charpente",
        "price": 50,
        "cahierDesCharges": "Bois sain, non gelé, droit, Nœud < 7cm, lg + 4m, Ø > 28cm",
        "stereUnit": 0,
        "color": "#94f96c"
    },
    "CHEAV" : {
        "categorie": "Chêne",
        "name": "Chêne avivé",
        "price": 60,
        "cahierDesCharges": "", // TODO : missing
        "stereUnit": 0,
        "color": "#94f96c"
    },
    "CHEME" : {
        "categorie": "Chêne",
        "name": "Chêne Merrain",
        "price": 300,
        "cahierDesCharges": "Bois sain, sans défauts, lg 1.2-8m , Ø > 40cm",
        "stereUnit": 0,
        "color": "#94f96c"
    },
    
    //charme
    "CHPET" : {
        "categorie": "Charme",
        "name": "Charme Petit",
        "price": 5,
        "cahierDesCharges": "Petit Charme et bois tordu, lg 2m, Ø > 7cm",
        "stereUnit": 1,
        "color": "#0adb73"
    },
    "CHCAL" : {
        "categorie": "Charme",
        "name": "Charme calibré",
        "price": 10,
        "cahierDesCharges": "Charme calibré droit, lg 2m, Ø > 12cm",
        "stereUnit": 1,
        "color": "#0adb73"
    },
    
    //Pin
    "PINPA" : {
        "categorie": "Pin",
        "name": "Pin Papeterie",
        "price": 3,
        "cahierDesCharges": "Papeterie, lg : 2m, Ø > 7cm",
        "stereUnit": 1,
        "color": "#FFB74D"
    },
    "PINCA" : {
        "categorie": "Pin",
        "name": "Pin Canter",
        "price": 7,
        "cahierDesCharges": "Bois sain, droit, lg 2-2.5m , Ø > 14cm",
        "stereUnit": 1,
        "color": "#FFB74D"
    },
    // "PINCA" : {
    //     "categorie": "Pin",
    //     "name": "Pin Gros Canter",
    //     "price": 7,
    //     "cahierDesCharges": "", // TODO : missing
    //     "stereUnit": 1,
    //     "color": "#FFB74D"
    // },
    "PINCS" : {
        "categorie": "Pin",
        "name": "Pin caissage",
        "price": 25,
        "cahierDesCharges": "Bois sain, droit, Nœud < 7cm, lg 2-2.5m , Ø > 25cm",
        "stereUnit": 0,
        "color": "#FFB74D"
    },
    "PINME" : {
        "categorie": "Pin",
        "name": "Pin menuiserie",
        "price": 35,
        "cahierDesCharges": "Bois sain, droit, sans noeuds, lg 2-2.5m , Ø > 25cm",
        "stereUnit": 0,
        "color": "#FFB74D"
    },
    "PINTV" : {
        "categorie": "Pin",
        "name": "Pin tout venant",
        "price": 30,
        "cahierDesCharges": "Bois sain, Nœud < 5cm, lg 2.5m , Ø > 25cm",
        "stereUnit": 0,
        "color": "#FFB74D"
    },
    
    //peuplier
    "PEPAL" : {
        "categorie": "Peuplier",
        "name": "Peuplier Palette",
        "price": 15,
        "cahierDesCharges": "Bois sain, droit, Nœud < 10cm, lg 2-2.5m , Ø > 25cm",
        "stereUnit": 0,
        "color": "#6dd0fe"
    },
    "PESCI" : {
        "categorie": "Peuplier",
        "name": "Peuplier Sciage",
        "price": 40,
        "cahierDesCharges": "Bois sain, droit, Nœud < 5cm, lg 2-2.5m , Ø > 25cm",
        "stereUnit": 0,
        "color": "#6dd0fe"
    },
    "PEDER" : {
        "categorie": "Peuplier",
        "name": "Peuplier Déroulage",
        "price": 40,
        "cahierDesCharges": "Bois sain, non fendu, Nœud < 5cm, lg 2-2.5m , Ø > 25cm",
        "stereUnit": 0,
        "color": "#6dd0fe"
    },
        
    //acacia
    "ACAPT" : {
        "categorie": "Acacia",
        "name": "Acacia petit tordu",
        "price": 5,
        "cahierDesCharges": "Petit acacia et bois tordu, lg 2m, Ø > 7cm",
        "stereUnit": 1,
        "color": "#cdb3ff"
    },
    "ACAPI" : {
        "categorie": "Acacia",
        "name": "Acacia Piquet",
        "price": 0, 
        "cahierDesCharges": "Petit Piquet, droit, lg 1.8m-3m , Ø : 8-30cm",
        "stereUnit": 1,
        "color": "#cdb3ff"
    },
    "ACABI" : {
        "categorie": "Acacia",
        "name": "Acacia Bille",
        "price": 50,
        "cahierDesCharges": "Bille Acacia, droit, lg 2-2.5m , Ø > 30cm",
        "stereUnit": 0,
        "color": "#cdb3ff"
    },

    //Papeterie Feuillu
    "CHAPA" : {
        "categorie":"Papeterie Feuillu",
        "name": "Châtaignier Papeterie",
        "cahierDesCharges": "Papeterie, lg : 2m, Ø > 7cm",
        "stereUnit": 1,
        "color": "#85f0ff"
    },
    "PEPAP" : {
        "categorie": "Papeterie Feuillu",
        "name": "Peuplier Papeterie",
        "cahierDesCharges": "Papeterie, lg : 2m, Ø > 7cm",
        "stereUnit": 1,
        "color": "#85f0ff"
    },
    "ACAPA" : {
        "categorie": "Papeterie Feuillu",
        "name": "Acacia Papeterie",
        "cahierDesCharges": "",
        "stereUnit": 0,
        "color": "#85f0ff"
    },
    "CHPAP" : {
        "categorie": "Papeterie Feuillu",
        "name": "Charme Papeterie",
        "cahierDesCharges": "",
        "stereUnit": 1,
        "color": "#85f0ff"
    },

    //Gros Papier
    "GROPA" : {
        "categorie":"Gros Papier",
        "name": "Gros papier" ,
        "cahierDesCharges": "Papeterie, lg : 2m, Ø > 50cm",
        "stereUnit": 1,
        "color": "#ff7b7b"
    },

    //autre
    "AUTRE" : {
        "categorie": "Autre",
        "name": "Autre",
        "price": 0, 
        "cahierDesCharges": "",
        "stereUnit": 1,
        "color": "#ccaa97"
    }
}

let coupeurs = [
    "Isabeau Benoit",
    "Priscille Morin",
    "Quintia Dubois",
    "Antoine Roussel",
    "Timoléon Lecomte",
    "Aymonde Joly",
    "Libère Dubois"
]
let debardeurs = [
    "Eugénie Dupuis",
    "Quentin Remy",
    "Janine Renard",
    "Clarence Andre"
]

export const getUnit = (ref, short) => {
    if (typeof short === 'undefined') { short = false }
    if(ref in refTable){
        if(refTable[ref].stereUnit === 1) {
            if(short){
                return "St"
            } else {
                return "Stères"
            }
        } else {
            return "m³"
        }
    } else {
        return "-" //dont exist
    }
}

export const getRefTable = () => {
    return refTable
}

export const getNormalWoodTable = () => {
    let result = {}
    Object.entries(refTable).map(([ref, data], i) => {
        if(!["Papeterie Feuillu",
            "Gros Papier"].includes(data.categorie))
            result[ref] = data
    })
    return result
}

export const getPapeterieTable = () => {
    let result = {}
    Object.entries(refTable).map(([ref, data], i) => {
        if(data.categorie === "Papeterie Feuillu")
            result[ref] = data
    })
    return result
}

export const getCoupeurs = () => {
    return coupeurs
}
export const isCoupeur = (name) => {
    let found = false
    coupeurs.forEach((coupeur) => {
        if(coupeur === name)
            found = true
    })
    return found
}

export const getDebardeurs = () => {
    return debardeurs
}
export const isDebardeur = (name) => {
    let found = false
    debardeurs.forEach((debardeur) => {
        if(debardeur === name)
            found = true
    })
    return found
}

/**
 * Trie la liste refTable par catégories.
 * @returns La liste refTable triée par catégories
 */
export const getWoodsGroupByCategories = () => {
    let sorted = {}
    Object.entries(refTable).map(([wood, data], i) => {
        if(sorted[data.categorie] === undefined) {
            sorted[data.categorie] = [];
        }
        sorted[data.categorie][wood] = data
    })
    return sorted
}

/**
 * Fait la somme des piles de plusieurs chantiers.
 * @param chantiers Liste des chantiers + piles de tous les chantiers contenant d'un même type de bois (voir regroupWoods())
 * @param ref Référence du bois
 * @returns Quantité total du bois
 */
export const getTotalQuantity = ( chantiers, ref ) => {
    //trouver coef
    let coef = 1
    if(refTable[ref].stereUnit === 0)
        coef = 0.7;

    //trouver calcul
    let total = 0
    try {
        chantiers && chantiers.map((chantier, ref) => {
            chantier.piles.map((pile) => {
                total += pile.longeur * pile.largeur * pile.hauteur * coef
            })
        })
        return total
    } catch(e) {
        return "Error"
    }
}

export const getPriceRef = (ref) => {
    try {
        return refTable[ref].price
    } catch(e) {
        return "-"
    }
}

//UNUSED
export const getVolumePile = ( pile , type) => {
    try{
        let coef = 1
        if(refTable[type].stereUnit === 0)
            coef = 0.7;
        
        let total = 0
        total += pile.longeur * pile.largeur * pile.hauteur * coef
        return Math.round((total + Number.EPSILON) * 100) / 100
    } catch (e) {
        return 0
    }
}
//only used in NEW CHANTIER / MODIF CHANTIER
export const getVolumePileWithCotes = ( longueur, largeur, hauteur, type ) => {
    let coef = 1
    if(refTable[type].stereUnit === 0)
        coef = 0.7;
    
    let total = 0
    total += Number(longueur) * Number(largeur) * Number(hauteur) * coef
    return total
}

export const getVolumePiles = ( piles ) => {
    let volume = 0
    Object.entries(piles).map(([refPile, dataPile]) => {
        volume += getVolumePile(dataPile)
    })
    return volume
}

/**
 * Trie une liste de piles en catégorie.
 * @param piles Liste de piles
 * @returns Liste de catégories contenant des piles
 */
export const sortStackByCategory = (piles) => {
    let sorted = {}
    Object.entries(piles).map(([refPile, dataPile]) => {
        if(sorted[dataPile.type] === undefined) {
            sorted[dataPile.type] = {};
        }
        sorted[dataPile.type][refPile] = dataPile
    })
    return sorted
}


/**
 * Donne le nom complet du bois depuis sa reference.
 * @param ref Reference du bois
 * @returns Nom complet du bois
 */
export const getRefName = (ref) => {
    try{
        return refTable[ref].name
    } catch (e){
        return "-"
    }
}

/**
 * Donne le prix d'une pile.
 * @param pile Un pile
 * @returns Prix de la pile
 */
export const getPriceStack = (pile, type, prixHT) => {
    try {
        let volume = getVolumePile(pile, type)
        let prix = volume * prixHT
        return Math.round((prix + Number.EPSILON) * 100) / 100;
    } catch (e) {
        return "-"
    }
}

/**
 * Donne la somme des prix de plusieurs piles.
 * @param piles Des piles
 * @returns Prix total des piles
 */
export const getPriceStacks = (piles) => {
    let prix = 0;
    Object.entries(piles).map(([refPile, dataPile]) => {
        prix += getPriceStack(dataPile)
    })
    return prix;
}

/**
 * Donne le prix pour un volume de bois.
 * @param volume Volume
 * @param ref Référence du bois
 * @returns Prix du volume
 */
export const getPriceVolume = (volume, ref) => {
    let prix = 0;
    prix += volume * refTable[ref].price
    return prix;
}

export const getBackgroundColor = (ref) => {
    try {
        return refTable[ref].color
    } catch(e) {
        return false
    }
}

export const getCahierDesCharges = (ref) => {
    try {
        return refTable[ref].cahierDesCharges
    } catch(e) {
        return false
    }
}

export const convertDateToTimestamp = (date) => {
    return parseInt((new Date(date).getTime() / 1000).toFixed(0))
}

export const convertTimestampToDate = (date) => {
    return moment.unix(date).format("YYYY-MM-DD")
}

export const convertTimestampToHumandeDate = (date) => {
    return moment.unix(date).format("DD/MM/YYYY")
}
