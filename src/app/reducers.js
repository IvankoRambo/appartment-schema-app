export const spec = (state, action) => {
    switch (action.type) {
        case 'RECEIVE_SPEC':
            return action.data.specData || state;
        case 'LIST_SPEC':
        default:
            return state || [];
    }
};

export const mathData = (state, action) => {
    switch (action.type) {
        case 'RECEIVE_SPEC':
            return action.data.mathData || state;
        case 'LIST_SPEC':
        default:
            return state || [];
    }
};
