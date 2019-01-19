export const initialState = {
    uid: null,
    profile: {
        isLoaded: false,
        isUpdated: false,
        inProgress: {},
        error: {},
        name: null,
        email: null,
        phone: null,
        birthday: null,
        lastLogin: null,
    },
    chatList: {
        isLoaded: false,
        inProgress: false,
        error: "",
        liste: {},
    },
    chats: {
        isLoaded: false,
        inProgress: false,
        error: "",
    },
};