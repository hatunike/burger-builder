import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/Layout/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}
class BurgerBuilder extends Component {
	
	state = {
		ingredients : null,
		totalPrice: 4,
		purcheasable: false,
		purchasing: false,
		loading: false,
		error: false
	}
	
	componentDidMount() {
		axios.get('ingredients.json',null).then( response => {
			console.log(response);
			this.setState({ingredients:response.data});
		})
		.catch( error => {
			this.setState({error:true});
		});
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients).map(igKey => {
			return ingredients[igKey];
		}).reduce((sum, el) => {
			return sum + el;
		},0);
		console.log("updating purchase state");
		this.setState({purcheasable: sum > 0});
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const addedPrice = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + addedPrice;
		this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = Math.max(oldCount - 1, 0);
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const removedPrice = INGREDIENT_PRICES[type]
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - removedPrice;
		this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({purchasing:true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing:false})
	}

	purchaseContinueHandler = () => {

		this.setState({loading:true});
		const order = {
			ingredients : this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: 'Charles',
				address: 'TestStreet 1',
				zipcode: '90210',
				country: 'USA',
				email: 'test@testing.com'
			},
			deliveryMethod: 'fastest'
		}
		axios.post('/orders.json', order)
			.then( response => {
				console.log(response);
				this.setState({loading:false, purchasing:false});
			})
			.catch( error => {
				console.log(error);
				this.setState({loading:false, purchasing:false});
			});

	}

	render () {
		const disabledInfo = {
			...this.state.ingredients
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;


		let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
		if (this.state.ingredients) {
			burger = (<Aux>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls  ingredientAdded={this.addIngredientHandler} 
												ingredientRemoved={this.removeIngredientHandler}
												disabled= {disabledInfo}
												currentPrice={this.state.totalPrice}
												purcheasable={this.state.purcheasable}
												ordered={this.purchaseHandler}/>
												
			</Aux>);
			orderSummary = <OrderSummary 
						price={this.state.totalPrice}
						ingredients={this.state.ingredients} 
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

export default withErrorHandler(BurgerBuilder, axios);