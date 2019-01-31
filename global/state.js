export const initialState = {
    profile: {
        //Error und UI Handling
        isLoaded: false,
        inProgress: {},
        error: {},
        createdProfile: false,

        //Gemappt aus der Datenbank
        vorname: null,
        nachname: null,
        email: null,
        telefon: null,
        birthday: null,
        stadt: null,
        beschreibung: null,
        sources: null,

        //Praeferenzen
        criteria: {
            minalter: null,
            maxalter: null,
            radius: null,
            geschlecht: null,
        }
    },
    chats: {
        //Error und UI Handling
        isLoaded: false,
        inProgress: false,
        error: "",

        //Gemappt aus Datenbank, chatid: {chatdaten}
    },
    //Gemappt aus Datenbank
    alreadyMatched: [],

    //Gemappt aus Datenbank, uid: {alter, stadt, geschlecht}
    loadedMatches: {},

    //uid aus loadedmatches abzueglich alreadyMatched
    possibleMatches: [],

    //aktuell geladener
    currentMatch: {
        isLoaded: false,
        vorname: null,
        alter: null,
        stadt: null,
        beschreibung: null,
        sources: null,
    },
};