export const spec = (state, action) => {
    switch (action.type) {
        case 'RECEIVE_SPEC':
            return action.data || state;
        case 'LIST_SPEC':
        default:
            return state || [];
    }
};
