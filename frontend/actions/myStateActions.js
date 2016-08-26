import axios from 'axios';
import { ADD_REQUEST, REMOVE_REQUEST } from './appActions';

export const GET_MY_OBJECTIVES = 'GET_MY_OBJECTIVES';
export const RECEIVED_MY_OBJECTIVES_ERROR = 'RECEIVED_MY_OBJECTIVES_ERROR';
export const RECEIVED_MY_OBJECTIVES = 'RECEIVED_MY_OBJECTIVES';
export const CHANGE_TAB = 'CHANGE_TAB';
export const CHANGE_YEAR = 'CHANGE_YEAR';
export const CREATE_QUARTER = 'CREATE_QUARTER';
export const SOFT_DELETE_MY_OBJECTIVE_BY_ID = 'SOFT_DELETE_MY_OBJECTIVE_BY_ID';
export const SOFT_DELETE_MY_OBJECTIVE_BY_ID_API = 'SOFT_DELETE_MY_OBJECTIVE_BY_ID_API';
export const ADD_NEW_OBJECTIVE = 'ADD_NEW_OBJECTIVE';
export const ADDED_NEW_OBJECTIVE = 'ADDED_NEW_OBJECTIVE';

export function getMe() {

	return (dispatch, getStore) => {
		dispatch({ type: GET_MY_OBJECTIVES });
		dispatch({ type: ADD_REQUEST });

		return axios.get('api/user/me/')
		.then(response => {
			dispatch(receivedMyObjectives(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedMyObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function receivedMyObjectivesError(data) {
	return {
		type: RECEIVED_MY_OBJECTIVES_ERROR,
		data: data
	};
}

export function receivedMyObjectives(data) {
	return {
		type: RECEIVED_MY_OBJECTIVES,
		data: data
	};
}

export function setChangeTab(num) {
	return {
		type: CHANGE_TAB,
		currentTab: num
	};
}

export function setChangeYear(year) {
	return {
		type: CHANGE_YEAR,
		currentYear: year
	};
}

export function createQuarter(quarter){
	return {
		type: CREATE_QUARTER,
		payload: quarter
	}
}

export function softDeleteMyObjectiveById(id) {
	return {
		type: SOFT_DELETE_MY_OBJECTIVE_BY_ID,
		id: id
	};
}

export function softDeleteMyObjectiveByIdApi(id, body) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_REQUEST	});
		dispatch({ type: SOFT_DELETE_MY_OBJECTIVE_BY_ID_API });

		return axios.put(('api/userObjective/' + id), body)
		.then(response => {
			dispatch(softDeleteMyObjectiveById(id));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedMyObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function addNewObjective(body) {
	return (dispatch, getStore) => {
		dispatch({ type: ADD_NEW_OBJECTIVE });
		dispatch({ type: ADD_REQUEST	});

		return axios.post(('api/userObjective/'), body)
		.then(response => {
			dispatch(AddedNewObjective(response.data, body));
			dispatch({ type: REMOVE_REQUEST	});
		})
		.catch(response => {
			dispatch(receivedMyObjectivesError(response.data));
			dispatch({ type: REMOVE_REQUEST	});
		});
	};
}

export function AddedNewObjective(data, body) {
	return {
		type: ADDED_NEW_OBJECTIVE,
		response: data,
		request: body
	};
}