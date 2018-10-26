import { ADD_INGREDIENT, REMOVE_INGREDIENT, TOGGLE_INGREDIENT, SET_VISIBILITY_FILTER } from './actionsTypes'

let IngredientId = 2

export const addIngredient = text => ({
    type: ADD_INGREDIENT,
    id: IngredientId++,
    text
})

export const deleteIngredient = (id) => ({
    type: REMOVE_INGREDIENT,
    id: id
})

export const toggleIngredient = (id) => ({
    type: TOGGLE_INGREDIENT,
    id: id
})

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})