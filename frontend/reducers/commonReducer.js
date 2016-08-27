
import { combineReducers } from 'redux'
import history from './historyReducer'
import recycleBin from './recycleBinReducer.js'
import usersList from './usersListReducer.js'
import okrManaging from './okrManagingReducer.js'
import userPage from './otherPersonReducer.js'
import mapping from './mappingReducer.js' 
import myState from './myStateReducer.js'
import keyResults from './keyResultReducer'
import categories from './categoriesReducer'
import userDashboard from './userDashboard'
import newTemplateReducer from './newTemplateReducer.js'
import app from './appReducer';



import { routerReducer } from 'react-router-redux';

export default combineReducers({
  app,
  categories,
  myState,
  history,
  userPage,
  usersList,
  okrManaging,
  mapping,
  recycleBin,
  userDashboard,
  keyResults,
  routing: routerReducer
});
