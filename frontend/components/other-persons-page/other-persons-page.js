import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../actions/otherPersonActions.js";

import PersonInfo from './persons-info.js';
import UserOjectives from './user-objectives.js';
import CentralWindow from "../../containers/central-window.jsx";
import StatPanel from "../../containers/statistic-panel.jsx";
import Dashboard from "../dashboard/dashboard.jsx";

class OtherPersonsPage extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount(){
		var urlArray = this.props.routing.pathname.split('/');
		var id = urlArray[urlArray.length - 1]
		this.props.getUser(id);
	}
	render() {
		if (this.props.user.waiting){
			return <div></div>
		}
		else {
			const {user} = this.props.user;
			return (
				<div>
					<CentralWindow>
						<PersonInfo data={user} />
						<UserOjectives />
					</CentralWindow>
					<StatPanel>
						{/*<Dashboard></Dashboard>*/}
					</StatPanel>
				</div>
			)
		}
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state, ownProps) {
	return {
		user: state.userPage,
		routing: state.routing.locationBeforeTransitions
	};
}

const OtherPersonsPageConnected = connect(mapStateToProps, mapDispatchToProps)(OtherPersonsPage);
export default OtherPersonsPageConnected