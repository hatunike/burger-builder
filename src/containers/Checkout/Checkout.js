import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import ContactData from '../../components/Layout/UI/Order/CheckoutSummary/ContactData/ContactData';
import CheckoutSummary from '../../components/Layout/UI/Order/CheckoutSummary/CheckoutSummary';
class Checkout extends Component {
  state = { 
      ingredients: null,
      price:0
   }
   componentWillMount() {
     const query = new URLSearchParams(this.props.location.search);
     const ing = {};
     let price = 0;
     for (let param of query.entries()) {
       if (param[0] === 'price') {
          price = param[1];
       } else {
        ing[param[0]] = +param[1];
       }
    }
     console.log("INGREDIENTS :" + ing);
     this.setState({ingredients:ing, price:price});
   }

   checkoutCanceledHandler = () => {
      this.props.history.goBack();
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data');
   }

  render() { 
    return (<div>
      <CheckoutSummary 
        ingredients={this.state.ingredients} 
        checkoutCanceled={this.checkoutCanceledHandler} 
        checkoutContinued={this.checkoutContinuedHandler}/>
      <Route path={this.props.match.path + '/contact-data'} render={(props) => {
          return <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>
      }}/>
    </div>);
  }
}
 
export default Checkout;