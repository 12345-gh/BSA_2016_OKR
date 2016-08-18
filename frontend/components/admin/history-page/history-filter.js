import React, {Component} from 'react'

import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from "../../../actions/historyActions";

import '../../common/styles/commonStyles.scss'
import './history-filter.scss'

class HistoryFilter extends Component {

	constructor(props) {
		super(props);
		this.showFiltersContainer = this.showFiltersContainer.bind(this);
		this.onChangeFrom = this.onChangeFrom.bind(this);
		this.onChangeTo = this.onChangeTo.bind(this);
	}

	showFiltersContainer() {
		if (this.props.stateFromReducer.history.showHistoryFilters) {
			return "show-container"
		} else {
			return "hide-container"
		}
		return "hide-container";
	}

	onChangeFrom(dateString, { dateMoment, timestamp }) {
		  console.log(dateString);
			this.props.setFilterDateFrom(dateString);
	}

	onChangeTo(dateString, { dateMoment, timestamp }) {
			console.log(dateString);
			this.props.setFilterDateTo(dateString);
	}

	render() {

		return(
			<div className={"history-filter-bar " + this.showFiltersContainer()}>
				<table className="history-filter-table">
					<tbody>
						<tr>
							<td><input className="history-filter-bar-input" type="text" placeholder="Username"/></td>
							<td>
								<select>
									<option value="date">Action</option>
									<option value="user">Create</option>
									<option value="type">Update</option>
									<option value="object">Delete</option>
								</select>
							</td>
							<td className="cell-right-align">Date: </td>
							<td>
								<DateField className="date-field" placeholder="From" dateFormat="YYYY-MM-DD" onChange={this.onChangeFrom} footer={false} updateOnDateClick={true} collapseOnDateClick={true}/>
								<DateField className="date-field" placeholder="To" dateFormat="YYYY-MM-DD" onChange={this.onChangeTo} footer={false} updateOnDateClick={true} collapseOnDateClick={true}/>
							</td>
							<td>Sort by: </td>
							<td>
								<select value="date">
									<option value="user">User</option>
									<option value="type">Action</option>
									<option value="object">Object</option>
									<option value="date">Date</option>
								</select>
							</td>
							<td className="cell-right-align" colSpan="2">
								<button className="btn btn-filter">Reset</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		stateFromReducer: state
	};
}

const HistoryFilterConnected = connect(mapStateToProps, mapDispatchToProps)(HistoryFilter);
export default HistoryFilterConnected
