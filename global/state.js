export const initialState = {
    uid: null,
    profile: {
        isLoaded: false,
        isUpdated: false,
        inProgress: {},
        error: {},
        name: null,
        birthday: null,
        longitude: null,
        latitude: null,
        city: null,
        description: null,
        sources: null,
    },
    chatList: {
        isLoaded: false,
        inProgress: {},
        error: {},
        liste: {},
    },
    chats: {
        isLoaded: false,
        inProgress: {},
        error: {},
    },
};