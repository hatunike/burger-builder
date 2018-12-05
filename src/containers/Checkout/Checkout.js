import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import ContactData from '../../components/Layout/UI/Order/CheckoutSummary/ContactData/ContactData';
import CheckoutSummary from '../../components/Layout/UI/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Checkout extends Component {

   checkoutCanceledHandler = () => {
      this.props.history.goBack();
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data');
   }

  render() { 
    let summary = <Redirect to="/"/>
    
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to ="/" /> : null;
      summary = (<div>
          {purchasedRedirect}
        <CheckoutSummary 
          ingredients={this.props.ings} 
          checkoutCanceled={this.checkoutCanceledHandler} 
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
      </div>);
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }
}

 
export default connect(mapStateToProps)(Checkout);