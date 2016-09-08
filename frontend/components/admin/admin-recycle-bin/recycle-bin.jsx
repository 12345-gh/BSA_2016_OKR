import React, { Component } from 'react';
import RecBinItem from './recycle-bin-item';

import StatPanel from '../../../containers/statistic-panel.jsx';
import CentralWindow from "../../../containers/central-window.jsx";
import RecycleBinFilter from './recycle-bin-filters';
import '../../common/styles/table.scss';
import './recycle-bin.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from "../../../actions/recycleBinActions.js";

import ReactList from 'react-list';

class RecycleBin extends Component {

	constructor(props) {
		super(props);
		this.filterButtonState = this.filterButtonState.bind(this);
		this.handleFilterButton = this.handleFilterButton.bind(this);
	}

	handleFilterButton() {
		let show = this.props.recycleBin.showRecycleBinFilters;
		this.props.showFilters(!show);
	}

	filterButtonState(show) {
		if (show) {
			return 'active-button'
		} else {
			return ''
		}
	}

	renderItem(index, key) {

		let item = this.props.recycleBin.visibleItems[index];

   		return (
	   			<RecBinItem item={item} key={item.id} />
   		);
  	}

	renderItems(items, ref) {
  		return ( <tr className="no-hover" ref={ref}>{items}</tr>)
  	}

	render() {
		let showFilters = this.props.recycleBin.showRecycleBinFilters;

		return (
			<div id="rec-bin-wrapper">
					<div className="recycle-bin-header">

						<div className="recycle-bin-header-row">
							<p><span>Admin Recycle bin</span></p>
						</div>

						<div className="recycle-bin-header-row width-85perc">
							<button className={"btn btn-blue btn-filter " + this.filterButtonState(showFilters)} 
								onClick={ this.handleFilterButton }
							>
								<i className="fi flaticon-funnel"/> Filter <i className={ `fi-1 flaticon-1-arrow-${ showFilters ? 'up' : 'down' }` }/>
							</button>
						</div>

						<div className="recycle-bin-header-row">
								<div className="recucle-bin-filter-bar-container">
									<RecycleBinFilter/>
								</div>
						</div>
					</div>
					
					<div>
						<table className='table filter-table'>
							<thead>
								<tr>
									<th className="width-20perc">Title</th>
									<th className="width-30perc">Description</th>
									<th>Type</th>
									<th>Category</th>
									<th>Deleted By</th>
									<th className="cursor-pointer" className="width-15perc" onClick={this.setSortingByDate.bind(this)}><i id="date-field" className="fa fa-sort-desc"></i><span className="margin-left-3px">Date</span></th>
									<th className="actions" className="width-5perc">Actions</th>
								</tr>
							</thead>
							   <tbody>
									<ReactList
										itemRenderer={this.renderItem.bind(this)}
										itemsRenderer={this.renderItems.bind(this)}
										length={this.props.recycleBin.visibleItems.length}
										type='simple'
										pageSize={5}
									/>
								</tbody>
						</table>
					</div>
			</div>
		);
	}

    componentWillMount() {
       this.props.clearRecycleBin();
       this.props.getObjectiveTemplatesRequest();
       this.props.getKeyResultsTemplatesRequest();
       this.props.getDeletedCategoriesRequest();
    }

    componentWillUnmount() {
    	this.props.clearRecycleBin();
    }

	setSortingByDate() {
		
		let dateField = document.querySelector(".filter-table #date-field");

		if (dateField != null) {

			if (dateField.classList.contains("fa-sort-asc")) {

				dateField.classList.remove("fa-sort-asc");
				dateField.classList.add("fa-sort-desc");

			}
			else {
				dateField.classList.remove("fa-sort-desc");
				dateField.classList.add("fa-sort-asc");
			}
		} 

		this.props.setSortingByDate(!this.props.recycleBin.sortByDate);
	}

}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

function mapStateToProps(state) {
	return {
		recycleBin: state.recycleBin
	};
}


const RecycleBinConnected = connect(mapStateToProps, mapDispatchToProps)(RecycleBin);
export default RecycleBinConnected