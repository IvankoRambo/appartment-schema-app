const DATA_ENDPOINT = '/api/data';

export const receiveSpecInfo = data => ({ type: 'RECEIVE_SPEC', data });

export const fetchData = () => {
    return dispatch => {
        return new Promise(resolve => {
            fetch(DATA_ENDPOINT)
                .then(res => res.json())
                .then(json => {
                    dispatch(receiveSpecInfo(json));
                    resolve();
                });
        });
    }
};
