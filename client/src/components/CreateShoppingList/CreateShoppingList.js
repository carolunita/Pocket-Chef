import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addIngredient } from '../../actions/actionCreator'
import {bindActionCreators} from 'redux'

class CreateShoppingList extends Component {
    constructor(props){
        super(props)
        this.state = {
            ingredienttext: '',
        }
        this.onChangeIngredientText = this.onChangeIngredientText.bind(this)
    }

    onChangeIngredientText(e){
        this.setState({
            ingredienttext: e.target.value
        })
    }

    render(){
        return (
                  <div className="form-group row">
                    <div className="col-sm-10">
                      <input onChange={this.onChangeIngredientText} value={this.state.ingredienttext} type="text" className="form-control" id="inputEmail3" placeholder="Add Ingredient Here"/>
                      <button type="button" onClick={() =>{ this.props.addIngredient(this.state.ingredienttext); this.setState({ ingredienttext: '' }) } } style={{marginTop: "25px"}} className="btn btn-success">Add Ingredient</button>
                    </div>
                  </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    addIngredient
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(CreateShoppingList)