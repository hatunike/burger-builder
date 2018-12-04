import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Checkout from '../Checkout/Checkout';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {
	
	state = {
		totalPrice: 4,
		purcheasable: false,
		purchasing: false,
		loading: false,
		error: false
	}
	
	componentDidMount() {
		// axios.get('ingredients.json',null).then( response => {
		// 	console.log(response);
		// 	this.setState({ingredients:response.data});
		// })
		// .catch( error => {
		// 	this.setState({error:true});
		// });
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey];
		}).reduce((sum, el) => {
			return sum + el;
		},0);
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({purchasing:true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing:false})
	}

	purchaseContinueHandler = () => {
			this.props.history.push('/checkout');
	}

	render () {
		const disabledInfo = {
			...this.props.ings
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;


		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
		if (this.props.ings) {
			burger = (<Aux>
				<Burger ingredients={this.props.ings}/>
				<BuildControls  ingredientAdded={this.props.onIngredientAdded} 
												ingredientRemoved={this.props.onIngredientRemoved}
												disabled= {disabledInfo}
												currentPrice={this.props.price}
												purcheasable={this.updatePurchaseState(this.props.ings)}
												ordered={this.purchaseHandler}/>
												
			</Aux>);
			orderSummary = <OrderSummary 
						price={this.props.price}
						ingredients={this.props.ings} 
						purchaseCanceled={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler} />;
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
	}

		return (
			
			<Aux>

				<Modal show={this.state.purchasing} backdropClick= {this.purchaseCancelHandler}>
					{orderSummary}
					
				</Modal>
				{burger}

			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {
		ings:state.ingredients,
		price:state.totalPrice
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
		onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));