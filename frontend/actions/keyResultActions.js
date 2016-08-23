var axios = require('axios')

export const
    GET_AUTOCOMPLETE_KEY_RESULTS = 'GET_AUTOCOMPLETE_KEY_RESULTS',
    SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM = 'SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM',
    RECEIVED_ERROR = 'RECEIVED_ERROR',
    RECEIVED_KEY_RESULTS = 'RECEIVED_KEY_RESULTS';

export function getAutocompleteKeyResults(objectId, title) {

    return (dispatch, getStore) => {

        dispatch({
            type: GET_AUTOCOMPLETE_KEY_RESULTS
        });

        return axios.get('api/keyresult/objective/' + objectId + '/' + title)
            .then(response => dispatch(receivedKeyResults(response.data)))
            .catch(response => dispatch(receivedError(response.data)));

    };
}

export function setAutocompleteKeyResultsSelectedItem(selectedItem) {
    return {
        type: SET_AUTOCOMPLETE_KEY_RESULTS_SELECTED_ITEM,
        selectedItem
    };
}

export function receivedError(data) {
    return {
        type: RECEIVED_ERROR,
        data
    };
}

export function receivedKeyResults(data) {
    return {
        type: RECEIVED_KEY_RESULTS,
        data
    };
}