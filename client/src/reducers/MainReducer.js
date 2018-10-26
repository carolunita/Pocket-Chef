import { combineReducers } from 'redux'
import ingredients from './IngredientReducer'
import visibilityFilter from './FilterReducer'

export default combineReducers({
  ingredients,
  visibilityFilter
})