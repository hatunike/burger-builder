import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import ContactData from '../../components/Layout/UI/Order/CheckoutSummary/ContactData/ContactData';
import CheckoutSummary from '../../components/Layout/UI/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';

class Checkout extends Component {

   checkoutCanceledHandler = () => {
      this.props.history.goBack();
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data');
   }

  render() { 
    return (<div>
      <CheckoutSummary 
        ingredients={this.props.ings} 
        checkoutCanceled={this.checkoutCanceledHandler} 
        checkoutContinued={this.checkoutContinuedHandler}/>
      <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients  }
}

 
export default connect(mapStateToProps)(Checkout);