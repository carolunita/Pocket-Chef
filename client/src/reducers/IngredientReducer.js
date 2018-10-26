// if you want to show initial data :)
// const INITIAL_DATA =  [
//     {
//         id: 0,
//         text: 'Chicken Breast,
//     },
//     {
//         id:1,
//         text: 'Potatoes',

//     },
// ]

import { ADD_INGREDIENT, REMOVE_INGREDIENT, TOGGLE_INGREDIENT} from '../actions/actionsTypes'

const INITIAL_DATA = []

const IngredientReducer = (state=INITIAL_DATA, action) => {
    switch (action.type){
        case ADD_INGREDIENT:
        return [
            ...state,{
                id: action.id,
                text: action.text,
                purchased: false,
            }
        ]
        case TOGGLE_INGREDIENT:
        return state.map(ingredient =>
        (ingredient.id === action.id)
          ? {...ingredient, purchased: !ingredient.purchased}
          : ingredient
         )
        case REMOVE_INGREDIENT:
        const numIndex = parseInt(action.id)
        return state.filter(ingredient => ingredient.id !== numIndex);
        default:
        return state
    }
}

export default IngredientReducer