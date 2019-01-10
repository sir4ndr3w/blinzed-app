export const initialState = {
    uid: null,
    user: {
        isLoaded: false,
        inProgress: true,
        error: "",
        name: "",
        email: null,
        phone: null,
        birthday: null,
        lastLogin: null,
    },
    chatList: {
        isLoaded: false,
        inProgress: false,
        error: "",
    },
    chats: {
        isLoaded: false,
        inProgress: false,
        error: "",
    },
};