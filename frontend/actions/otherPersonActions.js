var axios = require('axios');

export const GET_USER = 'GET_USER'
export const RECEIVED_USER = 'RECEIVED_USER'
export const SEARCH_USER = 'SEARCH_USER'
export const GET_USERS_LIST = 'GET_USERS_LIST'
export const RECEIVED_USERS_LIST = 'RECEIVED_USERS_LIST'
export const USERS_LIST_ERROR = 'USERS_LIST_ERROR'


export function getUser(id) {

	return (dispatch, getStore) => {

	dispatch({
		type: GET_USER
	});

	return axios.get('api/user/'+id)
		.then(response => dispatch(receivedData(response.data)))
		.catch(response => dispatch(receivedError(response.data)));
	};
}

export function receivedError(data) {
	return {
		type: RECEIVED_ERROR,
		data
	};
}

export function receivedData(data) {
	return {
		type: RECEIVED_USER,
		data
	};
}
export function getUsersList(){
	return(dispatch, getStore) => {

		dispatch({
			type: GET_USERS_LIST
		});

		return axios.get('api/user/')
			.then(response => dispatch(receivedUsersList(response.data)))
			.catch(response => dispatch(userslistError(response.data)));
	};
}

export function userslistError(data) {
	return {
		type: USER_LISTS_ERROR,
		data
	};
}

export function receivedUsersList(data) {
	return {
		type: RECEIVED_USERS_LIST,
		data
	};
}
export function search(value) {
	const action = {
		type: SEARCH_USER,
		searchValue: value
	};
	return action;
}
 